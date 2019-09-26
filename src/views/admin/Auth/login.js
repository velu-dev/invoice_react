import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import _ from 'lodash';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { assetURL } from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';
import { authService, ButtonLoader } from "components";
import { toast } from 'react-toastify';
import { loginAdmin } from 'redux/actions';
import { loginValidationSchema, whiteSpaceTrim } from 'components/FormValidation';
import iconSet from '../../../assets/selection.json';
import IcomoonReact from 'icomoon-react';

import TextField from "@material-ui/core/TextField";

const mapStateToProps = ({ authUser }) => {
	const { authenticate, auth_user } = authUser;
	return { authenticate, auth_user };
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginAdmin: (username, password) => {
			dispatch(loginAdmin(username, password))
		}
	}
}

const initialFormState = {
	email: '',
	password: ''
};

class Login extends Component {

	constructor(props) {
		super(props);
		this.formikActions = {};
	}

	componentDidMount() {
		if (authService.isAdminAuthenticated) {
			this.props.history.push('/admin/dashboard');
		}
	}

	componentWillReceiveProps(newprops) {
		if (!_.isEmpty(newprops.authenticate) && this.props.authenticate !== newprops.authenticate) {
			if (newprops.authenticate.status) {
				this.formikActions.resetForm();
				sessionStorage.setItem('adminToken', newprops.authenticate.token);
				authService.adminAuthenticate(() => {
					toast.success(newprops.authenticate.message);
					this.props.history.push('/admin/dashboard');
									 
				});
			} else {
				if (!_.isEmpty(newprops.authenticate.errors)) {			 
					this.formikActions.setSubmitting(false);
					this.formikActions.setErrors(newprops.authenticate.errors);
				}else{
					this.formikActions.setSubmitting(false);
					toast.error(newprops.authenticate.message);				 
				}				
			}
		}
		if (newprops.auth_user) {
			this.setState({ user: newprops.auth_user });
		}
	}
	render() {
		return (
			<Fragment>
				<section className="admin-sec">
					<Container>
						<Row noGutters>
							<Col xs={12}>
								<div className="admin-wrap">
									<div className="admin-wrap-content">
										<Row noGutters>
											<Col xs={12} sm={12} md={12} lg={6} className="admin-left-sec">
												<div className="text-center">
													<div className="logoImg">
														<Image src={`${assetURL}images/auth/logo.png`} alt="Invoice Application" fluid />
													</div>
													<h4 className="admin-sec-title">Sign In</h4>
												</div>
												<Formik
													initialValues={initialFormState}
													onSubmit={(values, actions) => {
														this.formikActions = actions;
														this.props.loginAdmin(values.email, values.password)
														actions.setSubmitting(true);
													}}
													validationSchema={loginValidationSchema}
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
															<div className="admin-form-inner">
																<Form.Group className="icon-group">
																	<TextField
																	type="text"
																	name="email"
																	helperText={touched.email ? errors.email : ""}
																	error={Boolean(errors.email)}
																	label="Email ID"
																	className="label-required"
																	fullWidth
																	value={values.email}
																	onChange={e => whiteSpaceTrim(e, setFieldValue)}
																	/>
																	<div className="invalid-feedback">{Boolean(errors.email) ? "true" : "f"}</div>
																	<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="email" /></div>
																</Form.Group>
																<Form.Group className="icon-group">
																	<TextField
																		type="password"
																		name="password"
																		helperText={touched.password ? errors.password : ""}
																		error={Boolean(errors.password)}
																		label="Password"
																		className="label-required"
																		fullWidth
																		value={values.password}	
																		onChange={e => whiteSpaceTrim(e, setFieldValue)}													 
																	/>
																	<div className="invalid-feedback">{Boolean(errors.password) ? "true" : "f"}</div>
																	<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
																</Form.Group>

															<Button className="btn-custom btn-light-green" variant="success" type="submit" disabled={isSubmitting}>Sign In {(isSubmitting) ? <ButtonLoader /> : null}</Button>
															<p className="forget-text">Forgot Your Password? <Link to='/admin/forgot_password'>Click Here</Link></p>
															</div>
														</Form>
														)}
												</Formik>
											</Col>
											<Col xs={12} sm={12} md={12} lg={6} className="admin-right-sec text-right">
												<Image src={`${assetURL}images/admin/aimg_02.png`} alt="Invoice Application" fluid />
											</Col>
										</Row>
									</div>
									<div className="copyrights">
										<Row noGutters>
											<Col xs={12} className="text-center">
												<p>&copy; Invoice Application 2019</p>
											</Col>
										</Row>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</Fragment>
		);
	}
}

const LoginConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

export default LoginConnected

