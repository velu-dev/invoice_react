import React, { Component, Fragment } from "react";
import _ from 'lodash';
import matchSorter from 'match-sorter';
import ReactTable from 'react-table';
import { ListContentLoader } from 'components';
import BillingModal from 'views/common/BillingModal';
import 'react-table/react-table.css';

/*server side data table */
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      filters: {
        status: 'All',
        search: '',
        pageSize: 10,
        page: 1
      },
      pages: 0,
      billingModalShow: false,
      rowInfo: []
    }
    this.onFetchData = this.onFetchData.bind(this);
    this.handelChange = this.handelChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true })
  }
  componentWillReceiveProps(newProps) {
    if (newProps.reset) {
      this.onFetchData();
      newProps.rerender();
    }
    let pagesSlice = newProps.totalRecords / this.state.filters.pageSize;
    let pages = ((pagesSlice) < 1 ? 1 : Math.round(pagesSlice));
    this.setState({ pages })
    if (!newProps.loading) {
      this.setState({ loading: false })
    }
  }

  onFetchData(state, instance) {
    if (!_.isEmpty(state)) {
      let sorted = {};
      if (!_.isEmpty(state.sorted)) {
        sorted = { id: state.sorted[0].id, desc: state.sorted[0].desc };
      }
      this.setState({
        filters: {
          page: state.page + 1,
          pageSize: state.pageSize,
          sorted: sorted,
          filtered: state.filtered,
          status: this.state.filters.status,
          search: this.state.filters.search
        }
      }, () => { this.props.getList(this.state.filters); })
    } else {
      this.props.getList(this.state.filters);
    }
  }

  handelChange(e) {
    const { name, value } = e.target;
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [name]: value
      }
    }, () => { this.onFetchData() })
  }

  render() {
    const { match, columns, data, loading, rowView, statusFilter, statusFilterList, popupView, viewModal } = this.props;
    const { filters } = this.state;
    return (
      <Fragment>

        {this.state.loading ? <ListContentLoader /> :
          <Fragment>
            {!statusFilter ?
              <Fragment>
                <p className="status-label">Status</p>
                <select value={filters.status} name="status" onChange={this.handelChange}>
                  <option value="All">ALL</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">In Active</option>
                </select>
              </Fragment>
              : <Fragment>
                <p className="status-label">Status</p>
                <select value={filters.status} name="status" onChange={this.handelChange}>
                  <option value=''>All</option>
                  {statusFilterList.map((filter, index) => {
                    return (<option key={index} value={filter.status}>{filter.status}</option>)
                  })}
                </select>
              </Fragment>}
            <input name="search" type="text" value={filters.search} placeholder="Search Here" onChange={this.handelChange} />
            <ReactTable
              data={data}
              columns={columns}
              onFetchData={this.onFetchData}
              pages={this.state.pages}
              className="-striped -highlight"
              loading={loading}
              defaultPageSize={10}
              minRows={3}
              manual
              getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row && rowView) {
                  return {
                    onClick: (e) => {
                      this.props.history.push(`${match.url}/view/${rowInfo.original.id}`)
                    }
                  }
                } else if (rowInfo && rowInfo.row && popupView) {
                  return {
                    onClick: (e) => {                  
                      this.setState({ [viewModal]: true, rowInfo: rowInfo.original });
                    }
                  }
                } else if (rowInfo && rowInfo.row) {
                  return {
                    className: rowInfo.original.status === false ? 'inactive' : '',
                  }
                } else {
                  return {}
                }
              }}
            />
            <BillingModal
              show={this.state.billingModalShow}
              onHide={() => this.setState({ billingModalShow: false })}
              title="Billing"
              rowInfo={this.state.rowInfo}
              {...this.props}
            />
          </Fragment>
        }
      </Fragment>
    );
  }
}

/*Client side data table */
class ClientSideDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      filters: {
        status: '',
        search: '',
        pageSize: 10,
        page: 1
      },
      data: [],
      filter_list: [],
      pages: 0
    }
    this.handelChange = this.handelChange.bind(this);
  }

  componentWillReceiveProps({ data, filterValue }) {
    if (!_.isEmpty(data)) {
      this.setState({ data: data, filter_list: _.uniqBy(data, filterValue) });
    }
  }

  handelChange(e) {
    const { name, value } = e.target;
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [name]: value
      }
    }, () => { this.tableFilterApply(this.state.filters) });
  }

  tableFilterApply = ({ search, status }) => {
    let filterAppliedList = matchSorter(this.props.data, search, { keys: ['name'] })
    if (!_.isEmpty(status)) {
      filterAppliedList = matchSorter(filterAppliedList, this.state.filters.status, { keys: ['status'] })
    }
    this.setState({ data: filterAppliedList });
  }

  render() {
    const { match, columns, loading, rowView } = this.props;
    const { filters, data, filter_list } = this.state;
    return (
      <>
      {loading ? <ListContentLoader /> :
        <Fragment>
          <p className="status-label">Status</p>
          <select value={filters.status} name="status" onChange={this.handelChange}>
            <option value=''>All</option>
            {filter_list.map((filter, index) => {
              return (<option key={index} value={filter.status}>{filter.status}</option>)
            })}
          </select>
          <input name="search" type="text" value={filters.search} placeholder="Search Here" onChange={this.handelChange} />

          <ReactTable
            data={data}
            columns={columns}
            className="-striped -highlight"
            loading={loading}
            defaultPageSize={10}
            minRows={3}
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row && rowView) {
                return {
                  onClick: (e) => {
                    this.props.history.push(`${match.url}/view/${rowInfo.original.id}`)
                  }
                }
              } else if (rowInfo && rowInfo.row) {
                return {
                  className: rowInfo.original.status === false ? 'inactive' : '',
                }
              } else {
                return {}
              }
            }}
          />
        </Fragment>
      }
      </>
    );
  }
}


export { DataTable, ClientSideDataTable };
