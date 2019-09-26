import React, { Component, Fragment } from "react";
import { accountSettingValidationSchema, ButtonLoader } from 'components';
import { assetURL } from '_constants/BaseConfig';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import ChangePasswordModal from 'views/common/ChangePasswordModal';
import NewCardModal from 'views/common/NewCardModal';
import BuyPlanModal from 'views/common/BuyPlanModal';
import StripeConnectModal from 'views/common/StripeConnectModal';
import DeleteAccountModal from 'views/common/DeleteAccountModal';
import { Formik, ErrorMessage, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import './trialpack.css'

const initialFormState = {
	email: '',
	phone: '',
	redirect_url: ''
};

export default class extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			days_split: props.days.split(""),
			days: props.days			 
		};
		
		 

	}

	render() {
		return (
			<Fragment>
				<div className="trial-plan">
					<div className="plan-title">
						<p><strong>You can try this plan for {(this.state.days !== "00")?this.state.days:'0'} days</strong></p>
						<p>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit<br />ipsum dolor sit amet, <br />consectetur adipiscing elit</p>
					</div>
					<Image src={`${assetURL}images/user/trial_image.png`} alt="Trial Image" fluid />

					<div className="count_down">
						<div className="days_count">
							{this.state.days_split.map((day, i)=>{
								return <span key={i}>{day}</span>
							})}
						</div>
						<p>Days Remaining</p>
					</div>

					<button type="button" className="hvr-sweep-to-bottom green-link btn-buy-plan btn" onClick={() =>{ this.props.buyPlan()}}>Buy Plan</button> 
				</div>
			</Fragment>
		);
	}
}