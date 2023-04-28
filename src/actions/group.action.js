import axios from "axios";

export const GET_GROUPS = "GET_GROUPS";
export const ADD_GROUP = "ADD_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";

export const getGroups = () => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/get`).then((res) => {
      dispatch({
        type: GET_GROUPS,
        payload: res.data,
      });
    });
  };
};

export const addGroup = (group) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/set`, group)
      .then((res) => {
        dispatch({
          type: ADD_GROUP,
          payload: res.data,
        });
      });
  };
};

export const editGroups = (group, groupId) => {
  return (dispatch) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/users/edit/${groupId}`, group)
      .then((res) =>
        dispatch({
          type: EDIT_GROUP,
          payload: res.data,
        })
      );
  };
};

export const deleteGroup = (groupId) => {
  return (dispatch) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/users/delete/${groupId}`)
      .then((res) =>
        dispatch({
          type: DELETE_GROUP,
          payload: groupId,
        })
      );
  };
};
