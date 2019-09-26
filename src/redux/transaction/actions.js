import {
    TRANSACTION_LIST,
    GET_TRANSACTION
} from '_constants/ReduxTypes';
import { ADMIN } from '_constants/ApiActionUrl';
import { get } from 'components/AjaxConfig';


export const getTransactionList = (filters) => {
    return (dispatch) => {
        dispatch(transactionStatus(TRANSACTION_LIST, true));
        get(ADMIN.TRANSACTION_LIST, filters)
            .then((response) => {
                dispatch(transactionStatus(TRANSACTION_LIST, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getTransaction = (id) => {
    return (dispatch) => {
        dispatch(transactionStatus(GET_TRANSACTION, true));
        get(`${ADMIN.GET_TRANSACTION}/${id}`)
            .then((response) => {
                dispatch(transactionStatus(GET_TRANSACTION, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};


export function transactionStatus(type, loading, result = [], error) {
    return { type, loading, result, error };
}                                   