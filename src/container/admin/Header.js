import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { NavLink, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import { assetURL } from '_constants/BaseConfig';
import { getAdminUser } from 'redux/actions';
import { authService } from "components";
import LogoutModal from 'views/common/LogoutModal';
import iconSet from '../../assets/selection.json';
import IcomoonReact from 'icomoon-react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './Header.css'

const mapStateToProps = ({ authUser }) => {

	const { authenticate, auth_user, loading } = authUser;
	return { authenticate, auth_user, loading };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAdminUser: () => {
			dispatch(getAdminUser())
		}
	}
}


class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			accountShow: false,
			LogoutModalShow: false,
		};

	}

	componentDidMount() {
		if (authService.isAdminAuthenticated) {
			this.props.getAdminUser();
		}
	}


	componentWillReceiveProps(newprops) {
		if (!newprops.loading && this.props.auth_user !== newprops.auth_user) {
			if (newprops.auth_user.status === false) {
				authService.adminSignout();
				toast.error(newprops.auth_user.message);
			} else {
				this.setState({ user: newprops.auth_user.data })
			}
		}
	}

	adminSignout = () => {
		authService.adminSignout(() => {
			this.props.history.push('/admin');
			toast.success('Logout successfully');

		});
	}

	adminsetting = () => {
		console.log('fff');
		this.setState({ accountShow: !this.state.accountShow })
		console.log(this.state);
	}


	render() {
		const { match } = this.props;
		const { user } = this.state;
		return (
			<Fragment>
				<Navbar bg="light" expand="lg" fixed="top" className='header-nav'>
					<Navbar.Brand><NavLink to="/admin/dashboard"><Image src={`${assetURL}images/admin/m-logo.png`} alt="Logo" fluid /></NavLink></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto admin-nav" >
							<h6>Welcome {user.name} </h6>

							{/* <IcomoonReact iconSet={iconSet} color="#0086c5" size={21} icon="settings" /> */}
							{/* <NavDropdown alignRight className="setting_icon" title="">
								<NavLink className="nav-link"  to={`${match.url}/settings`}>Account Settings <IcomoonReact iconSet={iconSet} color="#131313" size={18} icon="profile" /></NavLink>
							  </NavDropdown> */}
							{/* <span className="nav-link" title="Account Settings" className="admin-setting" onClick={this.adminsetting}><IcomoonReact iconSet={iconSet} color="#0086c5" size={21} icon="settings" /></span>
							  {(this.state.accountShow)? 
								<div className="account-setting-sec" >
								  <NavLink className="nav-link"  to={`${match.url}/settings`}><span>Account Settings</span> <IcomoonReact iconSet={iconSet} color="#131313" size={18} icon="profile" /></NavLink>
							  </div>:null
							  } */}
							<Dropdown as={ButtonGroup}>
								{/* <Button variant="success">Split Button</Button> */}

								<Dropdown.Toggle split id="dropdown-split-basic" title="Account Settings" />

								<Dropdown.Menu>
									<Link to={`${match.url}/settings`}>Account Settings <IcomoonReact iconSet={iconSet} color="#131313" size={18} icon="profile" /></Link>
								</Dropdown.Menu>
							</Dropdown>
							<span className="nav-link" title="Logout" onClick={()=> {this.setState({LogoutModalShow:true})}}><IcomoonReact iconSet={iconSet} color="#0086c5" size={21} icon="logout" /></span>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<LogoutModal
					show={this.state.LogoutModalShow}
					onHide={() => this.setState({ LogoutModalShow: false })}
					signOut={() => { this.adminSignout() }}
					title="Logout"
					{...this.props}
				/>
			</Fragment>
		)
	}
}

const HeaderConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)

export default HeaderConnected;