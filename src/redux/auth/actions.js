import {
    AUTH_INFO,
    LOGIN_USER,
    GET_CURRENT_USER,
    SIGN_UP,
    LOGIN_ADMIN,
    GET_ADMIN_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    LINK_EXPIRED,
    AUTH_UPDATE,
    RESET_EMAIL,
    CONNECT_STRIPE
} from '_constants/ReduxTypes';

import { AUTH } from '_constants';
import { post, get, toaster } from 'components';


export const AuthInfo = (info) => { 
    console.log(info)
    return (dispatch) => {
        dispatch(authStatus(AUTH_INFO, false, info));
    }
};

export const loginUser = (username, password) => {  
    return (dispatch) => {
        dispatch(authStatus(LOGIN_USER, true));
        var data = { username, password };

        post(AUTH.LOGIN, data)
            .then((response) => {
                dispatch(authStatus(LOGIN_USER, false, response.data));
                toaster(response.data); 
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getCurrentUser = () => {
    return (dispatch) => {
        dispatch(authStatus(GET_CURRENT_USER, true));
        get(AUTH.GET_CURRENT_USER)
            .then((response) => {
                dispatch(authStatus(GET_CURRENT_USER, false, response.data))
                if(response.data.status){
                    dispatch(AuthInfo(response.data));
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const signUp = (formData) => {

    return (dispatch) => {
        dispatch(authStatus(SIGN_UP, true));
        post(AUTH.SIGN_UP, formData)
            .then((response) => {
                dispatch(authStatus(SIGN_UP, false, response.data));
                toaster(response.data);  
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const loginAdmin = (username, password) => {

    return (dispatch) => {
        dispatch(authStatus(LOGIN_ADMIN, true));
        var data = { username, password };

        post(AUTH.LOGIN_ADMIN, data)
            .then((response) => {
                dispatch(authStatus(LOGIN_ADMIN, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getAdminUser = () => {
    return (dispatch) => {

        dispatch(authStatus(GET_ADMIN_USER, true));
        get(AUTH.GET_ADMIN_USER)
            .then((response) => {
                dispatch(authStatus(GET_ADMIN_USER, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const forgotPassword = (email, role) => {
    return (dispatch) => {
        dispatch(authStatus(FORGOT_PASSWORD, true));
        var data = { email, role };

        post(AUTH.FORGOT_PASSWORD, data)
            .then((response) => {
                dispatch(authStatus(FORGOT_PASSWORD, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};


export const linkExpired = (token) => {
    return (dispatch) => {
        dispatch(authStatus(LINK_EXPIRED, true));

        post(AUTH.LINK_EXPIRED, { 'token': token })
            .then((response) => {
                dispatch(authStatus(LINK_EXPIRED, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const resetPassword = (data) => {
    return (dispatch) => {
        dispatch(authStatus(RESET_PASSWORD, true));

        post(AUTH.RESET_PASSWORD, data)
            .then((response) => {
                dispatch(authStatus(RESET_PASSWORD, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const authUpdate = (formData) => {
    return (dispatch) => {
        dispatch(authStatus(AUTH_UPDATE, true));
        post(`${AUTH.AUTH_UPDATE}`, formData)
            .then((response) => {
                dispatch(authStatus(AUTH_UPDATE, false, response.data));
                toaster(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const resetEmail = (token) => {

    return (dispatch) => {
        dispatch(authStatus(RESET_EMAIL, true));
        post(AUTH.RESET_EMAIL, { token })
            .then((response) => {
                dispatch(authStatus(RESET_EMAIL, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};


export const connectStripe = (code) => {
    return (dispatch) => {       
        dispatch(authStatus(CONNECT_STRIPE, true));
        post(AUTH.CONNECT_STRIPE, {code:code})
            .then((response) => {
                dispatch(authStatus(CONNECT_STRIPE, false, response.data))
                toaster(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};
 



export function authStatus(type, loading, result = '', error) {
    return { type, loading, result, error };
}