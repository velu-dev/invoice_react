import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import {ButtonLoader } from "components";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assetURL } from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';
import { resetPassword } from 'redux/actions';
import { resetPasswordValidationSchema } from 'components/FormValidation';
import TextField from "@material-ui/core/TextField";
import ThankyouModal from 'views/common/ThankyouModal';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';

const mapStateToProps = ({ authUser }) => {
	const { reset_password } = authUser;
	return { reset_password };
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetPassword: (formData) => {
			dispatch(resetPassword(formData))
		}
	}
}

const initialFormState = {
	password: '',
	confirm_password: '',
	token: ''
};

class ResetPassword extends Component {

	constructor(props) {
		super(props);
		this.formikActions = {};	
		
	    this.state = {
			modalShow: false,
			modalTitle: "Set Password"
		};
	}

	componentDidMount() { 
		let pathName = this.props.location.pathname.split('/');
		if (pathName[1] !== "set_password") {
			this.setState({
				modalTitle: "Reset Password"
			})
		}
		initialFormState.token = pathName[2];
	}

	componentWillReceiveProps(newprops) {
		if (this.props.reset_password !== newprops.reset_password && this.props.resetModelshow === true) {
			if (newprops.reset_password.status) {
				this.formikActions.resetForm();
				this.props.resetModalHide();
				toast.success(newprops.reset_password.message);
				this.setState({ modalShow: true });
				//this.props.history.push('/home');
			} else {
				if (newprops.reset_password.errors) {
					this.formikActions.setErrors(newprops.reset_password.errors);
				}
			}
		}
	}

	render() {
		let modalClose = () => { 
			this.setState({ modalShow: false }, 
			()=>{
				this.props.history.push('/home');
			})};
		return (
			<Fragment>
				<Modal
					className="custom-modal auth-modal"
					show={this.props.resetModelshow}
					onHide={this.props.resetModalHide}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body className="px-0 py-0">
						<Row noGutters>
							<Col xs={12} sm={12} md={6} className='auth-left-block'>
								<div className="text-center">
									<div className="logoImg">
										<Image src={`${assetURL}images/auth/logo.png`} alt="Invoice Application" fluid />
									</div>
									<Modal.Title>{this.state.modalTitle}</Modal.Title>
								</div>
								<Formik
									initialValues={initialFormState}
									onSubmit={(values, actions) => {
										this.formikActions = actions;
										this.props.resetPassword(values)
										actions.setSubmitting(true);
									}}
									validationSchema={resetPasswordValidationSchema}
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
														<Field
															type="hidden"
															name="token"
															value={values.token}
														/>
														<TextField
															type="password"
															name="password"
															helperText={touched.password ? errors.password : ""}
															error={Boolean(errors.password)}
															label="Password"
															className="label-required"
															fullWidth
															value={values.password}
															onChange={handleChange}
														/>
														<div className="invalid-feedback">{Boolean(errors.password) ? "true" : "f"}</div>
														<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
													</Form.Group>
													<Form.Group controlId="confirm_password" className="icon-group">

														<TextField
															type="password"
															name="confirm_password"
															helperText={touched.confirm_password ? errors.confirm_password : ""}
															error={Boolean(errors.confirm_password)}
															label="Confirm Password"
															className="label-required"
															fullWidth
															value={values.confirm_password}
															onChange={handleChange}
														/>
														<div className="invalid-feedback">{Boolean(errors.confirm_password) ? "true" : "f"}</div>
														<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
													</Form.Group>
													<Button type="submit"className="btn-custom btn-light-green" variant="success"disabled={isSubmitting}>Submit {(isSubmitting) ? <ButtonLoader /> : null}</Button>

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
							
				<ThankyouModal
                show={this.state.modalShow}               
                onHide={modalClose}
                title="Thank you"
                {...this.props}
              />
			</Fragment>
		)
	}
}

const ResetPasswordConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetPassword)

export default ResetPasswordConnected;
