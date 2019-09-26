import React, { Component, Fragment } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { assetURL } from '_constants';
import Image from 'react-bootstrap/Image';
import { authService, ButtonLoader } from "components";
import { toast } from 'react-toastify';
import { resetPassword, linkExpired } from 'redux/actions';
import { resetPasswordValidationSchema } from 'components/FormValidation';
import TextField from "@material-ui/core/TextField";
import iconSet from '../../../assets/selection.json';
import IcomoonReact from 'icomoon-react';

const mapStateToProps = ({ authUser }) => {
	console.log(authUser);
	const { reset_password, link_expired } = authUser;
	return { reset_password, link_expired };
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetPassword: (formData) => {
			dispatch(resetPassword(formData))
		},
		linkExpired: (token) => {
			dispatch(linkExpired(token))
		}
	}
}

const initialFormState = {
	token:'',
	password: '',
	confirm_password: ''
};

class resetPasswordAdmin extends Component {

	constructor(props) {
		super(props);
		this.formikActions = {};
	}

	componentDidMount() {
		if (authService.isAdminAuthenticated) {
			this.props.history.push('/admin/dashboard');
		}else{
			this.props.linkExpired(this.props.match.params.token);
			initialFormState.token = this.props.match.params.token;
		}	 
		
	}

	componentWillReceiveProps({ reset_password, link_expired }) {		 
		if (this.props.reset_password !== reset_password) {
			if (reset_password.status) {
				this.formikActions.resetForm();
				authService.adminAuthenticate(() => {
					this.props.history.push('/admin/login');
					toast.success(reset_password.message);
				});
			} else {
				if (reset_password.errors) {
					this.formikActions.setSubmitting(false);
					this.formikActions.setErrors(reset_password.errors);
				}
			}
		}

		if (!_.isEmpty(link_expired) && this.props.link_expired !== link_expired) {
			if (!link_expired.status) {
				this.props.history.push(`/admin/link_expired/${initialFormState.token}`);					
			}
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
													<h4 className="admin-sec-title">Reset Password</h4>
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
														<div className="admin-form-inner">
															<input
																type="hidden"
																name="token"
																value={values.token}
															/>
															<Form.Group controlId="admin-new-password" className="icon-group">
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
																<div className="invalid-feedback">{(errors.password && touched.password)}</div>	
																<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
															</Form.Group>
															<Form.Group controlId="validationFormik02" className="icon-group">
																<TextField
																	type="password"
																	name="confirm_password"
																	helperText={touched.confirm_password ? errors.confirm_password : ""}
																	error={Boolean(errors.password)}
																	label="Confirm Password"
																	className="label-required"
																	fullWidth
																	value={values.confirm_password}
																	onChange={handleChange}
																/>
																<div className="invalid-feedback">{(errors.confirm_password && touched.confirm_password)}</div>
																<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
															</Form.Group>
														
														<Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Submit {(isSubmitting) ? <ButtonLoader /> : null}</Button>
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

const resetPasswordAdminConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(resetPasswordAdmin)

export default resetPasswordAdminConnected;




