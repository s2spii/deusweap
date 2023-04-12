import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { CartProvider } from "./components/CartContext";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { getProducts } from "./actions/product.action";
import { getCategories } from "./actions/category.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getProducts());
store.dispatch(getCategories());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
  </Provider>
);
