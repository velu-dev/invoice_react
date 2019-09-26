import React, { Component } from "react"; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {assetURL, stripe_client_id} from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';

class StripeconnectModal extends Component {
	constructor(props){
	 super()
		console.log(props)
	}

	componentWillReceiveProps(){
	}
	
	 
	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				className="Custom-modal stripe-connect"
				centered
			>
				<Modal.Header>Stripe Connect</Modal.Header>
				<Modal.Body className="stripe-body">
					<p>Please Connect To Your</p>
					<Image src={`${assetURL}images/user/stripe.png`} alt="stripe" fluid />
					<p>To Access All the Features</p>
				</Modal.Body>
				<Modal.Footer className="text-center">
					{/* <Button className="btn-custom btn-light-green" variant="success" onClick={()=>{ this.connectToStripe()}}>Connect</Button> */}
					<a
					 href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${stripe_client_id}&scope=read_write`}
					 className="btn-custom btn-light-green"
					 target="_blank"
					>Connect</a>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default StripeconnectModal;