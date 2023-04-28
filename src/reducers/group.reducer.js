import {
  ADD_GROUP,
  DELETE_GROUP,
  EDIT_GROUP,
  GET_GROUPS,
} from "../actions/group.action";

const initialState = {};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload;
    case ADD_GROUP:
      return [...state, action.payload];
    case EDIT_GROUP:
      const editGroup = action.payload;
      return state.map((group) => {
        if (group.id === action.payload.id) {
          return editGroup;
        } else return group;
      });
    case DELETE_GROUP:
      return state.filter((group) => group.id !== action.payload);

    default:
      return state;
  }
}
