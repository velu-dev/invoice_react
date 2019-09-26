import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {assetURL, cardBrands} from '_constants';
import { getMyBillingList } from 'redux/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { DataTable, UserBreadcrumb } from 'components';
 
import './myBilling.css'


const mapStateToProps = ({ mybilling }) => {
	const { mybilling_list, loading } = mybilling;
	return { mybilling_list, loading };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMyBillingList: (filters) => {
			dispatch(getMyBillingList(filters))
		}
	}
}


const initialFormState = {
	email: '',
	phone: '',
	redirect_url: ''
};

class MyBilling extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mybillings: [],
			tableReset: false,
			statusFilterList: [],
			loading: props.loading,
			totalRecords: 0
		}

	}
	componentWillReceiveProps({ mybilling_list, loading }) {	 
		if (!loading) {
			if (mybilling_list.data) {
				this.setState({
					mybillings: mybilling_list.data,
					totalRecords: mybilling_list.total_record,
					statusFilterList: _.uniqBy(mybilling_list.data, 'status')
				})
			}
		}

		this.setState({ loading: loading })
	}

	render() {
		const { match } = this.props;
		const { mybillings, statusFilterList } = this.state;

		const columns = [{
			Header: 'PLAN NAME',
			accessor: 'plan_name'
		}, {
			Header: 'CARD BRAND',
			id: 'card_brand',
			accessor: c => {
				return (_.includes(cardBrands, c.card_brand)) ?
					<span className="card_icon"><Image src={`${assetURL}images/cardbrands/${c.card_brand}.png`} alt={c.card_brand} width="50px" />
					</span> : <span className="card_icon"><Image src={`${assetURL}images/cardbrands/blank-card.png`} alt={c.card_brand} width="50px" /></span>;
			}
		}, {
			Header: 'AMOUNT ($)',
			accessor: 'amount'
		}, {
			Header: 'PURCHASED DATE',
			id: 'purchase_date',
			accessor: c => { return moment(c.purchase_date).format('DD MMM, YYYY') }
		}, {
			Header: 'STATUS',
			id: 'is_active',
			accessor: 'status',
			Cell: c => { return c.value === 'Paid' ? <span className="status_paid">Paid</span> : <span 	className="status_failed">Failed</span>;
			}
		}];
		let tableRerender = () => this.setState({ tableReset: false });
		console.log(match);
		return (
			<Fragment>
		  	<UserBreadcrumb match={match} />
				<section className="billing-page-sec">
					<Container>
						<Row>
							<Col sm={12} className="my-billing-page">
								<DataTable
									columns={columns}
									data={mybillings}
									loading={this.state.loading}
									getList={this.props.getMyBillingList}
									totalRecords={this.state.totalRecords}
									reset={this.state.tableReset}
									statusFilter={true}
									statusFilterList={statusFilterList}
									rerender={tableRerender}
									popupView={true}
									viewModal={`billingModalShow`}
									{...this.props}
								/>
							</Col>
						</Row>
					</Container>
				</section>
			</Fragment>
		);
	}
}


const MyBillingConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyBilling);

export default MyBillingConnected;