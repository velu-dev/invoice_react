import React, { Component, Fragment } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { assetURL, cardBrands } from '_constants';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage, Field } from 'formik';
import { deleteCard, defaultCard, getCards } from 'redux/actions';
import { ButtonLoader, CardInfoLoader } from 'components';
import NewCardModal from 'views/common/NewCardModal';
import DeleteModal from 'views/common/DeleteModal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import iconSet from 'assets/selection.json';
import IcomoonReact from 'icomoon-react';
import { Scrollbars } from 'react-custom-scrollbars';

const mapStateToProps = ({ account, authUser }) => {
	const { loading, delete_card, default_card, cards } = account;
	return { loading, delete_card, default_card, cards };
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteCard: (id) => {
			dispatch(deleteCard(id))
		},
		defaultCard: (id) => {
			dispatch(defaultCard(id))
		},
		getCards: () => {
			dispatch(getCards())
		}
	}
}
class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
			NewCardModalShow: false,
			contentLoading:true
		};
	}

	componentDidMount() {
		this.props.getCards();
	}

	componentWillReceiveProps({ loading, delete_card, default_card, cards }) {	 
		if (!loading) {
			/**Cards details */
			if (cards.status) {
				this.setState({
					cards: cards.data,
					contentLoading:false
				})
			}
			/**Delete card detail */
			if (this.props.delete_card !== delete_card && delete_card.status) {
				this.props.getCards();
				this.setState({ deleteCardModalShow: false });
				toast.success(delete_card.message);
			}
			/**Default card detail */
			if (this.props.default_card !== default_card && default_card.status) {
				toast.success(default_card.message);
			}
		}
	}
	delete = () => {
		this.props.deleteCard(this.state.deleteId)
	}
	render() {
		const { cards, contentLoading } = this.state;
		const { match } = this.props;
		return (
			<Fragment>
				<div className="card">
					<div className="card-header">
						<button type="button" className="btn-change-password btn btn-primary" onClick={() => this.setState({ NewCardModalShow: true })}>Add New Card</button>
						<h2>Card Information</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					</div>
					{ contentLoading ? <CardInfoLoader /> : 
						<div className="card-body card-info-body">
							<Scrollbars style={{ height: 395}}>
						<Form>
							{
								cards.map((card, i) => {
									return (
										
											<div className="add-card-form" key={i}>
											<Form.Row className="content-row align-items-center">
												<Form.Group as={Col} md="1" lg="1" className="check-sec">
													<input type="radio" id={`card_info_${i + 1}`} defaultChecked={card.default} name="card_default"
														onChange={(e) => {
															this.props.defaultCard(card.id)
														}} />
													<Form.Label className="d-none d-sm-block" htmlFor={`card_info_${i + 1}`}>&nbsp;</Form.Label>
													<span className="custom-checkbox"></span>
												</Form.Group>
												<Form.Group as={Col} md="7" lg="5" className="icon-group">
													<Form.Label>Card Number</Form.Label>
													<input
														type="text"
														name="card_number"
														value={`************${card.last4}`}
														className="form-control card_number_input"
														disabled={true}
													/>
													{
														(_.includes(cardBrands, card.brand)) ?
															<div className="icon-set"><Image src={`${assetURL}images/cardbrands/${card.brand}.png`} alt="mastercard" fluid /></div>
															: <div className="icon-set"><Image src={`${assetURL}images/cardbrands/blank-card.png`} alt="blank" fluid /></div>
													}
												</Form.Group>
												<Form.Group as={Col} md="4" lg="6" className="icon-group expiry-date">
													<Form.Label>Expiry date</Form.Label>
													<input
														type="text"
														name="expiry_date"
														placeholder="18/2025"
														value={`${card.expiry}`}
														className="form-control expiry_date_input"
														disabled={true}
													/>
													<div className="icon-set trash" onClick={() => this.setState({ deleteCardModalShow: true, deleteId: card.id })}><IcomoonReact iconSet={iconSet} color="#000" size={16} icon="trash" /></div>
												</Form.Group>
											</Form.Row>
										</div>
										
									)
								})
							}
							
						</Form>
						</Scrollbars>
						<NewCardModal
							show={this.state.NewCardModalShow}
							onHide={() => this.setState({ NewCardModalShow: false })}
							title="NewCard"
							default={(cards.length === 0) ? true : false}
						/>
						<DeleteModal
							show={this.state.deleteCardModalShow}
							delete={this.delete}
							onHide={() => this.setState({ deleteCardModalShow: false })}
							title="card"
							{...this.props}
						/>
					</div>
				  } 
				</div>
			</Fragment>
		);
	}
}


const CardsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Cards);

export default CardsConnected;