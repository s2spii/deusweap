import axios from "axios";
import { isEmpty } from "../components/Utils";
import { deleteProduct } from "./product.action";

const getProductsByCategory = (state, categoryName) => {
  return state.productReducer.filter(
    (product) => product.categories === categoryName
  );
};

export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/categories/get`)
      .then((res) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: res.data,
        });
      });
  };
};

export const addCategory = (category) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/categories/add`, category)
      .then((res) => {
        dispatch({
          type: ADD_CATEGORY,
          payload: res.data,
        });
      });
  };
};

export const editCategory = (category, categoryId) => {
  return (dispatch) => {
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/categories/edit/${categoryId}`,
        category
      )
      .then((res) =>
        dispatch({
          type: EDIT_CATEGORY,
          payload: res.data,
        })
      );
  };
};

export const deleteCategory = (categoryName, categoryId) => {
  return (dispatch, getState) => {
    const products = getProductsByCategory(getState(), categoryName);

    if (!isEmpty(products)) {
      products.forEach((product) => {
        dispatch(deleteProduct(product._id));
      });
    }

    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/categories/delete/${categoryId}`
      )
      .then((res) =>
        dispatch({
          type: DELETE_CATEGORY,
          payload: categoryId,
        })
      );
  };
};
