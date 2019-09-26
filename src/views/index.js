import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminRoute from "./admin";

import Header from "container/Header";
import Footer from "container/Footer";
import LinkExpiry from 'views/common/LinkExpiry'; 

import { authService } from "components/Auth";
import home from './home';
import feature from './feature';
import subscription from './subscription';
import terms from './terms';
import privacy from './privacy';
import settings from './settings';
import buyplan from './buyPlan';
import trialpack from './trialpack';
import myBilling from './myBilling';


 
const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		authService.routerAuthenticate() === true && authService.isAuthenticated === true ?
			<Component {...props} /> : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
	)} />
);
 
class MainRoute extends Component {

	constructor(props) {
		super(props);
		authService.authenticate();
	}

	render() {
		const { match, location } = this.props;
		let pathName = location.pathname.split('/')[1];
		return (
			<Fragment>
				{authService.containerAccess(pathName)  ? <Header {...this.props} /> : null}
				<Switch>
					<Redirect exact from={`${match.url}`} to={`${match.url}home`} />
					<Route path={`${match.url}home`} component={home} />
					<Route path={`${match.url}set_password/:token`} component={LinkExpiry} />
					<Route path={`${match.url}reset_password/:token`} component={LinkExpiry} />
					<Route path={`${match.url}feature`} component={feature} />
					<Route path={`${match.url}subscription`} component={subscription} />
					<ProtectedRoute path={`${match.url}mybilling`} component={myBilling} />
					<Route path={`${match.url}terms`} component={terms} />
					<Route path={`${match.url}support`} component={terms} />
					<Route path={`${match.url}invoice`} component={home} />
					<Route path={`${match.url}payments`} component={home} />
					<Route path={`${match.url}privacy`} component={privacy} />
					<ProtectedRoute path={`${match.url}settings`} component={settings} />
					<Route path={`${match.url}buyplan/:id`} component={buyplan} />
					<Route path={`${match.url}trialpack`} component={trialpack} />
					<Route path={`${match.url}admin`} component={AdminRoute} />
					<Route path={`${match.url}reset_email/:token`} component={LinkExpiry} />
				 
					{/*<ProtectedRoute path={`${match.url}admin`} component={AdminRoute} />*/}
					<Redirect to="/error" />
				</Switch>
				{authService.containerAccess(pathName) ? <Footer /> : null}
			</Fragment>
		)
	}
}

export default MainRoute;