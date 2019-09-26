import React, { Component } from "react";
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getTransactionList, deleteUser } from 'redux/actions';
import {ClientSideDataTable, Breadcrumb, ListContentLoader} from 'components';
import Image from 'react-bootstrap/Image';
import {assetURL, cardBrands} from '_constants';
import './list.css'

const mapStateToProps = ({ transaction }) => {
const { transaction_list, loading } = transaction;
return { transaction_list, loading };
};

const mapDispatchToProps = (dispatch) => {
return {
  getTransactionList: (filters) => {
    dispatch(getTransactionList(filters))
  },
  deleteUser: (id) => {
    dispatch(deleteUser(id))
  }
}
}

class TransactionsList extends Component {
constructor(props) {
  super(props);

  this.state = {
    transactions: props.transaction_list.data,
    modalShow: false,
    deleteId: '',
    tableReset: false,
    loading: props.loading,
    totalRecords: 0
  }
  this.delete = this.delete.bind(this);

}

componentDidMount(){
  this.props.getTransactionList();
}
componentWillReceiveProps(newProps) {
  if (!newProps.loading) {
    if (newProps.transaction_list.data) {
      this.setState({
        transactions: newProps.transaction_list.data,
        totalRecords: newProps.transaction_list.total_record
      })
    }     
  }
  this.setState({ loading: newProps.loading })
}

delete() {
  this.props.deleteUser(this.state.deleteId)

}

render() {
  const { match } = this.props;
  const { transactions } = this.state;
  const columns = [{
    Header: 'USERNAME',
    accessor: 'name'
  },{
    Header: 'CARD DETAILS',
    id: 'card_brand',
    accessor: c => {     
      return (_.includes(cardBrands, c.card_brand)) ?     
    <span className="card_icon"><Image src={`${assetURL}images/cardbrands/${c.card_brand}.png`} alt={c.card_brand} width="50px" />
    </span> : <span className="card_icon"><Image src={`${assetURL}images/cardbrands/blank-card.png`} alt={c.card_brand} width="50px"/></span>;} 
  },{
    Header: 'SUBSCRIPTION PLAN',
    accessor: 'subscribed_plan'
  },{
    Header: 'PAID AMOUNT($)',
    accessor: 'paid_amount'
  }, {
    Header: 'DATE',
    id: 'date',
    accessor: c => { return moment(c.date).format('DD MMM, YYYY') }
  }, {
    Header: 'STATUS',
    accessor: 'status',
    Cell: pay => { return pay.value === 'Paid' ? <span className="status_paid">Paid</span> : <span className="status_failed">Failed</span>;}
  }]; 

  let tableRerender = () => this.setState({ tableReset: false });    
  return (
      <div className="main-content">
        <Breadcrumb match={match}/>  
        <div className="transaction-list">        
          <ClientSideDataTable
            columns={columns}
            data={transactions}
            loading={this.state.loading}        
            totalRecords={this.state.totalRecords}
            reset={this.state.tableReset}
            rerender={tableRerender}
            rowView={true}
            filterValue={`status`} 
            {...this.props}        
          />       
        </div>
    </div>
  );
}
}

const TransactionsListConnected = connect(
mapStateToProps,
mapDispatchToProps
)(TransactionsList);

export default TransactionsListConnected;
