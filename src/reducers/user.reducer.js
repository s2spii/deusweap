import { GET_USERS, LOGGED_USER } from "../actions/user.action";

const initialState = {
  users: [],
  isAdmin: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LOGGED_USER:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
