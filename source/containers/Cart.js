
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as cartActions from '../redux/modules/cart';
import CartView from '../views/CartView';

function mapStateToProps(state) {
  const { cart } = state;
  console.log('see the cart now', cart);
  return {
    cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
