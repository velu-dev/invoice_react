import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory as createHistory } from 'history'
import reducers from './reducers';

export const history = createHistory();
const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
  ];
 
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
  
const store = createStore(
    reducers,
    initialState,
    composedEnhancers
  );
  
export default store;

