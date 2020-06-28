
import React from 'react';
import Link from 'react-router/lib/Link';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from '../containers/App';
import Home from '../containers/Home';
import Cart from '../containers/Cart';
import Profile from '../containers/Profile';
import ContactUs from '../containers/ContactUs';

/// Does not break for 404 path not found
const NoMatch = () => (<div className="text-center">
  <h3 className="text-danger">404: Page not found!</h3>
  <Link to="/">Back To Home</Link>
</div>);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="cart" component={Cart} />
    <Route path="profile" component={Profile}/>
    <Route path="contactus" component={ContactUs} />
    <Route path="*" component={NoMatch} />
  </Route>
);

// <Route path="product/:productId" component={Product} />
