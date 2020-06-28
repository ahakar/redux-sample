
import React, { Component, PropTypes } from 'react';
import Router from 'react-router/lib/Router';
import { Provider } from 'react-redux';

import routes from '../routes';

class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
