import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from "../actions/product.action";

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product._id === action.payload._id) {
          return {
            ...product,
            name: action.payload.name,
            buy_price: action.payload.buy_price,
            sell_price: action.payload.sell_price,
            img_path: action.payload.img_path,
          };
        } else return product;
      });
    case ADD_PRODUCT:
      return [...state, action.payload];
    case DELETE_PRODUCT:
      return state.filter((product) => product._id !== action.payload);

    default:
      return state;
  }
}
