import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class DeleteModal extends Component {
	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				className="delete-modal"
				centered
			>
				<Modal.Body>
					<p>Are you sure <br />
						you want to delete this {this.props.title}?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn-custom btn-light-green" variant="success" onClick={this.props.delete}>Yes</Button>
					<Button className="btn-custom btn-light" variant="light" onClick={this.props.onHide}>No</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DeleteModal;