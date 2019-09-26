import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { assetURL } from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom'; 
import { authService, ButtonLoader } from "components";
import { toast } from 'react-toastify';
import { forgotPassword } from 'redux/actions';
import { forgotValidationSchema, whiteSpaceTrim } from 'components/FormValidation';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import TextField from "@material-ui/core/TextField";

const mapStateToProps = ({ authUser }) => {
	const { forgot_password } = authUser;
	return { forgot_password };
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
class forgot extends Component {

	componentDidMount() {
		if (authService.isAdminAuthenticated) {
			this.props.history.push('/admin/dashboard');
		}
	}

	componentWillReceiveProps(newprops) {
		if (this.props.forgot_password !== newprops.forgot_password) {
			if (newprops.forgot_password.status) {
				this.formikActions.resetForm();
				authService.adminAuthenticate(() => {
					this.props.history.push('/admin/login');
					toast.success(newprops.forgot_password.message);
				});
			} else {
				if (newprops.forgot_password.errors) {
					this.formikActions.setSubmitting(false);
					this.formikActions.setErrors(newprops.forgot_password.errors);
				}
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
													<h4 className="admin-sec-title">Forgot Password</h4>
												</div>
												<Formik
													initialValues={initialFormState}
													onSubmit={(values, actions) => {
														this.formikActions = actions;
														this.props.forgotPassword(values.email, 'admin')
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
															<div className="admin-form-inner">
																<Form.Group controlId="validationFormik02" className="icon-group">
																	<TextField
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
																
															<Button className="btn-custom btn-light-green" variant="success" type="submit" disabled={isSubmitting}>Submit {(isSubmitting) ? <ButtonLoader /> : null}</Button>
															<p className="forget-text">Back to <Link to='/admin/login'>Sign In</Link></p>
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

const forgotConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(forgot)

export default forgotConnected;





