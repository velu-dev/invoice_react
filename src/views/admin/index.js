import React, {Component, Fragment} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdminHeader from "container/admin/Header";
import AdminFooter from "container/admin/Footer";
import Sidebar from "container/admin/Sidebar";

import {authService} from "components/Auth";
import './admin.css';

import login from './Auth/login';
import LinkExpiry from 'views/common/LinkExpiry'; 
import forgotPassword from './Auth/forgotPassword'; 
import resetPassword from './Auth/resetPassword'; 
import settings from './Auth/settings'; 
import Dashboard from './Dashboard'; 
import Users from './Users'; 
import Subscriptions from './Subscriptions'; 
import Transactions from './Transactions'; 
import about from './about'; 

 
const ProtectedRoute = ({ component: Component, ...rest }) => (
		 
   <Route {...rest} render={(props) => (
	authService.routerAdminAuthenticate() === true && authService.isAdminAuthenticated === true ?  
         <Component {...props} /> : <Redirect to={{ pathname: '/admin/login', state: { from: props.location }}} />   
   )} />
);


class AdminRoutes extends Component {

	constructor(props){
		super(props);		
		authService.adminAuthenticate();
	}	
	render(){		
		const { match, location } = this.props;		 
		var pathName = location.pathname.split('/')[1];  	 
		return(
		<Fragment>
		{pathName === "admin" && authService.isAdminAuthenticated === true ? <AdminHeader {...this.props}/> : null}
		{pathName === "admin" && authService.isAdminAuthenticated === true ? <Sidebar/> : null}	 
		 <Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
			<Route  path={`${match.url}/login`} component={login} />
			<Route  path={`${match.url}/forgot_password`} component={forgotPassword} />	
			<Route path={`${match.url}/link_expired/:token`} component={LinkExpiry} />
			<Route  path={`${match.url}/reset_password/:token`} component={resetPassword} />
			<ProtectedRoute  path={`${match.url}/settings`} component={settings} />		
			<ProtectedRoute  path={`${match.url}/dashboard`} component={Dashboard} />
			<ProtectedRoute  path={`${match.url}/users`} component={Users}/>		
			<ProtectedRoute  path={`${match.url}/about`} component={about} />
			<ProtectedRoute  path={`${match.url}/subscriptions`} component={Subscriptions} />
			<ProtectedRoute  path={`${match.url}/transactions`} component={Transactions} />
			<Redirect to="/admin/error" />
		</Switch>
		{pathName === "admin" && authService.isAdminAuthenticated === true ? <AdminFooter/> : null}
		</Fragment>
		)
	}
}

export default AdminRoutes;