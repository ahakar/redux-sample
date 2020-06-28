import { ACTION_TYPES  } from '../../constants';

const {
  ADD_PROFILE,
  GET_ALL_ITEMS
} = ACTION_TYPES;

export function setProfile(data) {
  console.log('setProfile ');
  return {
    type: ADD_PROFILE,
    payload: { data }
  };
}
/// reducer
const initialState = {
  profile: [],
};

export default function(state = initialState, action) {

  const { type, payload } = action;
  console.log('reducer.PROFILE', action);

  switch (type) {
    case GET_ALL_ITEMS:
      console.log('IN PROFILE REDUCER -> GET_ALL_ITEMS');
      return {...state}
    case ADD_PROFILE: {
      return {...state, profile: payload}
    }
    default:
      return state
  }
}
