import axios from "axios";
import Cookies from "js-cookie";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const IS_LOGGED = "IS_LOGGED";
export const IS_ADMIN = "IS_ADMIN";

export const isLogged = () => async (dispatch) => {
  if (Cookies.get("jwt")) {
    await axios.get("http://localhost:5000/users/get").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const user = res.data[i];
        if (Cookies.get("jwt") === user.pass) {
          dispatch({ type: IS_LOGGED, payload: true });
        }
      }
    });
  } else {
    dispatch({ type: IS_LOGGED, payload: false });
  }
};

export const isAdmin = () => async (dispatch) => {
  const jwt = Cookies.get("jwt");

  if (jwt) {
    await axios.get("http://localhost:5000/users/get").then((res) => {
      const adminUser = res.data.find(
        (user) => user.pass === jwt && user.grade === "admin"
      );

      if (adminUser) {
        dispatch({ type: IS_ADMIN, payload: true });
      } else {
        dispatch({ type: IS_ADMIN, payload: false });
      }
    });
  } else {
    dispatch({ type: IS_ADMIN, payload: false });
  }
};

export const login = (password) => async (dispatch) => {
  await axios.get("http://localhost:5000/users/get").then((res) => {
    const authenticatedUser = res.data.find((user) => user.pass === password);
    if (authenticatedUser) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: true,
      });
      Cookies.set("jwt", password, { expires: 1 });
    }
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: false,
  });
  Cookies.remove("jwt");
};
