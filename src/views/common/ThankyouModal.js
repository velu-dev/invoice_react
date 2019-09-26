import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import {assetURL} from '_constants/BaseConfig';
import Button from 'react-bootstrap/Button';

class ThankyouModal extends Component {
	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="md"
				backdrop="static"
				aria-labelledby="contained-modal-title-vcenter"
				className="thankyou-modal"
				centered
			>
				<Modal.Body>
					<Image src={`${assetURL}images/home/thank_you.png`} alt="Thank you" fluid />
					<h2>Thank you!</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>	
					<Button className="btn-custom btn-light-green" variant="success"  onClick={this.props.onHide}>Ok</Button>
				</Modal.Body>
			</Modal>
		);
	}
}

export default ThankyouModal;