import { TRANSACTION_LIST,
    GET_TRANSACTION
        } from '_constants/ReduxTypes';

const INIT_STATE = {
    transaction_list:[],
    transaction_detail:[]   
};

export default (state = INIT_STATE, action) => {
    switch (action.type) { 
        case TRANSACTION_LIST:           
            if(action.result.transactions !== undefined) {
                action.result.data =action.result.transactions.data; 
            }            
            return { ...state, loading: action.loading, transaction_list: action.result };
        case GET_TRANSACTION:
            if(action.result.transaction !== undefined) {
                action.result.data =action.result.transaction; 
            }  
            return { ...state, loading: action.loading, transaction_detail: action.result };      
        default: return { ...state };
    }
}
