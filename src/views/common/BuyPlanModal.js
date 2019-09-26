import React, { Component, Fragment } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { assetURL } from '_constants/BaseConfig';
import { getUserSubscriptionList } from 'redux/actions';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';

const mapStateToProps = ({ subscription }) => {
	const { loading, subscription_list } = subscription;
	return { loading, subscription_list };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserSubscriptionList: () => {
			dispatch(getUserSubscriptionList())
		}
	}
}

class BuyPlanModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subscription_list: []
		};
	}



	componentDidMount() {
		this.props.getUserSubscriptionList()
	}

	componentWillReceiveProps({ loading, subscription_list }) {
		if (!loading) {
			if (subscription_list.status) {
				this.setState({ subscription_list: subscription_list.data });
			}
		}
	}
	render() {
		const { subscription_list } = this.state;

		return (

			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				className="buy-plan-modal"
				backdrop="static"
				centered
			>
				<Modal.Header closeButton>Subscribe Your Plan </Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col xl={1}></Col>
							<Col xl={10}>
								<Slider
									dots={false}
									infinite={false}
									slidesToShow={3}
									slidesToScroll={1}
									accessibility={true}
								>
									{
										subscription_list.map((list, i) => {
											return (
												(!list.is_trail) ?
													<div className="px-2 subscribe-plan" key={i}>
														<div className="plan-title">
															<Image src={`${assetURL}images/home/premium.png`} alt="Banner" fluid />
															<h3>{list.plan_name}</h3>
															<p className="price-detail">{(list.price === 0 ? 'Free' : <Fragment><sup>$</sup>{list.price}</Fragment>)}</p>
														</div>
														<ul>
															{
																(!_.isEmpty(list.benefits)) ?
																	list.benefits.map((benefit, i) => <li key={i}><IcomoonReact iconSet={iconSet} color="#0086c5" size={12} icon="check" />{benefit}</li>)
																	: null
															}
														</ul>
														<Link to={`buyplan/${list.id}`} className="hvr-sweep-to-bottom blue-link">Buy now</Link>

													</div> 
													: null

											);
										})
									}
								</Slider>
							</Col>
							<Col xl={1}></Col>
						</Row>
					</Container>
				</Modal.Body>
				{/* <Modal.Footer>
					<Button className="btn-custom btn-light" variant="light" onClick={this.props.onHide}>Cancel</Button>
				</Modal.Footer> */}
			</Modal>
		);
	}
}
const BuyPlanModalConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(BuyPlanModal)

export default BuyPlanModalConnected;

