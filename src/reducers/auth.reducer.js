import {
  IS_ADMIN,
  IS_LOGGED,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/auth.action";

const initialState = { isLogged: false, isAdmin: false };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED:
      return { ...state, isLogged: action.payload };
    case IS_ADMIN:
      return { ...state, isAdmin: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, isLogged: action.payload };
    case LOGOUT:
      return { ...state, isLogged: action.payload };
    default:
      return state;
  }
}
