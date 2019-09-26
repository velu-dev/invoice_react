import React, { Component } from "react";
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb, TransactionFormLoader  } from 'components';
import { assetURL, cardBrands } from '_constants';
import {  getTransaction } from 'redux/actions';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const mapStateToProps = ({ transaction }) => {   
  const { transaction_detail, loading } = transaction;
  return { transaction_detail, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: (id) => {
      dispatch(getTransaction(id))
    }
  }
}

class TransactionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transaction: {}     
    };

    this.isEdit = (props.formType === "Edit") ? true : false;
    this.isView = (props.formType === "View") ? true : false;
    this.isAdd = (props.formType === "Add") ? true : false;
    this.id = props.match.params.id;
    this.formikActions = {};
  }

  componentDidMount() {
    this.props.getTransaction(this.id);
  }

  componentWillReceiveProps({transaction_detail}) {
    if (!_.isEmpty(transaction_detail.data) && this.isAdd === false) {
      this.setState({ transaction: transaction_detail.data })
    }
  }

  render() {
  
    const { match, loading } = this.props;
    console.log(loading)
    
    const { transaction } = this.state;
    return (
      <div className="main-content"> 
        <Breadcrumb match={match} />
      
        <div className="transaction-list-page-content">
          <div className="card">
            <div className="card-header">
              <h2>Transaction Information</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
           
            <div className={`card-body ${(this.isView)? 'remove-mandatory':''}`}>
            { loading ? <TransactionFormLoader/> : 
              <Form>
              <Form.Row className="content-row">
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Name</Form.Label>
                    <input
                      type="text"
                      name="name"
                      value={(transaction.name)? transaction.name : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />                    
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik02">
                    <Form.Label>Email invalid</Form.Label>
                    <input
                      type="text"
                      name="email"                    
                      value={(transaction.email)? transaction.email : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />                    
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Phone Number</Form.Label>
                    <input
                      type="text"
                      name="phone"
                      value={(transaction.phone)? transaction.phone : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Subscription Plan</Form.Label>
                    <input
                      type="text"
                      name="subscription_plan"
                      value={(transaction.subscribed_plan)? transaction.subscribed_plan : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Card Number</Form.Label>
                    <input
                      type="text"
                      name="card_number"                     
                      value={(transaction.card_number)? `************${transaction.card_number}` : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                    { 
                      (_.includes(cardBrands, transaction.card_brand)) ?
                      <span className="card_icon"><Image src={`${assetURL}images/cardbrands/${transaction.card_brand}.png`} width="50px" alt={transaction.card_brand} /></span>
                      :
                      <span className="card_icon"><Image src={`${assetURL}images/cardbrands/blank-card.png`} alt={transaction.card_brand} width="50px"/></span>
                    }
                     
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Amount Paid</Form.Label>
                    <input
                      type="text"
                      name="amount"                  
                      value={(transaction.paid_amount)? transaction.paid_amount : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Transaction ID</Form.Label>
                    <input
                      type="text"
                      name="transaction_id"
                      value={(transaction.id)? transaction.id : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Date and Time</Form.Label>
                    <input
                      type="text"
                      name="datetime"
                      value={(transaction.valid_up_to)? moment(transaction.valid_up_to).format('DD MMM, YYYY') : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Status</Form.Label>
                    <input
                      type="text"
                      name="status"                  
                      value={(transaction.status)? transaction.status : ''}
                      className={'form-control'}
                      disabled={this.isView}
                    />
                  </Form.Group>
                </Form.Row>
                <div className="button-row"><Link to={this.props.backUrl} className="btn btn-custom btn-back" variant="success">Back</Link></div>
              </Form>  
            }        
            </div>           
          </div>
        </div>
      
      </div>
    );
  }
}

const TransactionFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionForm);
export default TransactionFormConnected;
