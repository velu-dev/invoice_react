import {
    SUBSCRIPTION_PLANS,
    ADD_SUBSCRIPTION,
    SUBSCRIPTION_LIST,
    GET_SUBSCRIPTION,
    UPDATE_SUBSCRIPTION,
    DELETE_SUBSCRIPTION,
    UPDATE_SUBSCRIPTION_STATUS
} from '_constants/ReduxTypes';

const INIT_STATE = {
    subscription_plans: [],
    subscriptions: {},
    subscription_list: [],
    subscription_detail: [],
    loading:false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUBSCRIPTION_PLANS:
            return { ...state, loading: action.loading, subscription_plans: action.result };
        case ADD_SUBSCRIPTION:
            return { ...state, loading: action.loading, subscriptions: action.result };
        case SUBSCRIPTION_LIST:
            return { ...state, loading: action.loading, subscription_list: action.result };
        case GET_SUBSCRIPTION:
            return { ...state, loading: action.loading, subscription_detail: action.result };
        case UPDATE_SUBSCRIPTION:
            return { ...state, loading: action.loading, subscriptions: action.result };
        case DELETE_SUBSCRIPTION:
            return { ...state, loading: action.loading, subscriptions: action.result };
        case UPDATE_SUBSCRIPTION_STATUS:
            return { ...state, loading: action.loading, subscriptions: action.result };
        default: return { ...state };
    }
}
