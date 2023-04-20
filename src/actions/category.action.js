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
    axios.get("http://localhost:5000/categories/get").then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    });
  };
};

export const addCategory = (category) => {
  return (dispatch) => {
    axios.post("http://localhost:5000/categories/add", category).then((res) => {
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
      .put(`http://localhost:5000/categories/edit/${categoryId}`, category)
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
      .delete(`http://localhost:5000/categories/delete/${categoryId}`)
      .then((res) =>
        dispatch({
          type: DELETE_CATEGORY,
          payload: categoryId,
        })
      );
  };
};
