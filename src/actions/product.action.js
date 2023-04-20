import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => {
  return (dispatch) => {
    axios.get("http://localhost:5000/product/get").then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    });
  };
};

export const editProduct = (product) => {
  return (dispatch) => {
    axios.put(`http://localhost:5000/product/edit/${product._id}`, product);
    dispatch({
      type: EDIT_PRODUCT,
      payload: product,
    });
  };
};

export const addProduct = (product) => {
  return (dispatch) => {
    axios.post("http://localhost:5000/product/add", product);
    dispatch({
      type: ADD_PRODUCT,
      payload: product,
    });
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    axios.delete("http://localhost:5000/product/delete/" + productId);
    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    });
  };
};
