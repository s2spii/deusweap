import axios from "axios";
import Cookies from "js-cookie";

export const GET_USERS = "GET_USERS";
export const LOGGED_USER = "LOGGED_USER";

export const getUsers = () => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/get`).then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    );
  };
};

export const getLoggedUser = () => {
  return (dispatch) => {
    const token = Cookies.get("jwt");

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/get`).then((res) => {
      const users = res.data;

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.pass === token) {
          const infos = {
            name: user.name,
            pass: user.pass,
            id: user._id,
          };

          dispatch({
            type: LOGGED_USER,
            payload: infos,
          });
        }
      }
    });
  };
};
