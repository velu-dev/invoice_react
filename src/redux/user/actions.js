import {
    ADD_USER,
    USER_LIST,
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    UPDATE_USER_STATUS,
    CHANGE_PASSWORD
} from '_constants/ReduxTypes';
import { ADMIN } from '_constants/ApiActionUrl';
import { post, get, put, del } from 'components';


export const addUser = (formData) => {

    return (dispatch) => {

        dispatch(userStatus(ADD_USER, true));
        post(ADMIN.ADD_USER, formData)
            .then((response) => {
                dispatch(userStatus(ADD_USER, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getUserList = (filters) => {
    return (dispatch) => {
        dispatch(userStatus(USER_LIST, true));
        post(ADMIN.USER_LIST, filters)
            .then((response) => {
                dispatch(userStatus(USER_LIST, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const getUser = (id) => {
    return (dispatch) => {
        dispatch(userStatus(GET_USER, true));
        get(`${ADMIN.GET_USER}/${id}`)
            .then((response) => {
                dispatch(userStatus(GET_USER, false, response.data))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const updateUser = (formData, id) => {
    return (dispatch) => {
        dispatch(userStatus(UPDATE_USER, true));
        put(`${ADMIN.UPDATE_USER}/${id}`, formData)
            .then((response) => {
                dispatch(userStatus(UPDATE_USER, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const updateUserStatus = (id, status) => {
    return (dispatch) => {
        dispatch(userStatus(UPDATE_USER_STATUS, true));
        put(`${ADMIN.UPDATE_USER_STATUS}`, {id, status})
            .then((response) => {
                dispatch(userStatus(UPDATE_USER_STATUS, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const deleteUser = (id) => {
    return (dispatch) => {
        dispatch(userStatus(DELETE_USER, true));
        del(`${ADMIN.DELETE_USER}/${id}`)
            .then((response) => {
                dispatch(userStatus(DELETE_USER, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

export const changePassword = (formData) => {

    return (dispatch) => {
        dispatch(userStatus(CHANGE_PASSWORD, true));
        post(ADMIN.CHANGE_PASSWORD, formData)
            .then((response) => {
                dispatch(userStatus(CHANGE_PASSWORD, false, response.data));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};


export function userStatus(type, loading, result = '', error) {
    return { type, loading, result, error };
}                                   