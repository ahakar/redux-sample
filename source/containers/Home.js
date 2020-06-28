
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from '../redux/modules/home';
import * as cartActions from '../redux/modules/cart';
import HomeView from '../views/HomeView';

function mapStateToProps(state) {
  console.log('MAP STATE TO PROPS of HOME ');
  const { home } = state;
  return {
    home
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { ...homeActions, ...cartActions };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
