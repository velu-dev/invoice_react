import {
    MYBILLING_LIST
} from '_constants/ReduxTypes';
import { USER } from '_constants/ApiActionUrl';
import { post, get, put, del, userGaurd } from 'components';

export const getMyBillingList = (filters) => {
    return (dispatch) => {
        dispatch(myBillingStatus(MYBILLING_LIST, true));
        post(USER.MYBILLING_LIST, filters)
            .then((response) => {
                dispatch(myBillingStatus(MYBILLING_LIST, false, response.data))
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};
 
export function myBillingStatus(type, loading, result = '', error) {
    return { type, loading, result, error };
}                                   