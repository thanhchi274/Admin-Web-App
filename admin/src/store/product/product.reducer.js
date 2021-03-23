
import  ShopActionTypes from './product.types'
const INITIAL_STATE = {
  isFetching: true,
  errorMessage: undefined,
  data:null,
  singleProduct:null,
  symbol:'$',
  paginationItem:1,
  searchData:null,
  relatedProduct:null
};
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_RELATE_PRODUCT:
    case ShopActionTypes.FETCH_SINGLE_PRODUCT:
    case ShopActionTypes.FETCH_DATA_START:
    return {
      ...state,
      isFetching: true
    }
    case ShopActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data:action.payload,
      }
      case ShopActionTypes.RESET_SINGLE_PRODUCT:
        return {
          ...state,
          isFetching:false,
          singleProduct: action.payload
        }
      case ShopActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          isFetching:false,
          singleProduct: action.payload
        }
      case ShopActionTypes.FETCH_RELATE_PRODUCT_SUCCESS:
        return {
          ...state,
          relatedProduct:action.payload
        }
      case ShopActionTypes.FETCH_SEARCH_SUCCESS:
        return {
          ...state,
          searchData:action.payload
        }
    case ShopActionTypes.FETCH_RELATE_PRODUCT_FAILURE:
    case ShopActionTypes.FETCH_SINGLE_PRODUCT_FAILURE:
    case ShopActionTypes.FETCH_DATA_FAILURE:
    case ShopActionTypes.FETCH_SEARCH_FAILURE:
      return{
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case ShopActionTypes.PAGINATION_ITEM:
      return {
        ...state,
        paginationItem:action.paginationValue
      }
    default:
      return state;
  }
};
export default shopReducer;
