import { combineReducers } from "redux";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";
import authReducer from "./auth.reducer";
import groupReducer from "./group.reducer";
import colorsReducer from "./colors.reducer";

export default combineReducers({
  productReducer,
  categoryReducer,
  cartReducer,
  userReducer,
  authReducer,
  groupReducer,
  colorsReducer,
});
