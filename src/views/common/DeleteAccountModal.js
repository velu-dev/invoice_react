import React, { PureComponent } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { authService, deleteAccountValidationSchema, ButtonLoader } from 'components';
import { deleteAccount } from 'redux/actions';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TextField from "@material-ui/core/TextField";
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';

const initialFormState = {
	password: ''
};

const mapStateToProps = ({ account }) => {
	const { loading, delete_account } = account;
	return { loading, delete_account };
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAccount: (formData) => {
			dispatch(deleteAccount(formData))
		}
	}
}

class DeleteAccountModal extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			formState: {...initialFormState}
		};
		this.formikActions = {};
	}

	componentWillReceiveProps({ delete_account, loading }) {
		if (!loading && this.props.delete_account !== delete_account) {
			if (delete_account.status) {
				this.formikActions.resetForm();
				authService.signout(() => {				 
					this.props.onHide();
					this.props.history.push('/home');
				});				
			} else {
				if (!_.isEmpty(delete_account.errors)) {
					this.formikActions.setSubmitting(false);
					this.formikActions.setErrors(delete_account.errors);
				}
			}
		}
	}

	cancelForm = (reset) =>{
		reset(initialFormState);
		this.props.onHide();
	}

	render() {
		const { formState } = this.state
		return (
			<Formik
				initialValues={formState}
				onSubmit={(values, actions) => {
					this.formikActions = actions;
					this.props.deleteAccount(values);
					actions.setSubmitting(true);
				}}
				validationSchema={deleteAccountValidationSchema}
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
								<Modal.Header>Delete My Account</Modal.Header>
								<Modal.Body>
									<div className="Custom-form-inner">									
										<Form.Group className="icon-group">
											<TextField
												type="password"
												name="password"
												helperText={touched.password ? errors.password : ""}
												error={Boolean(errors.password)}
												label="Enter Your Password"
												className="label-required"
												fullWidth
												onChange={handleChange}
												value={values.password}											 										 
											/>
											<div className="invalid-feedback">{Boolean(errors.password) ? "true" : "f"}</div>
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

const DeleteAccountModalConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteAccountModal)

export default DeleteAccountModalConnected;

