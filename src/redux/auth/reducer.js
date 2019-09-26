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

const INIT_STATE = {
    authenticate: [],
    user: [],
    signupUser: [],
    loading: false,
    forgot_password: [],
    reset_password: [],
    link_expired: [],
    auth_update:{},
    stripe:[],
    auth_info:{}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: action.loading, authenticate: action.result };
        case GET_CURRENT_USER:
            return { ...state, loading: action.loading, auth_user: action.result };
        case SIGN_UP:
            return { ...state, loading: action.loading, signupUser: action.result };
        case LOGIN_ADMIN:
            return { ...state, loading: action.loading, authenticate: action.result };
        case GET_ADMIN_USER:
            return { ...state, loading: action.loading, auth_user: action.result };
        case FORGOT_PASSWORD:
            return { ...state, loading: action.loading, forgot_password: action.result };
        case RESET_PASSWORD:
            return { ...state, loading: action.loading, reset_password: action.result };
        case LINK_EXPIRED:
            return { ...state, loading: action.loading, link_expired: action.result };
        case AUTH_UPDATE:
            return { ...state, loading: action.loading, auth_update: action.result };
        case RESET_EMAIL:
            return { ...state, loading: action.loading, auth_update: action.result };
        case CONNECT_STRIPE:
            return { ...state, loading: action.loading, stripe: action.result };
       case AUTH_INFO:
            return { ...state, loading: false, auth_info: action.result };
        default: return { ...state };
    }
}
