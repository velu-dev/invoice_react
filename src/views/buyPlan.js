import React, { Component, Fragment } from "react";
import MaskedInput from "react-text-mask";
import _ from 'lodash';
import { connect } from 'react-redux';
import { assetURL, cardBrands } from '_constants/BaseConfig';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import ThankyouModal from 'views/common/ThankyouModal';
import { Formik, ErrorMessage, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { buyPlanValidationSchema, UserBreadcrumb, ButtonLoader, formValuesAssignIn, cardNumberMask, expiryDateMask, creditcardValidation, BuyPlanSectionPlanLoader, BuyPlanSectionContentLoader } from 'components';
import { buyPlan, buyNewPlan } from 'redux/actions';
import './buyPlan.css';

const mapStateToProps = ({ account }) => {
	const { loading, buy_plan, buy_new_plan } = account;
	return { loading, buy_plan, buy_new_plan };
};

const mapDispatchToProps = (dispatch) => {
	return {
		buyPlan: (id) => {
			dispatch(buyPlan(id))
		},
		buyNewPlan: (formData) => {
			dispatch(buyNewPlan(formData))
		}
	}
}

const initialFormState = {
	id: '',
	email: '',
	phone: '',
	name: '',
	number: '',
	expiry_date: '',
	cvc: '',
	subscription_id: '',
	new_card: false,
	thankyouModalShow: false
};

class BuyPlan extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formState: { ...initialFormState },
			subscription: {},
			user: {},
			card: {},
			card_brand: '',
			creditCardInput: false
		};
		this.formikActions = {};
		this.form = {};   
		console.log(this.props.match.params.id)
	}

	setFormNode = (node) => this.form = node
	inputFocus = (input) =>{ 
		 return  this.form.querySelector(`input[name="${input}"]`)
	}

	componentDidMount() {
		this.props.buyPlan(this.props.match.params.id)
	}

	componentWillReceiveProps({ loading, buy_plan, buy_new_plan }) {
		if (!loading) {
			if (buy_plan.status) {
				let { formState } = { ...this.state };
				let { card, user, plan } = buy_plan.data;
				this.setState({
					subscription: buy_plan.data.plan,
					user: buy_plan.data.user,
					card: buy_plan.data.card
				})
				if (!_.isEmpty(user)) {
					formState.email = user.email;
					formState.phone = user.phone;
					this.setState({ formState });
				}
				if (!_.isEmpty(plan)) {
					formState.subscription_id = plan.id
				}
				if (!_.isEmpty(card)) {
					formState.id = card.id;
					formState.name = (card.name) ? card.name : '';
					formState.number = `************${card.last4}`;
					formState.expiry_date = card.expiry_date;
					this.setState({ formState, card_brand: card.brand })
				}
			}

			if (this.props.buy_new_plan !== buy_new_plan) {
				if (buy_new_plan.status) {
					this.setState({ thankyouModalShow: true })
				} else {
					if (buy_new_plan.errors) {
						this.formikActions.setErrors(buy_new_plan.errors);
					}
					this.formikActions.setSubmitting(false);
				}
			}

		}
	}
	render() {
		const { formState, subscription, user, card, card_brand } = this.state;
		const { match } = this.props;
		console.log(formState);
		return (
			<Fragment>
				<UserBreadcrumb match={match} />
				<section className="buy-plan-page">
					<Container>
						<Row>
							<Col md={4} lg={3} className="p-sm-0">
								<div className="card">
									{(_.isEmpty(this.formikActions) && this.props.loading) ? <BuyPlanSectionPlanLoader /> :
										<div className="card-body">
											<div className="user-plan">
												<div className="plan-title">
													<Image src={`${assetURL}images/home/premium.png`} alt="Banner" fluid />
													<h3>{subscription.plan_name}</h3>
													<p className="price-detail">{(subscription.price === 0 ? 'Free' : <Fragment><sup>$</sup>{subscription.price}</Fragment>)}</p>
												</div>
												<ul>
													{
														(!_.isEmpty(subscription.benefits)) ?
															subscription.benefits.map((benefit, i) => <li key={i}><IcomoonReact iconSet={iconSet} color="#0086c5" size={16} icon="check" />{benefit}</li>)
															: null
													}
												</ul>
											</div>
										</div>
									}
								</div>
							</Col>
							<Col md={8} lg={9} className="pl-sm-0 pr-sm-0 pl-md-4">
								<div className="card">
									<div className="card-header">
										<h2>Account Settings</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
									</div>
									{(_.isEmpty(this.formikActions) && this.props.loading) ? <BuyPlanSectionContentLoader /> :
										<div className="card-body">
											<Formik											 
												initialValues={formState}
												enableReinitialize={true}
												onSubmit={(values, actions) => {
													this.formikActions = actions;
													if (card.name !== values.name || values.number !== `************${card.last4}` || card.expiry_date
														!== values.expiry_date) {
														values.new_card = true;
													} else {
														values.new_card = false;
													}													
													 this.props.buyNewPlan(values)
													actions.setSubmitting(true);
												}}
												validationSchema={buyPlanValidationSchema}
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
														<Form onSubmit={handleSubmit} ref={this.setFormNode}>
															<Row className="personal_details">
																<Col md={6}>
																	<h2 className="mb-4">Personal Details</h2>
																	<Form.Row className="content-row">
																		<Form.Group as={Col} md="12">
																			<Form.Label>User Name</Form.Label>
																			<input
																				type="text"
																				name="user_name"
																				value={(user.name)?user.name:''}
																				className="form-control"
																				disabled={true}
																			/>
																		</Form.Group>
																		<Form.Group as={Col} md="12">
																			<Form.Label>Email ID</Form.Label>
																			<Field
																				type="text"
																				name="email"
																				placeholder="Enter a Email ID"
																				value={values.email}
																				className={`form-control ${(errors.email && touched.email ? ' is-invalid' : '')}`}
																			/>
																			<ErrorMessage name="email" component="div" className="invalid-feedback" />
																		</Form.Group>
																		<Form.Group as={Col} md="12">
																			<Form.Label>Phone Number</Form.Label>
																			<Field
																				type="text"
																				name="phone"
																				placeholder="Enter a Phone Number"
																				value={values.phone}
																				className={`form-control ${(errors.phone && touched.phone ? ' is-invalid' : '')}`}
																			/>
																			<ErrorMessage name="phone" component="div" className="invalid-feedback" />
																		</Form.Group>
																	</Form.Row>
																</Col>
																<Col md={6} className="buy_plan_Img">
																	<Col sm={12} className="text-center"><Image src={`${assetURL}images/home/buy_plan.png`} alt="buy plan" fluid /></Col>
																</Col>
															</Row>

															<Row>
																<Col md={12} className="mt-4">
																	<h2 className="mb-4">Card Details</h2>
																	<Form.Row className="content-row">
																		<Form.Group as={Col} md="12" lg="6">
																			<Form.Label>Card Holder Name <span className="req">*</span></Form.Label>
																			<Field
																				type="text"
																				name="name"
																				placeholder="Enter a card holder name"
																				value={values.name}
																				onChange={(e) => {
																					setFieldValue('number', '');
																					this.setState({ creditCardInput: true })
																					setFieldValue(e.target.name, e.target.value);
																				}}
																				className={`form-control ${(errors.name && touched.name ? ' is-invalid' : '')}`}
																			/>
																			<ErrorMessage name="name" component="div" className="invalid-feedback" />
																		</Form.Group>
																		<Form.Group as={Col} md="12" lg="6" className="icon-group">
																			<Form.Label>Card Number <span className="req">*</span></Form.Label>
																			{(!this.state.creditCardInput) ?
																				<input type="text"
																					value={values.number}
																					onClick={() => {
																						setFieldValue('number', '');
																						this.setState({ creditCardInput: true },()=>{
																							this.inputFocus('number').focus()
																						})
																					}}
																					onChange={() => {
																						setFieldValue('number', '');
																						this.setState({ creditCardInput: true },()=>{
																							this.inputFocus('number').focus()
																						})
																					}}
																					className={`form-control`}
																				/>
																				:
																				<Fragment>
																					<Field
																						name="number"
																						render={({ field }) => (
																							<MaskedInput
																								{...field}
																								mask={cardNumberMask}
																								placeholder="Enter a card number"
																								value={values.number}
																								type="text"
																								onChange={(e) => {
																									let card = creditcardValidation(e.target.value)
																									if (card.isValid) {
																										this.setState({ card_brand: card.brand })
																									} else {
																										this.setState({ card_brand: '' })
																									}
																									setFieldValue(e.target.name, e.target.value);																								 																								
																								}}
																								onBlur={handleBlur}
																								className={`form-control ${(errors.number && touched.number ? ' is-invalid' : '')}`}
																							/>
																						)}


																					/>
																					<ErrorMessage name="number" component="div" className="invalid-feedback" />
																				</Fragment>
																			}
																			{
																				(_.includes(cardBrands, card_brand)) ?
																					<div className="icon-set"><Image src={`${assetURL}images/cardbrands/${card_brand}.png`} alt="mastercard" fluid /></div>
																					: <div className="icon-set"><Image src={`${assetURL}images/cardbrands/blank-card.png`} alt="blank" fluid /></div>
																			}
																		</Form.Group>
																		<Form.Group as={Col} md="12" lg="6" className="icon-group">
																			<Form.Label>Expiry Month and Year <span className="req">*</span></Form.Label>
																			<Field
																				name="expiry_date"
																				render={({ field }) => (
																					<MaskedInput
																						{...field}
																						mask={expiryDateMask}
																						placeholder="Enter Expiry Month and Year"
																						value={values.expiry_date}
																						type="text"
																						onChange={(e) => {
																							setFieldValue('number', '');
																							this.setState({ creditCardInput: true })
																							setFieldValue(e.target.name, e.target.value);
																						}}
																						onBlur={handleBlur}
																						className={`form-control ${(errors.expiry_date && touched.expiry_date ? ' is-invalid' : '')}`}
																					/>
																				)}
																			/>
																			<ErrorMessage name="expiry_date" component="div" className="invalid-feedback" />
																		</Form.Group>
																		<Form.Group as={Col} md="12" lg="6" className="icon-group">
																			<Form.Label>CVV <span className="req">*</span></Form.Label>
																			<Field
																				type="text"
																				name="cvc"
																				placeholder="Enter CVV "
																				value={values.cvc}
																				maxLength={3}
																				className={`form-control ${(errors.cvc && touched.cvc ? ' is-invalid' : '')}`}
																			/>
																			<ErrorMessage name="cvc" component="div" className="invalid-feedback" />
																		</Form.Group>
																	</Form.Row>
																	<div className="button-row"><Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Proceed Payment&nbsp;{(isSubmitting) ? <ButtonLoader /> : null}</Button></div>
																</Col>
															</Row>
														</Form>
													)}
											</Formik>
											<ThankyouModal
												show={this.state.thankyouModalShow}
												onHide={() => this.setState({ thankyouModalShow: false }, () => {
													this.props.history.push('/settings');
												})}
												title="Thank you"
												{...this.props}
											/>
										</div>
									}
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</Fragment>
		);
	}
}

const BuyPlanConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(BuyPlan);

export default BuyPlanConnected;