import React, { Component } from "react";
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserList, deleteUser, updateUserStatus } from 'redux/actions';
import { DataTable, Breadcrumb } from 'components';
import DeleteModal from 'views/common/DeleteModal';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import './list.css'

const mapStateToProps = ({ adminUsers }) => {
  const { userList, user, loading } = adminUsers;
  return { userList, user, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (filters) => {
      dispatch(getUserList(filters))
    },
    deleteUser: (id) => {
      dispatch(deleteUser(id))
    },
    updateUserStatus: (id, status) => {
      dispatch(updateUserStatus(id, status))
    }

  }
}

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: this.props.userList.users,
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
      if (newProps.userList.users) {
        this.setState({
          users: newProps.userList.users,
          totalRecords: newProps.userList.total_record
        })
      }
      if (this.props.user !== newProps.user) {
        if (newProps.user.status) {
          this.setState({ modalShow: false, tableReset: true })
          toast.success(newProps.user.message);
        }
      }
    }
    this.setState({ loading: newProps.loading })

  }

  delete() {
    this.props.deleteUser(this.state.deleteId)
  }

  render() {
    const { match } = this.props;
    const { users } = this.state;
    const columns = [{
      Header: 'NAME',
      accessor: 'name'
    }, {
      Header: 'JOINED DATE',
      id: 'created_at',
      accessor: c => { return moment(c.joined_date).format('DD MMM, YYYY') }
    }, {
      Header: 'STATUS',
      id: 'is_active',
      accessor: 'status',
      Cell: props => (
        <div className="toggle-wrap">
          <div className="toggle">
            <input type="checkbox" checked={props.value} onChange={(e) => {
              let status = (props.value) ? false : true;
              this.props.updateUserStatus(props.original.id, status);
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
          <Link to={`/admin/users/view/${props.value}`} title="View"><IcomoonReact iconSet={iconSet} color="#717171" size={20} icon="eye" /></Link>
          <Link to={`/admin/users/edit/${props.value}`} title="Edit"><IcomoonReact iconSet={iconSet} color="#717171" size={16} icon="edit" /></Link>
          <span title="Delete" onClick={() => this.setState({ modalShow: true, deleteId: props.value })}><IcomoonReact iconSet={iconSet} color="#717171" size={16} icon="trash" /></span>
        </div>
      ),
      // Footer: (
      //   <span>
      //     <strong>Total Users : {this.state.totalRecords}</strong>
      //   </span>
      // )
    }];
    let modalClose = () => this.setState({ modalShow: false });
    let tableRerender = () => this.setState({ tableReset: false });
    return (
      <div className="main-content">
        <Breadcrumb match={match} />
        <div className="user-list">
          <Link title="Add User" className="form-search" to={`${match.url}/add`}><IcomoonReact iconSet={iconSet} color="#0086c5" size={26} icon="add" /></Link>
          <DataTable
            columns={columns}
            data={users}
            loading={this.state.loading}
            getList={this.props.getUserList}
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
            title="user"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

const UserListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

export default UserListConnected;
