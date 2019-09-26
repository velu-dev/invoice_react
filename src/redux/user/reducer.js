import {
    ADD_USER,
    USER_LIST,
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    UPDATE_USER_STATUS,
    CHANGE_PASSWORD
} from '_constants/ReduxTypes';

const INIT_STATE = {
    userList: [],
    user: {},
    userDetail: {},
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_USER:
            return { ...state, loading: action.loading, user: action.result };
        case USER_LIST:
            return { ...state, loading: action.loading, userList: action.result };
        case GET_USER:
            return { ...state, loading: action.loading, userDetail: action.result };
        case UPDATE_USER:
            return { ...state, loading: action.loading, user: action.result };
        case UPDATE_USER_STATUS:
            return { ...state, loading: action.loading, user: action.result };
        case DELETE_USER:
            return { ...state, loading: action.loading, user: action.result };
        case CHANGE_PASSWORD:
            return { ...state, loading: action.loading, user: action.result };
        default: return { ...state };
    }
}
