/* Base API URL */
export const ACTION_URL = 'http://192.168.3.236:3000/'; 

/* AUTH */
export const AUTH = {
	LOGIN : ACTION_URL + 'tenants/login',
	GET_CURRENT_USER : ACTION_URL + 'get_user',
	SIGN_UP : ACTION_URL + 'tenants/signup',
	LOGIN_ADMIN : ACTION_URL + 'admin/login',
	GET_ADMIN_USER : ACTION_URL + 'get_user',
	FORGOT_PASSWORD : ACTION_URL + 'auth/forgot_password',
	RESET_PASSWORD : ACTION_URL + 'auth/reset_password',
	LINK_EXPIRED : ACTION_URL + 'auth/link_expired',
	AUTH_UPDATE : ACTION_URL + 'auth/update_user',
	RESET_EMAIL : ACTION_URL + 'auth/reset_email',
	CONNECT_STRIPE : ACTION_URL + 'tenants/connect_stripe'	
	};

/* ADMIN */
export const ADMIN = {
	ADD_USER : ACTION_URL + 'admin/users',
	USER_LIST : ACTION_URL + 'admin/user_list',
	GET_USER : ACTION_URL + 'admin/users',
	UPDATE_USER : ACTION_URL + 'admin/users',
	UPDATE_USER_STATUS : ACTION_URL + 'admin/users/update_status',
	DELETE_USER : ACTION_URL + 'admin/users',
	SUBSCRIPTION_PLANS : ACTION_URL + 'admin/subscription_plans',
	ADD_SUBSCRIPTION : ACTION_URL + 'admin/subscriptions',
	SUBSCRIPTION_LIST : ACTION_URL + 'admin/subscription_list',
	GET_SUBSCRIPTION : ACTION_URL + 'admin/subscriptions',
	UPDATE_SUBSCRIPTION : ACTION_URL + 'admin/subscriptions',
	UPDATE_SUBSCRIPTION_STATUS : ACTION_URL + 'admin/update_subscription_status/',
	DELETE_SUBSCRIPTION : ACTION_URL + 'admin/subscriptions',
	TRANSACTION_LIST : ACTION_URL + 'admin/transactions',
	GET_TRANSACTION : ACTION_URL + 'admin/transactions',
	CHANGE_PASSWORD : ACTION_URL + 'auth/change_password',
	};


/* MYBILLING */
export const USER = {
	MYBILLING_LIST : ACTION_URL + 'tenants/my_billing',
	ACCOUNT_DETAILS : ACTION_URL + 'tenants/account_details',
	DELETE_CARD : ACTION_URL + 'tenants/cards',
	ADD_CARD : ACTION_URL + 'tenants/cards',
	DEFAULT_CARD : ACTION_URL + 'tenants/cards/default',
	SUBSCRIPTION_LIST : ACTION_URL + 'tenants/subscriptions',
	DELETE_ACCOUNT : ACTION_URL + 'tenants/delete_account',
	INVOICE_REDIRECT_URL : ACTION_URL + 'tenants/invoice_redirect_url',
	BUY_PLAN : ACTION_URL + 'tenants/buyplan',
	STRIPE_ACCOUNT : ACTION_URL + 'tenants/stripe_account',
	GET_CARDS : ACTION_URL + 'tenants/cards',
	SYNC_WITH_STRIPE : ACTION_URL + 'tenants/stripe_sync',
	STRIPE_DISCONNECT : ACTION_URL + 'tenants/disconnect_stripe',
	BUY_NEW_PLAN : ACTION_URL + 'tenants/subscriptions',
	GET_PLAN_STATUS : ACTION_URL + 'tenants/plan_status',
			
	};






