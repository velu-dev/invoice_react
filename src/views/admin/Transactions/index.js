import React, {Component, Fragment} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'; 
 
import TransactionsList from 'views/admin/Transactions/list'; 
import TransactionsForm from 'views/admin/Transactions/form'; 


export default class extends Component {	
	render(){		
    const { match } = this.props;
		return(
		<Fragment>
 
		 <Switch>      
			<Route  exact path={`${match.url}/`} component={TransactionsList} />     	 
			<Route  exact path={`${match.url}/view/:id`} render={(props) => <TransactionsForm {...props} formType="View" backUrl={match.url}/>}/>		 
			<Redirect to="/admin/error" />
		</Switch>
		</Fragment>
		)
	}
}
