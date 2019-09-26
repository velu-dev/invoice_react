import {
    SUBSCRIPTION_PLANS,
    ADD_SUBSCRIPTION,
    SUBSCRIPTION_LIST,
    GET_SUBSCRIPTION,
    UPDATE_SUBSCRIPTION,
    DELETE_SUBSCRIPTION,
    UPDATE_SUBSCRIPTION_STATUS
} from '_constants/ReduxTypes';
import { ADMIN, USER } from '_constants/ApiActionUrl';
import { post, get, put, del } from 'components/AjaxConfig';



export const subscriptionPlans = () => {
    return (dispatch) => {
        dispatch(subscriptionStatus(SUBSCRIPTION_PLANS, true));
        get(ADMIN.SUBSCRIPTION_PLANS)
            .then((response) => {
                dispatch(subscriptionStatus(SUBSCRIPTION_PLANS, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const addSubscription = (formData) => {
    return (dispatch) => {
        dispatch(subscriptionStatus(ADD_SUBSCRIPTION, true));
        post(ADMIN.ADD_SUBSCRIPTION, formData)
            .then((response) => {
                dispatch(subscriptionStatus(ADD_SUBSCRIPTION, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getSubscriptionList = (filters) => {
    return (dispatch) => {
        dispatch(subscriptionStatus(SUBSCRIPTION_LIST, true));
        post(ADMIN.SUBSCRIPTION_LIST, filters)
            .then((response) => {
                dispatch(subscriptionStatus(SUBSCRIPTION_LIST, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getUserSubscriptionList = () => {
    return (dispatch) => {
        dispatch(subscriptionStatus(SUBSCRIPTION_LIST, true));
        get(USER.SUBSCRIPTION_LIST)
            .then((response) => {
                dispatch(subscriptionStatus(SUBSCRIPTION_LIST, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getSubscription = (id) => {
    return (dispatch) => {
        dispatch(subscriptionStatus(GET_SUBSCRIPTION, true));
        get(`${ADMIN.GET_SUBSCRIPTION}/${id}`)
            .then((response) => {
                dispatch(subscriptionStatus(GET_SUBSCRIPTION, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const updateSubscription = (formData, id) => {  
    return (dispatch)=>{
       dispatch(subscriptionStatus(UPDATE_SUBSCRIPTION, true));
		put(`${ADMIN.UPDATE_SUBSCRIPTION}/${id}`, formData)
        .then((response)=> {          
          dispatch(subscriptionStatus(UPDATE_SUBSCRIPTION, false, response.data));
        })
        .catch((error)=> {
          console.log(error.response);
        });
    }
};

export const updateSubscriptionStatus = (id, status) => {  
    return (dispatch)=>{
       dispatch(subscriptionStatus(UPDATE_SUBSCRIPTION_STATUS, true));
		put(`${ADMIN.UPDATE_SUBSCRIPTION_STATUS}`, {id, status})
        .then((response)=> {          
          dispatch(subscriptionStatus(UPDATE_SUBSCRIPTION_STATUS, false, response.data));
        })
        .catch((error)=> {
          console.log(error.response);
        });
    }
};

export const deleteSubscription = (id) => {  
    return (dispatch)=>{
       dispatch(subscriptionStatus(DELETE_SUBSCRIPTION, true));
        del(`${ADMIN.DELETE_SUBSCRIPTION}/${id}`)
        .then((response)=> {          
          dispatch(subscriptionStatus(DELETE_SUBSCRIPTION, false, response.data));
        })
        .catch((error)=> {
          console.log(error.response);
        });
    }
};


export function subscriptionStatus(type, loading, result = [], error) {
    return { type, loading, result, error };
}                                   