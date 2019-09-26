import React, { Component } from "react";
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import {assetURL} from '_constants/BaseConfig';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class BillingModal extends Component {
	render() {
		const {rowInfo} = this.props;
		console.log(rowInfo);
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				className="Custom-modal transaction-modal"
				centered
			>
			<Modal.Header>
				<Row>
					<Col sm={3} className="transaction-left-sec"><Image src={`${assetURL}images/logo.png`} alt="Invoice Application" fluid /></Col>
					<Col sm={9} className="transaction-right-sec text-right">
						<h3>Transaction ID</h3>
						<span>{rowInfo.transaction_id}</span>
						<span>{moment(rowInfo.created_at).format('DD MMM YYYY')}</span>
					</Col>
				</Row>
			</Modal.Header>
			<Modal.Body>
				<div className="plan-header">
					<Row noGutters>
						<Col sm={8} className="text-left pl-2">
							<h4>Plan Name</h4>
						</Col>
						<Col sm={4} className="text-right pr-2">
							<h4>Amount</h4>
						</Col>
					</Row>
				</div>
				<div className="plan-body">
					<Row noGutters>
						<Col sm={8} className="text-left pl-2">
							<span>{rowInfo.plan_name}</span>
						</Col>
						<Col sm={4} className="text-right pr-2">
							<h6>${rowInfo.amount}</h6>
						</Col>
					</Row>
				</div>
				<div className="plan-footer">
					<Row noGutters>
						<Col sm={8} className="text-left pl-2">
							
						</Col>
						<Col sm={4} className="text-right pr-2">
							<span>Total</span>
							<h6>${rowInfo.amount}</h6>
						</Col>
					</Row>
				</div>
				<h3>Thank you!</h3>
				{/* <Button className="btn-custom btn-light-green" variant="success"  onClick={this.props.onHide}>Ok</Button> */}
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn-custom btn-light" variant="light" onClick={this.props.onHide}>Close</Button>
				<Button className="btn-custom btn-light-green" variant="success">Print</Button>
				<Button className="btn-light download-btn" variant="light">Download as PDF</Button>
			</Modal.Footer>
			</Modal>
		);
	}
}

export default BillingModal;