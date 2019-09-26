import React, { Fragment } from "react";
import { push } from 'react-router-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { authService } from './Auth'

export const getUrlVars = () => {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

export const matchedObjects = (initialState, data) => {
  const filtered = _.keys(data)
    .filter(key => _.keys(initialState).includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
  return filtered;
}

export const formValuesAssignIn = (formState, initialState, data) => {
  return _.assignIn(formState, matchedObjects(initialState, data));
}

export const userGaurd = (dispatch, result) => {
  if (!_.isEmpty(result)) {
    if (!result.status && !result.is_active) {
      authService.signout(() => {
        dispatch(push('/home'))
        toast.error(result.message)
      })
    }
  }
}
