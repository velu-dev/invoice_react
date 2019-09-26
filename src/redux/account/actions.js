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
    STRIPE_DISCONNECT,
    BUY_NEW_PLAN,
    GET_PLAN_STATUS
} from '_constants/ReduxTypes';
import _ from 'lodash';
import { USER } from '_constants/ApiActionUrl';
import { post, get, put, del, toaster, userGaurd } from 'components';


export const getAccountDetails = () => {
    return (dispatch) => {
        dispatch(accountStatus(ACCOUNT_DETAILS, true));
        get(USER.ACCOUNT_DETAILS)
            .then((response) => {
                dispatch(accountStatus(ACCOUNT_DETAILS, false, response.data));
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
};

export const getCards = () => {
    return (dispatch) => {
        dispatch(accountStatus(GET_CARDS, true));
        get(USER.GET_CARDS)
            .then((response) => {
                dispatch(accountStatus(GET_CARDS, false, response.data))                
            })
            .catch((error) => {
                console.log(error)
            });
    }
};

export const deleteAccount = (formData) => {
    return (dispatch) => {
        dispatch(accountStatus(DELETE_ACCOUNT, true));
        post(USER.DELETE_ACCOUNT, formData)
            .then((response) => {
                dispatch(accountStatus(DELETE_ACCOUNT, false, response.data));
                toaster(response.data);
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const deleteCard = (id) => {
    return (dispatch) => {
        dispatch(accountStatus(DELETE_CARD, true));
        del(`${USER.DELETE_CARD}/${id}`)
            .then((response) => {
                dispatch(accountStatus(DELETE_CARD, false, response.data));
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const addCard = (formData) => {
    return (dispatch) => {
        dispatch(accountStatus(ADD_CARD, true));
        post(USER.ADD_CARD, formData)
            .then((response) => {
                dispatch(accountStatus(ADD_CARD, false, response.data));
                toaster(response.data);
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const defaultCard = (id) => {
    return (dispatch) => {
        dispatch(accountStatus(DEFAULT_CARD, true));
        let formData = { card_id: id };
        post(USER.DEFAULT_CARD, formData)
            .then((response) => {
                dispatch(accountStatus(DEFAULT_CARD, false, response.data));
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const invoiceRedirectUrl = (formData) => {
    return (dispatch) => {
        dispatch(accountStatus(INVOICE_REDIRECT_URL, true));
        post(USER.INVOICE_REDIRECT_URL, formData)
            .then((response) => {
                dispatch(accountStatus(INVOICE_REDIRECT_URL, false, response.data));
                toaster(response.data);
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const buyPlan = (id) => {
    return (dispatch) => {
        dispatch(accountStatus(BUY_PLAN, true));
        get(`${USER.BUY_PLAN}/${id}`)
            .then((response) => {
                dispatch(accountStatus(BUY_PLAN, false, response.data))
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const stripeAccount = () => {
    return (dispatch) => {
        dispatch(accountStatus(STRIPE_ACCOUNT, true));
        get(USER.STRIPE_ACCOUNT)
            .then((response) => {
                dispatch(accountStatus(STRIPE_ACCOUNT, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const syncWithStripe = () => {
    return (dispatch) => {
        dispatch(accountStatus(SYNC_WITH_STRIPE, true));
        get(USER.SYNC_WITH_STRIPE)
            .then((response) => {
                dispatch(accountStatus(SYNC_WITH_STRIPE, false, response.data))
                toaster(response.data);
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const stripeDisconnect = () => {
    return (dispatch) => {
        dispatch(accountStatus(STRIPE_DISCONNECT, true));
        get(USER.STRIPE_DISCONNECT)
            .then((response) => {
                dispatch(accountStatus(STRIPE_DISCONNECT, false, response.data))
                toaster(response.data);
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const buyNewPlan = (formData) => {
    return (dispatch) => {
        dispatch(accountStatus(BUY_NEW_PLAN, true));
        post(USER.BUY_NEW_PLAN, formData)
            .then((response) => {
                dispatch(accountStatus(BUY_NEW_PLAN, false, response.data))
                toaster(response.data);
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};


export const getPlanStatus = (id) => {
    return (dispatch) => {
        dispatch(accountStatus(GET_PLAN_STATUS, true));
        get(`${USER.GET_PLAN_STATUS}/${id}`)
            .then((response) => {
                dispatch(accountStatus(GET_PLAN_STATUS, false, response.data))
                userGaurd(dispatch, response.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};


export const  accountStatus = (type, loading, result = '', error) => {       
    return { type, loading, result, error };
}
 