import {
    ACCOUNT_DETAILS,
    DELETE_CARD,
    ADD_CARD,
    DEFAULT_CARD,
    DELETE_ACCOUNT,
    INVOICE_REDIRECT_URL,
    BUY_PLAN,
    STRIPE_ACCOUNT,
    GET_CARDS,
    SYNC_WITH_STRIPE,
    STRIPE_DISCONNECT ,
    BUY_NEW_PLAN,
    GET_PLAN_STATUS   
} from '_constants/ReduxTypes';

const INIT_STATE = {
   account_details: [],
   delete_card:[],
   add_card:[],
   default_card:[],
   redirect:[],
   buy_plan:[],
   stripe_account:[],
   cards:[],
   sync_stripe:[],
   stripe_disconnect:[],
   buy_new_plan:[],
   plan_status:[]
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {      
        case ACCOUNT_DETAILS:
            return { ...state, loading: action.loading, account_details: action.result };
        case DELETE_CARD:
        return { ...state, loading: action.loading, delete_card: action.result };
        case ADD_CARD:
        return { ...state, loading: action.loading, add_card: action.result };
        case DEFAULT_CARD:
        return { ...state, loading: action.loading, default_card: action.result };
        case DELETE_ACCOUNT:
        return { ...state, loading: action.loading, delete_account: action.result };
        case INVOICE_REDIRECT_URL:
        return { ...state, loading: action.loading, redirect: action.result };
        case BUY_PLAN:
        return { ...state, loading: action.loading, buy_plan: action.result };
        case STRIPE_ACCOUNT:
        return { ...state, loading: action.loading, stripe_account: action.result };
        case GET_CARDS:
        return { ...state, loading: action.loading, cards: action.result };
        case SYNC_WITH_STRIPE:
        return { ...state, loading: action.loading, sync_stripe: action.result };
        case STRIPE_DISCONNECT:
        return { ...state, loading: action.loading, stripe_disconnect: action.result };
        case BUY_NEW_PLAN:
        return { ...state, loading: action.loading, buy_new_plan: action.result };
        case GET_PLAN_STATUS:
        return { ...state, loading: action.loading, plan_status: action.result };

        
        default: return { ...state };
    }
}
