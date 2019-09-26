import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LogoutModal extends Component {
	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				className="Custom-modal"
				centered
			>
				<Modal.Header>Log out</Modal.Header>
				<Modal.Body>
					<p>Are you sure <br />
						you want to logout your account?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn-custom btn-light-green" variant="success" onClick={this.props.signOut}>Yes</Button>
					<Button className="btn-custom btn-light" variant="light" onClick={this.props.onHide}>No</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default LogoutModal;