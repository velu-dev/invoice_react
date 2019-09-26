import React, { Component, Fragment } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { assetURL } from '_constants';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ButtonLoader, StripeDetailsLoader } from 'components';
import { stripeAccount, syncWithStripe, stripeDisconnect } from 'redux/actions';
import StripeConnectModal from 'views/common/StripeConnectModal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';

const mapStateToProps = ({ account, authUser }) => {
	const { loading, stripe_account, sync_stripe, stripe_disconnect } = account;
	return { loading, stripe_account, sync_stripe, stripe_disconnect };
};

const mapDispatchToProps = (dispatch) => {
	return {
		stripeAccount: () => {
			dispatch(stripeAccount())
		},
		syncWithStripe: () => {
			dispatch(syncWithStripe())
		},
		stripeDisconnect: () => {
			dispatch(stripeDisconnect())
		},
	}
}


class Stripe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			StripeConnectModalShow: false,
			stripe_connected: false,
			stripe_detail: {},
			syncWithStripe: false,
			stripeDisconnect: false,
			loading: false,
			contentLoading: true
		};
	}

	componentDidMount() {
		this.props.stripeAccount();
	}

	componentWillReceiveProps({ loading, stripe_account, sync_stripe, stripe_disconnect }) {
		if (!loading) {
			/**Sync with stripe */
			if (this.props.sync_stripe !== sync_stripe && sync_stripe.status) {
				this.setState({ syncWithStripe: false, stripe_detail: stripe_account.data });
			}
			/**Stripe detail */
			if (this.props.stripe_account !== stripe_account && stripe_account.status) {
				this.setState({ stripe_connected: true, stripe_detail: stripe_account.data }, ()=>{
					this.setState({ contentLoading: false })
				});
			}

			/**Stripe diconnect */
			if (this.props.stripe_disconnect !== stripe_disconnect && stripe_disconnect.status) {
				this.setState({ stripeDisconnect: false, stripe_connected: false },()=>{
					this.setState({ contentLoading: false })
				});
			}		 
		}
	}

	render() {
		const { stripe_connected, stripe_detail, syncWithStripe, contentLoading, stripeDisconnect } = this.state;
		const { match } = this.props;		 
		return (
			<Fragment>
				<div className="card">
					<div className="card-header">
						<h2>Stripe Details</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>
					{contentLoading ? <StripeDetailsLoader /> :
						<div className="card-body stripe-body-sec">
							{
								(!stripe_connected) ?
									<>
									<div className="stripe-description ">
										<h3>Invoice Application Uses stripe for payment Processing.<br />Please connect to your stripe account<br /> to start using the features</h3>
										<div className="button-row">
											<Button type="submit" className="hvr-sweep-to-bottom green-link  btn-custom" onClick={() => this.setState({ StripeConnectModalShow: true })}>Connect to Stripe</Button>
										</div>
									</div>
									<StripeConnectModal
										show={this.state.StripeConnectModalShow}
										onHide={() => this.setState({ StripeConnectModalShow: false })}
										title="Stripe Connect"
									/>
									</>
									:
									<Form>
										<Form.Row className="content-row">
											<Form.Group as={Col} md="6">
												<Form.Label>Company Name</Form.Label>
												<input
													type="text"
													name="company_name"
													value={(stripe_detail.business_name !== null) ? stripe_detail.business_name : ''}
													className="form-control"
													disabled={true}
												/>
											</Form.Group>
											<Form.Group as={Col} md="6">
												<Form.Label>Country</Form.Label>
												<input
													type="text"
													name="Country"
													placeholder="Lorem Ipsum"
													value={(stripe_detail.country !== null) ? stripe_detail.country : ''}
													className="form-control"
													disabled={true}
												/>
											</Form.Group>
											<Form.Group as={Col} md="6">
												<Form.Label>Currency</Form.Label>
												<input
													type="text"
													name="currency"
													placeholder="Lorem Ipsum Lorem"
													value={(stripe_detail.default_currency !== null) ? _.upperCase(stripe_detail.default_currency) : ''}
													className="form-control"
													disabled={true}
												/>
											</Form.Group>
											<Form.Group as={Col} md="6">
												<Form.Label>Logo</Form.Label>
												<span className="d-block">
													{(stripe_detail.business_logo !== null) ?
														<Image src={stripe_detail.business_logo} width="20%" alt="mastercard" fluid />
														:
														<Image src={`${assetURL}images/stripe.png`} width="20%" alt="stripe" fluid />
													}
												</span>
											</Form.Group>
										</Form.Row>

										<div className="button-row">
											<Link to="" className="btn btn-custom btn-light-blue">Edit</Link>
											<Button className="btn-custom btn-light-green" variant="success" onClick={() => {
												this.setState({ syncWithStripe: true }, () => {
													this.props.syncWithStripe()
												})
											}
											} disabled={syncWithStripe}>Sync With Stripe&nbsp;{(syncWithStripe) ? <ButtonLoader /> : null}</Button>
											<Button className="btn btn-custom btn-link" variant="success" onClick={() => {
												this.setState({ stripeDisconnect: true }, () => {
													this.props.stripeDisconnect()
												})
											}
											} disabled={stripeDisconnect}>Disconnect&nbsp;{(stripeDisconnect) ? <ButtonLoader /> : null}</Button>
										</div>
									</Form>
							}
						</div>
					}
				</div>
			</Fragment>
		);
	}
}


const StripeConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Stripe);

export default StripeConnected;