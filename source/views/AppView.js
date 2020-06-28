
import React, { PropTypes, Component } from 'react';
import { Grid, Tabs, Tab } from 'react-bootstrap';

import { NavMenu, Footer } from '../components';
import { NAV_MENU_DATA } from '../constants';

class AppView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    const { children } = props;
    return (
      <div className="app wrapper">

        <NavMenu brandLabel="Grocery Shop" data={NAV_MENU_DATA} />

        <Grid fluid className="app-container">
          {children}
        </Grid>

        <Footer />

      </div>
    );
  }

}

AppView.propTypes = {
  // Injected by React Router
  children: PropTypes.node
};

export default AppView;
