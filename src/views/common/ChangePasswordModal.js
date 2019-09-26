import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import { Formik } from 'formik';
import { adminResetPasswordValidationSchema, ButtonLoader } from 'components';
import { changePassword } from 'redux/actions';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextField from "@material-ui/core/TextField";
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';

const mapStateToProps = ({ adminUsers }) => {
	const { user, loading } = adminUsers;
	return { user, loading };
};

const mapDispatchToProps = (dispatch) => {
	return {
		changePassword: (formData) => {
			dispatch(changePassword(formData))
		}
	}
}


const initialFormState = {
	old_password: '',
	password: '',
	confirm_password: '',
};

class ChangePasswordModal extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			formState: initialFormState
		};
		this.formikActions = {};
	}
	
	cancelForm = (reset) =>{
		reset(initialFormState);
		this.props.onHide();
	}

	 
	componentWillReceiveProps({ user, loading }) {
		if (!loading && this.props.user !== user) {
			if (user.status) {
				this.formikActions.resetForm();
				this.props.onHide();
				toast.success(user.message);
			} else {
				if (!_.isEmpty(user.errors)) {
					this.formikActions.setSubmitting(false);
					this.formikActions.setErrors(user.errors);
				}
			}
		}
	}

	render() {
		const { formState } = this.state
		return (
			<Formik
				initialValues={formState}
				onSubmit={(values, actions) => {
					this.formikActions = actions;
					this.props.changePassword(values)
					actions.setSubmitting(false);
				}}
				validationSchema={adminResetPasswordValidationSchema}
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
							backdrop="static"
							size="md"
							aria-labelledby="contained-modal-title-vcenter"
							className="Custom-modal"
							centered
						>
							<Form onSubmit={handleSubmit}>
								<Modal.Header>Change Password</Modal.Header>
								<Modal.Body>
									<div className="Custom-form-inner">									
										<Form.Group className="icon-group">
											<TextField
												type="password"
												name="old_password"
												helperText={touched.old_password ? errors.old_password : ""}
												error={Boolean(errors.old_password)}
												label="Old Password"
												className="label-required"
												maxLength={16}
												fullWidth
												onChange={handleChange}
												value={values.old_password}											 
											/>
											<div className="invalid-feedback">{Boolean(errors.old_password) ? "true" : "f"}</div>
											<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
										</Form.Group>
										<Form.Group className="icon-group">
											<TextField
												type="password"
												name="password"
												helperText={touched.password ? errors.password : ""}
												error={Boolean(errors.password)}
												label="New Password"
												className="label-required"
												maxLength={16}
												fullWidth
												value={values.password}
												onChange={handleChange}
											/>
											<div className="invalid-feedback">{Boolean(errors.password) ? "true" : "f"}</div>
											<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
										</Form.Group>
										<Form.Group className="icon-group">
											<TextField
												type="password"
												name="confirm_password"
												helperText={touched.confirm_password ? errors.confirm_password : ""}
												error={Boolean(errors.confirm_password)}
												label="Confirm Password"
												className="label-required"
												maxLength={16}
												fullWidth
												value={values.confirm_password}
												onChange={handleChange}
											/>
											<div className="invalid-feedback">{Boolean(errors.confirm_password) ? "true" : "f"}</div>
											<div className="icon-set"><IcomoonReact iconSet={iconSet} color="#7f7f7f" size={18} icon="lock" /></div>
										</Form.Group>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<Button className="btn-custom btn-light-green" variant="success" type="submit" disabled={isSubmitting}>Submit {(isSubmitting) ? <ButtonLoader /> : null}</Button>
									<Button className="btn-custom btn-light" variant="light" onClick={() => this.cancelForm(resetForm)}>Cancel</Button>
								</Modal.Footer>
							</Form>
						</Modal>
					)}
			</Formik>
		);
	}
}
const ChangePasswordModalConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePasswordModal)

export default ChangePasswordModalConnected;

