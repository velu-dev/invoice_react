import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { assetURL } from '_constants/BaseConfig';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthInfo, loginUser, getCurrentUser, connectStripe, stripeAccount } from 'redux/actions'
import { authService, ButtonLoader, getUrlVars, whiteSpaceTrim } from "components";
import { toast } from 'react-toastify';
import { loginValidationSchema } from 'components/FormValidation';
import SignUp from 'views/signUp';
import ResetPassword from 'views/resetPassword';
import ForgotPassword from 'views/forgotPassword';
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import TextField from "@material-ui/core/TextField";
import LogoutModal from 'views/common/LogoutModal';
import './Header.css'

const mapStateToProps = ({ authUser }) => {

	const { authenticate, auth_user, link_expired, loading, stripe } = authUser;
	return { authenticate, auth_user, link_expired, loading, stripe };
};

const mapDispatchToProps = (dispatch) => {
	return {
		AuthInfo: (info) => {
			dispatch(AuthInfo(info))
		},
		loginUser: (username, password) => {
			dispatch(loginUser(username, password))
		},
		getCurrentUser: () => {
			dispatch(getCurrentUser())
		},
		connectStripe: (code) => {
			dispatch(connectStripe(code))
		},
		stripeAccount: () => {
			dispatch(stripeAccount())
		}
	}
}
const initialFormState = {
	email: '',
	password: ''
};

class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loginForm: { ...initialFormState },
			signInModel: false,
			signUpModel: false,
			resetPasswordModel: false,
			forgotPasswordModel: false,
			LogoutModalShow: false,
			step: 1	 
		};
		this.formikActions = {};
	}

	componentDidMount() {
		if (authService.isAuthenticated) {
			this.props.getCurrentUser();
		}
		let urlParams = getUrlVars()
		if (urlParams.code) {
			this.props.connectStripe(urlParams.code)
		}	 
	} 

	signInModelShow = () => {
		this.setState({ signInModel: true });
	}

	forgotPasswordModelShow = () => {
		this.setState({ signInModel: false, forgotPasswordModel: true });
	}

	signUpModelShow = () => {
		this.setState({ signUpModel: true });
	}

	signOut = () => {
		authService.signout(() => {
			toast.success('Logout Successfully');
			this.setState({ user: [], LogoutModalShow: false });		 
		});
		this.props.AuthInfo({})
	}

	componentWillReceiveProps(newprops) {	 
		if (!newprops.loading) {
			/*Login Authendication*/
			if (this.props.authenticate !== newprops.authenticate) {
				if (newprops.authenticate.status) {
					this.formikActions.resetForm();
					sessionStorage.setItem('token', newprops.authenticate.token);
					authService.authenticate(() => {
						this.setState({ signInModel: false, signUpModelShow: false });
						this.props.getCurrentUser();									 
					});
				} else {
					if (!_.isEmpty(newprops.authenticate.errors)) {
						this.formikActions.setErrors(newprops.authenticate.errors);
					}
					this.formikActions.setSubmitting(false);
				}
			}
			/*Users List*/
			if (!_.isEmpty(newprops.auth_user) && this.props.auth_user !== newprops.auth_user) {
				if (newprops.auth_user.status) {
					// this.setState({ user: newprops.auth_user.data });				 
					// this.props.AuthInfo(newprops.auth_user.data)		
				} else {
					authService.signout(() => {
						toast.error(newprops.auth_user.message);
						this.setState({ user: []});
						this.props.history.push('/home');
					});

				}
			}

			if (this.props.stripe !== newprops.stripe && newprops.stripe.status) { 
				this.props.stripeAccount();
				this.props.history.push('/settings');
			}
			/*Reset password link check
			if (!_.isEmpty(newprops.link_expired) && this.props.link_expired !== newprops.link_expired) {
				if (newprops.link_expired.status) {
					this.setState({ resetPasswordModel: true });
				}
			}*/
		}

	} 
	render() {	
		let signInModelShow = () => this.signInModelShow();
		return (
			<header>
				<Container>
					<Row>
						<Navbar className="col" bg="white" expand="lg">
							<Navbar.Brand>
								<NavLink to="/" className="logo"><Image src={`${assetURL}images/logo.png`} alt="Invoice Application" fluid /></NavLink>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								{authService.isAuthenticated === true ? (
									<Fragment>
										<Nav className="ml-auto">
											<NavLink to="/invoice" className="nav-link">Invoice</NavLink>
											<NavLink to="/subscription" className="nav-link">Subscription</NavLink>
											<NavLink to="/payments" className="nav-link">Payments</NavLink>
											<NavLink to="/settings" className="nav-link">Settings</NavLink>
										</Nav>

										<NavDropdown className="logout_icon" title="">
											<Button onClick={() => this.setState({ LogoutModalShow: true })}>Log out <IcomoonReact iconSet={iconSet} color="#131313" size={18} icon="logout" /></Button>
										</NavDropdown>

									</Fragment>
								) : (
										<Fragment>
											<Nav className="ml-auto">
												<NavLink to="/" className="nav-link">Home</NavLink>
												<NavLink to="/feature" className="nav-link">Features</NavLink>
												<NavLink to="/subscription" className="nav-link">Subscription</NavLink>
											</Nav>
											<Button className="btn-custom btn-light-blue" variant="sign-in" onClick={this.signInModelShow} >Sign In</Button>
											<Button className="btn-custom btn-light-green" variant="success" onClick={this.signUpModelShow}>Sign Up</Button>
										</Fragment>
									)
								}
								<LogoutModal
									show={this.state.LogoutModalShow}
									onHide={() => this.setState({ LogoutModalShow: false })}
									signOut={() => { this.signOut() }}
									title="Logout"
									{...this.props}
								/>
							</Navbar.Collapse>
						</Navbar>
					</Row>
					{/*Sign In modal*/}
					<Modal className="custom-modal auth-modal" show={this.state.signInModel} onHide={() => { this.setState({ signInModel: false }); }} >
						<Modal.Header closeButton></Modal.Header>
						<Modal.Body className="px-0 py-0">
							<Row noGutters>
								<Col xs={12} sm={12} md={12} lg={6} className='auth-left-block'>
									{this.state.errorMsg ? <div className="error center">{this.state.errorMsg}</div> : null}
									<div className="text-center">
										<div className="logoImg">
											<Image src={`${assetURL}images/auth/logo.png`} alt="Invoice Application" fluid />
										</div>
										<Modal.Title>Sign In</Modal.Title>
									</div>
									<Formik
										initialValues={this.state.loginForm}
										onSubmit={(values, actions) => {
											this.formikActions = actions;
											this.props.loginUser(values.email, values.password)
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
													<div className='auth-form-inner'>
														<Form.Group className='icon-group'>
															<TextField
																type="text"
																name="email"
																helperText={touched.email ? errors.email : ""}
																error={Boolean(errors.email)}
																label="Email ID"
																className="label-required"
																fullWidth
																maxLength={64}
																value={values.email}
																onChange={e => whiteSpaceTrim(e, setFieldValue)}
															/>
															<div className="invalid-feedback">{(errors.email)}</div>
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
																onChange={handleChange}
															/>
															<div className="invalid-feedback">{(errors.password)}</div>
															<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
														</Form.Group>
														<Button type="submit" className="btn-custom btn-light-green" variant="success" disabled={isSubmitting}>Sign In {(isSubmitting) ? <ButtonLoader /> : null}</Button>
														<p className="forget-text">Forgot Your Password? <span to='/' onClick={this.forgotPasswordModelShow}>Click Here</span></p>
													</div>
												</Form>
											)}
									</Formik>
								</Col>
								<Col xs={12} sm={12} md={12} lg={6} className="auth-right-block text-center">
									<Image src={`${assetURL}images/auth/auth_bg.png`} alt="Invoice Application" fluid />
								</Col>
							</Row>
						</Modal.Body>
					</Modal>
					{/*Sign Up modal*/}
					<SignUp show={this.state.signUpModel}
						onHide={() => this.setState({ signUpModel: false})}
						signInModelShow={signInModelShow}
						{...this.props} />
					{/*Reset Password modal*/}
					<ResetPassword
						resetModelshow={this.state.resetPasswordModel}
						resetModalHide={() => this.setState({resetPasswordModel: false})}
						{...this.props} />
					{/*Forgot Password modal*/}
					<ForgotPassword
						forgotModelshow={this.state.forgotPasswordModel}
						forgotModalHide={() => this.setState({forgotPasswordModel:false })}
						signInModelShow={signInModelShow} {...this.props} />
				</Container>
			</header>
		)
	}
}

const HeaderConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)

export default HeaderConnected;
