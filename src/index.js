import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { getProducts } from "./actions/product.action";
import { getCategories } from "./actions/category.action";
import { getCart } from "./actions/cart.action";
import { getUsers } from "./actions/user.action";
import { getGroups } from "./actions/group.action";

if (!window.localStorage.deusweap_cart) {
  window.localStorage.deusweap_cart = JSON.stringify([]);
} else if (typeof window.localStorage.deusweap_cart !== []) {
  window.localStorage.deusweap_cart = JSON.stringify([]);
}

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getProducts());
store.dispatch(getCategories());
store.dispatch(getCart());
store.dispatch(getUsers());
store.dispatch(getGroups());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
