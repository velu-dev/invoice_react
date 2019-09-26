import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import iconSet from '../../assets/selection.json';
import IcomoonReact from 'icomoon-react';
import './Sidebar.css'

class Sidebar extends Component { 
	render() {
		const path = "/admin";
		return (
			<Fragment>
				<div className="sideBar">
					<Nav className="sidebar-nav flex-column" >
						<NavLink to={`${path}/dashboard`}><IcomoonReact iconSet={iconSet} color="#8f8f94" size={28} icon="dashboard" /> <span>Dashboard</span></NavLink>
						<NavLink to={`${path}/users`}><IcomoonReact iconSet={iconSet} color="#8f8f94" size={28} icon="user" /> <span>User Management</span></NavLink>
						<NavLink to={`${path}/subscriptions`}><IcomoonReact iconSet={iconSet} color="#8f8f94" size={28} icon="subscription" /> <span>Subscription Mgnt</span></NavLink>
						<NavLink to={`${path}/transactions`}><IcomoonReact iconSet={iconSet} color="#8f8f94" size={28} icon="transaction" /> <span>Transactions</span></NavLink>
					</Nav>
				</div>
			</Fragment>
		)
	}
}
 
export default Sidebar;