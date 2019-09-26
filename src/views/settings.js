import React, { Component, Fragment } from "react";
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { assetURL } from '_constants';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import { getAccountDetails, authUpdate, invoiceRedirectUrl, getPlanStatus } from 'redux/actions';
import { UserBreadcrumb, authService, accountSettingValidationSchema, redirectValidationSchema, ButtonLoader, whiteSpaceTrim, numberOnly, SettingPlanExpiryLoader, AccountSettingLoader } from 'components';
import Stripe from './stripe';
import Cards from './cards';
import TrialPack from './trialpack';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import ChangePasswordModal from 'views/common/ChangePasswordModal';
import NoticeModal from 'views/common/NoticeModal';
import BuyPlanModal from 'views/common/BuyPlanModal';
import DeleteAccountModal from 'views/common/DeleteAccountModal';
import './settings.css'

const mapStateToProps = ({ account, authUser }) => {
	const { loading, account_details, redirect, plan_status } = account;
	const { auth_update } = authUser;
	return { loading, account_details, auth_update, redirect, plan_status };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAccountDetails: (filters) => {
			dispatch(getAccountDetails(filters))
		},
		authUpdate: (formData) => {
			dispatch(authUpdate(formData))
		},
		invoiceRedirectUrl: (id) => {
			dispatch(invoiceRedirectUrl(id))
		},
		getPlanStatus: (id) => {
			dispatch(getPlanStatus(id))
		}		 
	}
}

const initialFormState = {
	user: {
		email: '',
		phone: '',
	},
	redirect: {
		url: ''
	}

};

class AccountSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userFormState: { ...initialFormState.user },
			redirectFormState: { ...initialFormState.redirect },
			loading: true,
			subscription: {},
			benefits: [],
			ChangePasswordModalShow: false,
			BuyPlanModalShow: false,
			DeleteAccountModalShow: false,
			NoticeModalShow:false,
			valid_up_to: moment(),
			redirect_url: '',
			remaining_days: "00"
		};
	}

	componentDidMount() {
		this.props.getAccountDetails(); 
	}

	componentWillReceiveProps({ loading, account_details, auth_update, redirect, plan_status }) {
		 
		if (!loading) {	 
			/**Account details */
			if (!_.isEmpty(account_details.user)) {
				let url = '';
				if (!_.isEmpty(account_details.user.invoice_redirect_url)) {
					url = account_details.user.invoice_redirect_url
				}
				this.setState({
					userFormState: account_details.user,
					subscription: account_details.subscription,
					benefits: account_details.subscription.benefits,
					valid_up_to: account_details.valid_up_to,
					redirectFormState: { url: url },
					remaining_days: account_details.remaining_days,
					loading:false
				})

			}
			/**User update */
			if (this.props.auth_update !== auth_update) {
				if (auth_update.status) {
					if (auth_update.email_updated) {
						authService.signout(() => {
							this.props.history.push('/home');
						});
					}
				} else {
					if (auth_update.errors) {
						this.formikActions.setErrors(auth_update.errors);
					}
				}
				this.formikActions.setSubmitting(false);
			}
			/**Redirect*/
			if (this.props.redirect !== redirect) {
				if (!redirect.status && auth_update.errors) {
					this.formikActions.setErrors(redirect.errors);
				}
				this.formikActions.setSubmitting(false);
			}

			/**Redirect*/
			if (this.props.plan_status !== plan_status) {
				if (plan_status.status) {
					this.props.history.push(`/buyplan/${this.state.subscription.id}`);
				}else{
					this.setState({NoticeModalShow:true});
				}
			 
			}
		}
	}

	render() {
		const { redirectFormState, userFormState, subscription, benefits, remaining_days } = this.state;
		const { match } = this.props;
		let ChangePasswordModalClose = () => this.setState({ ChangePasswordModalShow: false });
		return (
			<Fragment>
				<UserBreadcrumb match={match} />
				<section className="user-settings-page">
					<Container>
						<Row>
							<Col className="pl-0" md={4} lg={3}>
								<div className="card">
								{this.state.loading ? <SettingPlanExpiryLoader /> :
									<div className="card-body setting-plan-sec">
										{(subscription.is_trail) ?
											<TrialPack
												days={remaining_days}
												buyPlan={() => this.setState({ BuyPlanModalShow: true })} />
											:
											<div className="user-plan">
												<div className="plan-title">
													<Image src={`${assetURL}images/home/premium.png`} alt="Banner" fluid />
													<h3>{subscription.plan_name}</h3>
													<p className="price-detail">{(subscription.price === 0 ? 'Free' : <Fragment><sup>$</sup>{subscription.price}</Fragment>)}</p>												 
													<p>Plan Expires on {moment(this.state.valid_up_to).format('MM/YYYY')} </p>
												 
												</div>
												<ul>
													{
														(!_.isEmpty(benefits))?
														benefits.map((benefit, i) => <li key={i}><IcomoonReact iconSet={iconSet} color="#0086c5" size={16} icon="check" />{benefit}</li>)
														:null
													}
												</ul>											
												<button type="button" className="hvr-sweep-to-bottom green-link btn" onClick={() => this.props.getPlanStatus(subscription.id)}>Renew Plan</button>
												<button type="button" className="hvr-sweep-to-bottom blue-link btn-buy-plan btn" onClick={() => this.setState({ BuyPlanModalShow: true })}>Buy Plan</button>
												{remaining_days < 10?
												<p>The plan will be expiry on {moment(this.state.valid_up_to).format('DD/MM/YYYY')} </p>
												:null
												}
												
											</div>
										}
										<BuyPlanModal
											show={this.state.BuyPlanModalShow}
											onHide={() => this.setState({ BuyPlanModalShow: false })}
											title="Buy Plan"
											{...this.props}
										/>
										<NoticeModal
											show={this.state.NoticeModalShow}
											buyPlan={() => this.setState({ NoticeModalShow: false, BuyPlanModalShow: true })}
											onHide={() => this.setState({ NoticeModalShow: false})}
											title="Notice"
										/>
										
									</div>
								}
								</div>

								<div className="card">
									<div className="card-header text-center">
										<h2>Default Redirect URL</h2>
									</div>
									<div className="card-body redirect-url-form">
										<Formik
											initialValues={redirectFormState}
											enableReinitialize={true}
											onSubmit={(values, actions) => {
												this.formikActions = actions;
												this.props.invoiceRedirectUrl(values);
												actions.setSubmitting(true);
											}}
											validationSchema={redirectValidationSchema}
										>
											{({
												handleSubmit,
												handleChange,
												handleBlur,
												values,
												touched,
												isValid,
												isSubmitting,
												setFieldValue,
												resetForm,
												errors
											}) => (
													<Form onSubmit={handleSubmit}>
														<Form.Row className="content-row">
															<Form.Group>
																<Form.Label>Default Redirect URL</Form.Label>
																<Field
																	type="text"
																	name="url"
																	placeholder="https://example.com"
																	value={values.url}
																	className={'form-control' + (errors.url && touched.url ? ' is-invalid' : '')}
																/>
																<ErrorMessage name="url" component="div" className="invalid-feedback" />
															</Form.Group>
														</Form.Row>

														<div className="button-row">
															<Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Save {(isSubmitting) ? <ButtonLoader /> : null}</Button>
															<Button className="btn btn-custom btn-grey" onClick={() => { resetForm(initialFormState.redirect) }}>Clear</Button>
														</div>
													</Form>
												)}
										</Formik>
									</div>
								</div>

								<div className="card billing-left-sec">
									<div className="card-body">
										<Link to='/mybilling' className="hvr-sweep-to-bottom green-link">My Billing</Link>
									</div>
								</div>

								<div className="card billing-left-sec">
									<div className="card-body">
										<button type="button" className="hvr-sweep-to-bottom blue-link btn btn-primary" onClick={() => this.setState({ DeleteAccountModalShow: true })}>Delete My Account</button>
										<DeleteAccountModal
											show={this.state.DeleteAccountModalShow}
											onHide={() => this.setState({ DeleteAccountModalShow: false })}
											title="Delete Account"
											{...this.props}
										/>
									</div>
								</div>
							</Col>
							<Col md={8} lg={9} className="pl-sm-2 pr-0">
								<div className="card">
									<div className="card-header">
										<button type="button" className="btn-change-password btn btn-primary" onClick={() => this.setState({ ChangePasswordModalShow: true })}>Change Password</button>
										<h2>Account Settings</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
									</div>
									{this.state.loading ? <AccountSettingLoader /> :			
										<div className="card-body account-setting-body">
										<Formik
											initialValues={userFormState}
											enableReinitialize={true}
											onSubmit={(values, actions) => {
												this.formikActions = actions;
												this.props.authUpdate(values);
												actions.setSubmitting(true);
											}}
											validationSchema={accountSettingValidationSchema}
										>
											{({
												handleSubmit,
												handleChange,
												handleBlur,
												values,
												touched,
												isValid,
												isSubmitting,
												setFieldValue,
												errors
											}) => (
													<Form onSubmit={handleSubmit}>
														<Form.Row className="content-row">
															<Form.Group as={Col} md="6" controlId="validationFormik02">
																<Form.Label>Email ID<span className="req"> *</span></Form.Label>
																<Field
																	type="text"
																	name="email"
																	placeholder="Enter Email ID"
																	value={values.email}
																	maxLength={64}
																	onChange={e => whiteSpaceTrim(e, setFieldValue)}
																	className={`form-control ${errors.email && touched.email ? ' is-invalid' : ''}`}
																/>
																<ErrorMessage name="email" component="div" className="invalid-feedback" />
															</Form.Group>
															<Form.Group as={Col} md="6" controlId="validationFormik03">
																<Form.Label>Phone Number<span className="req"> *</span></Form.Label>
																<Field
																	type="text"
																	name="phone"
																	placeholder="Enter Phone Number"
																	value={values.phone}
																	maxLength={13}
																	onChange={e => numberOnly(e, setFieldValue)}
																	className={`form-control ${errors.email && touched.email ? ' is-invalid' : ''}`}
																/>
																<ErrorMessage name="phone" component="div" className="invalid-feedback" />
															</Form.Group>
														</Form.Row>

														<div className="button-row"><Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Save Changes&nbsp;{(isSubmitting) ? <ButtonLoader /> : null}</Button>
															<Link to={`/home`} className="btn btn-custom btn-link">Cancel</Link>
														 
														</div>
													</Form>
												)}
										</Formik>
									</div>
									}
									<ChangePasswordModal
										show={this.state.ChangePasswordModalShow}
										onHide={ChangePasswordModalClose}
										title="ChangePassword"
										{...this.props}
									/>
								</div>
								<Stripe />
								<Cards />
							</Col>
						</Row>
					</Container>
				</section>
			</Fragment>
		);
	}
}


const AccountSettingsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountSettings);

export default AccountSettingsConnected;