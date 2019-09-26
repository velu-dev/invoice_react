import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik} from 'formik';
import Button from 'react-bootstrap/Button';
import {ButtonLoader } from "components";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assetURL } from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';
import { forgotPassword } from 'redux/actions';
import { forgotValidationSchema } from 'components/FormValidation';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import TextField from "@material-ui/core/TextField";

const mapStateToProps = ({ authUser }) => {
	const { forgot_password, loading } = authUser;
	return { forgot_password, loading };
};

const mapDispatchToProps = (dispatch) => {
	return {
		forgotPassword: (email, role) => {
			dispatch(forgotPassword(email, role))
		}
	}
}

const initialFormState = {
	email: ''
};

class ForgotPassword extends Component {

	constructor(props) {
		super(props);
		this.formikActions = {};
		this.signInModelShow = this.signInModelShow.bind(this);
	}

	componentWillReceiveProps(newprops) {
		if (this.props.forgot_password !== newprops.forgot_password && this.props.forgotModelshow === true) {
			if (newprops.forgot_password.status) {
				this.formikActions.resetForm();
				this.props.forgotModalHide();
				toast.success(newprops.forgot_password.message);
				this.props.history.push('/home');
			} else {
				if (newprops.forgot_password.errors) {
					this.formikActions.setErrors(newprops.forgot_password.errors);
				}
			}
		}
	}

	signInModelShow() {		
		this.props.forgotModalHide();
		this.props.signInModelShow();
	}

	render() {
		return (
			<Fragment>
				<Modal
					className="custom-modal auth-modal"
					show={this.props.forgotModelshow}
					onHide={this.props.forgotModalHide}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="px-0 py-0">
						<Row noGutters>
							<Col xs={12} sm={12} md={6} className="auth-left-block">
								<div className="text-center">
									<div className="logoImg">
										<Image src={`${assetURL}images/auth/logo.png`} alt="Invoice Application" fluid />
									</div>
									<Modal.Title>Forgot Password</Modal.Title>
								</div>
								<Formik
									initialValues={initialFormState}
									onSubmit={(values, actions) => {
										this.formikActions = actions;
										this.props.forgotPassword(values.email, 'user')
										actions.setSubmitting(true);
									}}
									validationSchema={forgotValidationSchema}
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
												<div className="auth-form-inner">
													<Form.Group controlId="password" className="icon-group">

															<TextField
															type="email"
															name="email"
															helperText={touched.email ? errors.email : ""}
															error={Boolean(errors.email)}
															label="Email ID"
															className="label-required"
															fullWidth
															value={values.email}
															onChange={handleChange}
															/>
															<div className="invalid-feedback">{Boolean(errors.email) ? "true" : "f"}</div>
														<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="email" /></div>
													</Form.Group>
													<Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Submit {(isSubmitting) ? <ButtonLoader /> : null}</Button>
													<p className="forget-text">Back to <span onClick={this.signInModelShow}>Sign In</span></p>
												</div>
											</Form>
										)}
								</Formik>
							</Col>
							<Col xs={12} sm={12} md={6} className="auth-right-block text-center">
								<Image src={`${assetURL}images/auth/auth_bg.png`} alt="Invoice Application" fluid />
							</Col>
						</Row>
					</Modal.Body>
				</Modal>
			</Fragment>
		)
	}
}

const ForgotPasswordConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPassword)

export default ForgotPasswordConnected;
