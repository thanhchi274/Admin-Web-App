import FILTER_ACTION_TYPES from "./filter.type.js";
const INITIAL_STATE = {
  brand: [],
  value: { min:1 , max: 10000000 },
  sortBy: "",
};
const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_ACTION_TYPES.FILTER_BRAND:
      return {
        ...state,
        brand: action.brand,
      };
    case FILTER_ACTION_TYPES.FILTER_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case FILTER_ACTION_TYPES.FILTER_PRICE:
      return {
        ...state,
        value: { min: action.price.min, max: action.price.max },
      };
    case FILTER_ACTION_TYPES.SORT_BY:
      return {
        ...state,
        sortBy: action.sort_by,
      };
    default:
      return state;
  }
};
export default filterReducer;
