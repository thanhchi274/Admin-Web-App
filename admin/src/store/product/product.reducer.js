import ShopActionTypes from "./product.types";
const INITIAL_STATE = {
  isFetching: true,
  errorMessage: undefined,
  data: null,
  singleProduct: null,
  symbol: "$",
  pagination: 1,
  searchData: null,
  relatedProduct: null,
};
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_RELATE_PRODUCT:
    case ShopActionTypes.FETCH_SINGLE_PRODUCT:
    case ShopActionTypes.FETCH_DATA_START:
    case ShopActionTypes.EDIT_PRODUCT_START:
    case ShopActionTypes.ADD_PRODUCT_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case ShopActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
      };
    case ShopActionTypes.RESET_SINGLE_PRODUCT:
      return {
        ...state,
        isFetching: false,
        singleProduct: action.payload,
      };
    case ShopActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        singleProduct: action.payload,
      };
    case ShopActionTypes.FETCH_RELATE_PRODUCT_SUCCESS:
      return {
        ...state,
        relatedProduct: action.payload,
      };
    case ShopActionTypes.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchData: action.payload,
      };
    case ShopActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
      };
    case ShopActionTypes.FETCH_RELATE_PRODUCT_FAILURE:
    case ShopActionTypes.FETCH_SINGLE_PRODUCT_FAILURE:
    case ShopActionTypes.FETCH_DATA_FAILURE:
    case ShopActionTypes.FETCH_SEARCH_FAILURE:
    case ShopActionTypes.ADD_PRODUCT_FAILURE:
    case ShopActionTypes.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case ShopActionTypes.PAGINATION_ITEM_SHOP:
      return {
        ...state,
        pagination: action.pagination,
      };
    default:
      return state;
  }
};
export default shopReducer;
