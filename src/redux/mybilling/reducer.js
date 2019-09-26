import {
    MYBILLING_LIST
} from '_constants/ReduxTypes';

const INIT_STATE = {
    mybilling_list: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {      
        case MYBILLING_LIST:
            return { ...state, loading: action.loading, mybilling_list: action.result };
        default: return { ...state };
    }
}
