
import React from 'react';
import { render } from 'react-dom';
import hashHistory from 'react-router/lib/hashHistory';
import { syncHistoryWithStore } from 'react-router-redux';
// import momentLocalizer from 'react-widgets/lib/localizers/moment';
// import moment from 'moment';

import './styles/styles.less';

import './utils/polyfill';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

/// intialize redux store values
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const history = syncHistoryWithStore(hashHistory, store);

/// for react-widgets
// momentLocalizer(moment);

render(
  <Root store={store} history={history} />,
  document.querySelector('#root')
);
