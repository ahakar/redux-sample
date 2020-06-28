
/// home
import { fetchJSON } from '../../utils';
import { ACTION_TYPES, APIS } from '../../constants';

const {
  GET_ALL_ITEMS,
  MORE_ITEMS,
} = ACTION_TYPES;

export function getAllItems() {
  console.log('getallitems being called ... am at first line');
  return (dispatch) => {
    fetchJSON(APIS.ALL_ITEMS)
    .then(data => {
      // console.log('actions.getAllItems', data);
      dispatch({
        type: GET_ALL_ITEMS,
        payload: data
      });
    });
  };
}

export function addMoreItems() {
  console.log('addMoreItems being called ... am at first line');
  return (dispatch) => {
    fetchJSON(APIS.MORE_ITEMS)
    .then(data => {
      // console.log('actions.getAllItems', data);
      dispatch({
        type: MORE_ITEMS,
        payload: data
      });
    });
  };
}


/// reducer
const initialState = {
  allItems: [],
};

export default function(state = initialState, action) {

  const { type, payload } = action;
  console.log('reducer.home', action);

  switch (type) {

    case GET_ALL_ITEMS:
      console.log('reducer.home-get all items', payload);
      return { ...state, allItems: payload.items };
      break;
    case MORE_ITEMS:
      console.log('ADDING MORE ITEMS TO THE LIST', payload);
      let {allItems} = state;
      payload.items.forEach(item => allItems.push(item));
      return { ...state, allItems};
    default:
  }

  return state;
}
