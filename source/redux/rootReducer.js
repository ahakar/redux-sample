
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './modules/home';
import cart from './modules/cart';
import profile from './modules/profile';

export default combineReducers({
  home,
  cart,
  profile,
  routing: routerReducer,
});
