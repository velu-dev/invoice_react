import React, {Component, Fragment} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'; 
 
import SubscriptionList from './list'; 
import SubscriptionForm from './form'; 


export default class extends Component {
	render(){		
    const { match } = this.props;	
		return(
		<Fragment>
 
		 <Switch>      
			<Route  exact path={`${match.url}/`} component={SubscriptionList} />
     		<Route  exact path={`${match.url}/add`}  render={(props) => <SubscriptionForm {...props} formType="Add" backUrl={match.url}/>} />
			<Route exact path={`${match.url}/edit/:id`} render={(props) => <SubscriptionForm {...props} formType="Edit" backUrl={match.url}/>}/>
			<Route  exact path={`${match.url}/view/:id`} render={(props) => <SubscriptionForm {...props} formType="View" backUrl={match.url}/>}/>		 
			<Redirect to="/admin/error" />
		</Switch>
		</Fragment>
		)
	}
}
