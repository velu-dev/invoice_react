import React, { Component, Fragment } from "react";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { resetEmail, linkExpired } from 'redux/actions';
import ResetPassword from 'views/resetPassword';
import { authService } from "components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { assetURL } from '_constants/BaseConfig';
import Image from 'react-bootstrap/Image';

const mapStateToProps = ({ authUser }) => {
	const { auth_update, link_expired, loading } = authUser;
	return { auth_update,link_expired, loading };
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetEmail: (formData) => {
			dispatch(resetEmail(formData))
		},
		linkExpired: (token) => {
			dispatch(linkExpired(token))
		}
	}
}

class LinkExpiry extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
			message : '',
			logout:false,
			goTo: "Home",
			link: "/home",
			resetPasswordModel: false,
		}
		this.token = props.match.params.token;	 
	}

	componentDidMount() {		
		let pathName = this.props.location.pathname.split('/')[1];
		if (pathName === "set_password" || pathName === "reset_password") {
			this.props.linkExpired(this.token);
		}else if(pathName === "reset_email"){
			authService.adminSignout(()=>{		
				this.props.resetEmail(this.token);
			});	
		}else{			
			// this.setState({message: 'Invalid Link. Link was expired'})
			this.props.linkExpired(this.token);
		}

		if(pathName === "admin"){
			this.setState({goTo: 'Login', link: '/admin'})
		}

	}

	componentWillReceiveProps({ auth_update, loading, link_expired }) {
		if (!loading) {
			/*Reset Email */
			if (auth_update.status) {
				if(auth_update.role === "admin"){
					this.props.history.push('/admin/login');
				}else{
					this.props.history.push('/home');
				}				
				toast.success(auth_update.message);
			} else {
				this.setState({message: auth_update.message})
			}
			/*Link Expired*/
			if (!_.isEmpty(link_expired) && this.props.link_expired !== link_expired) {
				if (link_expired.status) {
					this.setState({ resetPasswordModel: true });
				}else if(authService.isAuthenticated){
					this.props.history.push('/home');			
				} else {				
					this.setState({message: link_expired.message})
				}
			}
		}
	}

	render() {
		let modalClose = () => this.setState({ resetPasswordModel: false});
		return (
			<Fragment>
				<section className="admin-sec">
					<Container>
						<Row noGutters>
							<Col xs={12}>
								<div className="admin-wrap">
									<div className="admin-wrap-content">
										<Row noGutters>
											<Col className="admin-left-sec">
												<div className="text-center">
													<div className="logoImg">
														<Image src={`${assetURL}images/auth/logo.png`} alt="Invoice Application" fluid />
													</div>
													<h3 className="admin-sec-title">{this.state.message}</h3>
													Go to <Link to={this.state.link}>{this.state.goTo}</Link>
												</div>
											</Col>										 
										</Row>
									</div>								 
								</div>
							</Col>
						</Row>
					</Container>
				</section>
				<ResetPassword resetModelshow={this.state.resetPasswordModel} resetModalHide={modalClose} {...this.props} />					 
			</Fragment>
		);
	}
}

const LinkExpiryConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(LinkExpiry)

export default LinkExpiryConnected;




