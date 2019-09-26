import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import UserList from 'views/admin/Users/list';
import UserForm from 'views/admin/Users/form';


export default class extends Component {
	render() {
		const { match } = this.props;		 
		return (
			<Fragment>
				<Switch>
					<Route exact path={`${match.url}/`} component={UserList} {...this.props} />
					<Route exact path={`${match.url}/add`} render={(props) => <UserForm {...props} formType="Add" backUrl={match.url} />} />
					<Route exact path={`${match.url}/edit/:id`} render={(props) => <UserForm {...props} formType="Edit" backUrl={match.url} />} />
					<Route exact path={`${match.url}/view/:id`} render={(props) => <UserForm {...props} formType="View" backUrl={match.url} />} />
					<Redirect to="/admin/error" />
				</Switch>
			</Fragment>
		)
	}
}
