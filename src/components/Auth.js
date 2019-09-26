import axios from 'axios';
import _ from 'lodash';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export const authService = {
	isAuthenticated: false,
	token: '',
	authenticate(callback) {
		if (sessionStorage.getItem('token')) {
			this.isAuthenticated = true;
			this.token = sessionStorage.getItem('token');
			axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
		} else {
			this.isAuthenticated = false;
			this.token = "";
		}
		setTimeout(callback, 300);
	},
	routerAuthenticate() {
		if (sessionStorage.getItem('token')) {
			return true;
		} else {
			return false;
		}

	},
	signout(callback) {
		sessionStorage.removeItem('token');
		this.isAuthenticated = false;
		this.token = "";
		delete axios.defaults.headers.common["Authorization"];
		setTimeout(callback, 300);
	},
	containerAccess(pathName){
		if(_.includes(['admin', 'set_password', 'reset_password', 'reset_email'], pathName)){
			return false;
		}else{
			return true;
		}
	},
	isAdminAuthenticated: false,
	adminToken: '',
	adminAuthenticate(callback) {
		if (sessionStorage.getItem('adminToken')) {
			this.isAdminAuthenticated = true;
			this.adminToken = sessionStorage.getItem('adminToken');
			axios.defaults.headers.common['Authorization'] = `Bearer ${this.adminToken}`;
		} else {
			this.isAdminAuthenticated = false;
			this.adminToken = "";
		}
		setTimeout(callback, 300);
	},
	routerAdminAuthenticate() {
		if (sessionStorage.getItem('adminToken')) {
			return true;
		} else {
			return false;
		}
	},
	adminSignout(callback) {
		sessionStorage.removeItem('adminToken');
		this.isAdminAuthenticated = false;
		this.adminToken = "";
		delete axios.defaults.headers.common["Authorization"];
		setTimeout(callback, 300);
	},

};