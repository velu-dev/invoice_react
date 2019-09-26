import { combineReducers } from 'redux';
import authUser from './auth/reducer';
import adminUsers from './user/reducer';
import subscription from './subscription/reducer';
import transaction from './transaction/reducer';
import mybilling from './mybilling/reducer';
import account from './account/reducer';

const reducers = combineReducers({
  authUser,
  adminUsers,
  subscription,
  transaction,
  mybilling,
  account
});

export default reducers;