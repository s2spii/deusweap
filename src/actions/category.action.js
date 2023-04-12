import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";

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
