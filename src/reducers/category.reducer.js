import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES,
} from "../actions/category.action";

const initialState = {};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    case ADD_CATEGORY:
      return [...state, action.payload];
    case EDIT_CATEGORY:
      const editCategory = action.payload;
      return state.map((category) => {
        if (category.id === action.payload.id) {
          return editCategory;
        } else return category;
      });
    case DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.payload);

    default:
      return state;
  }
}
