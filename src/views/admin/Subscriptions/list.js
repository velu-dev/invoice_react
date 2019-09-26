import React, { Component } from "react";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSubscriptionList, updateSubscriptionStatus, deleteSubscription } from 'redux/actions';
import { DataTable, Breadcrumb } from 'components';
import DeleteModal from 'views/common/DeleteModal';

import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import './list.css'

const mapStateToProps = ({ adminUsers, subscription }) => {
  const { subscription_list, subscriptions, loading } = subscription;
  return { subscriptions, subscription_list, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubscriptionList: (filters) => {
      dispatch(getSubscriptionList(filters))
    },
    updateSubscriptionStatus: (formData, id) => {
      dispatch(updateSubscriptionStatus(formData, id))
    },
    deleteSubscription: (id) => {
      dispatch(deleteSubscription(id))
    },
  }
}

class SubscriptionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptions: this.props.getSubscriptionList.data,
      modalShow: false,
      deleteId: '',
      tableReset: false,
      loading: props.loading,
      totalRecords: 0
    }
    this.delete = this.delete.bind(this);

  }

  componentWillReceiveProps(newProps) {
    if (!newProps.loading) {
      if (newProps.subscription_list.data) {
        this.setState({
          subscriptions: newProps.subscription_list.data,
          totalRecords: newProps.subscription_list.total_record
        })
      }

      if (this.props.subscriptions !== newProps.subscriptions) {
        if (newProps.subscriptions.status) {
          this.setState({ modalShow: false, tableReset: true })
          toast.success(newProps.subscriptions.message);
        }
      }
    }
    this.setState({ loading: newProps.loading })

  }

  delete() {
    this.props.deleteSubscription(this.state.deleteId)

  }

  render() {
    const { match } = this.props;
    const { subscriptions } = this.state;
    const columns = [{
      Header: 'NAME',
      id: 'plan_name',
      accessor: 'name'
    }, {
      Header: 'PRICE ($)',
      id: 'price',
      accessor: 'price'
    }, {
      Header: 'VALIDITY (DAYS)',
      id: 'validity_in_days',
      accessor: 'validity'
    }, {
      Header: 'STATUS',
      id: 'is_present',
      accessor: 'status',
      Cell: props => (
        <div className="toggle-wrap">
          <div className="toggle">
            <input type="checkbox" checked={props.value} onChange={(e) => {
              let status = (props.value) ? false : true;
              this.props.updateSubscriptionStatus(props.original.id, status);
            }} />
            <span className="btn"></span>
            <span className="texts"></span>
            <span className="bg"></span>
          </div>
        </div>
      )
    }, {
      Header: 'ACTION',
      accessor: 'id',
      sortable: false,
      Cell: props => (
        <div className="datatable-action">
          <Link to={`/admin/subscriptions/view/${props.value}`} title="View"><IcomoonReact iconSet={iconSet} color="#717171" size={20} icon="eye" /></Link>
          <Link to={`/admin/subscriptions/edit/${props.value}`} title="Edit"><IcomoonReact iconSet={iconSet} color="#717171" size={16} icon="edit" /></Link>
          <span title="Delete" onClick={() => this.setState({ modalShow: true, deleteId: props.value })}><IcomoonReact iconSet={iconSet} color="#717171" size={16} icon="trash" /></span>
        </div>
      )
    }];
    let modalClose = () => this.setState({ modalShow: false });
    let tableRerender = () => this.setState({ tableReset: false });
    return (
      <div className="main-content">
        <Breadcrumb match={match} />
        <div className="subscription-list">
          <Link title="Add Subscription" className="form-search" to={`${match.url}/add`}><IcomoonReact iconSet={iconSet} color="#0086c5" size={26} icon="add" /></Link>
          <DataTable
            columns={columns}
            data={subscriptions}
            loading={this.state.loading}
            getList={this.props.getSubscriptionList}
            totalRecords={this.state.totalRecords}
            reset={this.state.tableReset}
            rerender={tableRerender}
            rowView={false}
            {...this.props}
          />

          <DeleteModal
            show={this.state.modalShow}
            delete={this.delete}
            onHide={modalClose}
            title="subscription"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

const SubscriptionListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionList);

export default SubscriptionListConnected;
