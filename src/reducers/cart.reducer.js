import {
  ADD_TO_CART,
  GET_CART,
  DELETE_FROM_CART,
  ADD_QUANTITY,
  DELETE_CART,
} from "../actions/cart.action";

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    case ADD_TO_CART:
      return action.payload;
    case DELETE_FROM_CART:
      return action.payload;
    case ADD_QUANTITY:
      return action.payload;
    case DELETE_CART:
      return action.payload;

    default:
      return state;
  }
}
