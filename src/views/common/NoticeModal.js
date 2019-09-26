import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {assetURL} from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';

class NoticeModal extends Component {
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
				<Modal.Header>Notice <Image src={`${assetURL}images/user/notice.png`} alt="notice" fluid /></Modal.Header>
				<Modal.Body>
					<p>This Plan is no longer available.<br/>Please buy an other plan</p>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn-custom btn-light-green" variant="success" onClick={this.props.buyPlan}>Buy Plan</Button>
					<Button className="btn-custom btn-light" variant="light" onClick={this.props.onHide}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default NoticeModal;