import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import { Formik, Field } from 'formik';
import { assetURL, cardBrands, ADD_CARD } from '_constants';
import { cardValidationSchema, ButtonLoader, ExpiryDateInputMask, CardNumberInputMask, creditcardValidation, AlertBox } from 'components';
import { addCard, getCards } from 'redux/actions';
import { toast } from 'react-toastify';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';


const mapStateToProps = ({ account }) => {
	const { add_card, loading } = account;
	return { add_card, loading };
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCard: (formData) => {
			dispatch(addCard(formData))
		},
		getCards: () => {
			dispatch(getCards())
		}
	}
}
const initialFormState = {
	name: '',
	number: '',
	expiry_date: '',
	cvc: '',
	default: false
};

class NewCardModal extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			formState: {...initialFormState},
			card_brand: '',
			alertBox: false,
			alertMessage: '',
		};
		this.formikActions = {};
		console.log(props)
	}

	componentWillReceiveProps({ add_card, loading }) {
		let { formState } = { ...this.state };
		if (!loading) {
			if (add_card.status && this.props.add_card !== add_card) {
				this.formikActions.resetForm();
				this.props.getCards();
				this.setState({ alertBox: false }) 
				this.props.onHide();
			} else {
				if (!_.isEmpty(add_card.errors)) {
					if (add_card.errors.stripe) {
						this.setState({ alertBox: true, alertMessage: add_card.errors.stripe })
					}
					this.formikActions.setErrors(add_card.errors);
					this.formikActions.setSubmitting(false);
				}
			}
			formState.default = this.props.default;		 
			this.setState({ formState });
		} 
	}
 
	cancelForm = (reset) => {
		initialFormState.default = this.props.default
		reset(initialFormState);
		this.props.onHide();
	}


	render() {
		const { formState, card_brand, alertBox, alertMessage } = this.state
		console.log(formState);
		return (
			<Formik			
				initialValues={formState}
				enableReinitialize={true}
				onSubmit={(values, actions) => {
					this.formikActions = actions;
					console.log(values)
					this.props.addCard(values)
					actions.setSubmitting(true);
				}}
				validationSchema={cardValidationSchema}
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

						<Modal
							show={this.props.show}
							onHide={this.props.onHide}
							size="md"
							aria-labelledby="contained-modal-title-vcenter"
							className="Custom-modal"
							backdrop="static"
							centered
						>
							<Form onSubmit={handleSubmit}>
								<Modal.Header>Add New Card</Modal.Header>
								<Modal.Body>
									<AlertBox alertMessage={alertMessage} alertBox={alertBox}></AlertBox>
									<div className="Custom-form-inner">

										<Form.Group className="icon-group">
											<TextField
												type="text"
												name="name"
												helperText={touched.name ? errors.name : ""}
												error={Boolean(errors.name)}
												label="Card Holder Name"
												className="label-required"
												fullWidth
												onChange={handleChange}
												value={values.name}
											/>
											<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="user" /></div>
										</Form.Group>
										<Form.Group className="icon-group">
											<TextField
												type="text"
												name="number"
												helperText={touched.number ? errors.number : ""}
												error={Boolean(errors.number)}
												label="Card Number"
												className="label-required"
												fullWidth
												value={values.number}
												onChange={(e) => {
													let card = creditcardValidation(e.target.value)
													if (card.isValid) {
														this.setState({ card_brand: card.brand })
													} else {
														this.setState({ card_brand: '' })
													}
													setFieldValue(e.target.name, e.target.value);
												}}
												InputProps={{
													inputComponent: CardNumberInputMask,
												}}
											/>
											<div className="icon-set">
												{
													(_.includes(cardBrands, card_brand)) ?
														<Image src={`${assetURL}images/cardbrands/${card_brand}.png`} alt={`${card_brand}`} fluid />
														:
														<Image src={`${assetURL}images/cardbrands/blank-card.png`} alt="blank" fluid />
												}
											</div>
										</Form.Group>
										<Row>
											<Col sm={8}>
												<Form.Group className="icon-group">
													<TextField
														type="text"
														name="expiry_date"
														helperText={touched.expiry_date ? errors.expiry_date : ""}
														error={Boolean(errors.expiry_date)}
														label="Expiry Date"
														className="label-required"
														fullWidth
														value={values.expiry_date}
														onChange={handleChange}
														InputProps={{
															inputComponent: ExpiryDateInputMask,
														}}
													/>
												</Form.Group>
											</Col>
											<Col sm={4}>
												<Form.Group className="icon-group">
													<TextField
														type="text"
														name="cvc"
														helperText={touched.cvc ? errors.cvc : ""}
														error={Boolean(errors.cvc)}
														label="CVC"
														inputProps={{ maxLength: 3 }}
														className="label-required"
														fullWidth
														value={values.cvc}
														onChange={handleChange}
													/>
												</Form.Group>
											</Col>
										</Row>
										<div className="check-sec mt-2 mb-2 text-left">
											<Field
												name='default'
												type="checkbox"
												value={values.default}
												checked={values.default}
												id="card_set_default"
												className="label-required"
												disabled={this.props.default}												 
											/>
											<Form.Label className="d-none d-sm-block" htmlFor="card_set_default">Set Default</Form.Label>
										</div>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<Button className="btn-custom btn-light-green" variant="success" type="submit" disabled={isSubmitting}>Save {(isSubmitting) ? <ButtonLoader /> : null}</Button>
									<Button className="btn-custom btn-light" variant="light" onClick={() => this.cancelForm(resetForm)}>Cancel</Button>
								</Modal.Footer>
							</Form>
						</Modal>
					)}
			</Formik>
		);
	}
}
const NewCardModalConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(NewCardModal)

export default NewCardModalConnected;

