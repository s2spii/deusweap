import { GET_CATEGORIES } from "../actions/category.action";

const initialState = {};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
}
