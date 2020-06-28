
/// home
import { fetchJSON } from '../../utils';
import { ACTION_TYPES, APIS } from '../../constants';

const {
  ADD_TO_CART,
  GET_ALL_ITEMS,
} = ACTION_TYPES;

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: { item }
  };
}

export function removeFromCart(item) {
  return {
    type: 'TODO_removeFromCart',
    payload: { item }
  };
}

export function checkOut() {
  return {
    type: 'TODO_checkOut',
    payload: { }
  };
}


/// reducer
const initialState = {
  cartItems: [],
};

export default function(state = initialState, action) {

  const { type, payload } = action;
  console.log('reducer.cart', action);

  switch (type) {
    
    case ADD_TO_CART: {
      console.log('AM INSIDE ADD 2 CART');
      const { cartItems } = state;
      const { item } = payload;
      const foundItem = cartItems.find(a => a.id === item.id);
      if( foundItem ) {
        foundItem.count++;
      } else {
        item.count = 1;
        cartItems.push(item);
      }
      // console.log('reducer.cart', payload);
      return { ...state, cartItems };
    }
    break;
    default:
  }
  return state;
}
