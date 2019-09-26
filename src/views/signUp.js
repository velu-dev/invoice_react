import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import { ButtonLoader, whiteSpaceTrim, numberOnly } from "components";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assetURL } from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';
import { signUp } from 'redux/actions';
import { signupValidationSchema } from 'components/FormValidation';
import TextField from "@material-ui/core/TextField";
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';


const mapStateToProps = ({ authUser }) => {
	const { signupUser } = authUser;
	return { signupUser };
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (formData) => {
			dispatch(signUp(formData))
		}
	}
}

const initialFormState = {
	username: '',
	email: '',
	phone: ''
};

class SignUp extends Component {

	constructor(props) {
		super(props);
		this.formikActions = {};
		this.signInModelShow = this.signInModelShow.bind(this);
	}


	componentWillReceiveProps(newprops) {
		if (this.props.show === true && this.props.signupUser !== newprops.signupUser) {
			if (newprops.signupUser.status) {
				this.formikActions.resetForm();
				this.props.onHide();
				this.props.history.push('/home');
			} else {
				if (newprops.signupUser.errors) {
					this.formikActions.setErrors(newprops.signupUser.errors);
				}
				this.formikActions.setSubmitting(false);
			}
		}
	}

	signInModelShow() {
		//alert();
		this.props.onHide();
		this.props.signInModelShow();
	}

	render() {
		return (
			<Fragment>
				<Modal
					className="custom-modal auth-modal"
					show={this.props.show}
					onHide={this.props.onHide}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="px-0 py-0">
						<Row noGutters>
							<Col xs={12} sm={12} md={6} className="auth-left-block">
								<div className="text-center">
									<div className="logoImg">
										<Image src={`${assetURL}images/auth/logo.png`} alt="Invoice Application" fluid />
									</div>
									<Modal.Title>Sign Up</Modal.Title>
								</div>
								<Formik
									initialValues={initialFormState}
									onSubmit={(values, actions) => {
										this.formikActions = actions;
										this.props.signUp(values)
										actions.setSubmitting(true);
									}}
									validationSchema={signupValidationSchema}
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
												<div className='auth-form-inner'>
													<p className="sub_title">Basic Info</p>  
													<Form.Group controlId="uname" className='icon-group'>
														<TextField
														type="text"
														name="username"
														helperText={touched.username ? errors.username : ""}
														error={Boolean(errors.username)}
														label="User Name"
														className="label-required"
														fullWidth
														value={values.username}
														onChange={handleChange}
														/>
														<div className='invalid-feedback'>{(errors.username)}</div>
														<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={16} icon="user" /></div>
													</Form.Group>
													<Form.Group controlId="uemail" className="icon-group">
														<TextField
														type="text"
														name="email"
														helperText={touched.email ? errors.email : ""}
														error={Boolean(errors.email)}
														label="Email ID"
														className="label-required"
														fullWidth
														inputProps={{ maxLength: 64 }}
														value={values.email}
														onChange={e => whiteSpaceTrim(e, setFieldValue)}
														/>
														<div className="invalid-feedback">{(errors.email)}</div>
														<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="email" /></div>
													</Form.Group>
													<Form.Group controlId="uphone" className="icon-group">
														<TextField
														type="text"
														name="phone"
														helperText={touched.phone ? errors.phone : ""}
														error={Boolean(errors.phone)}
														label="Phone Number"
														className="label-required"
														fullWidth
														inputProps={{ maxLength: 13 }}
														value={values.phone}
														onChange={e => numberOnly(e, setFieldValue)}
														/>
														<div className="invalid-feedback">{(errors.phone)}</div>
														<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={20} icon="mobile" /></div>
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

const SignUpConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp)

export default SignUpConnected;
