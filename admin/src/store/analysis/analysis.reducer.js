
import  AnalysisActionTypes from './analysis.types'
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
    case AnalysisActionTypes.FETCH_RELATE_PRODUCT:
    case AnalysisActionTypes.FETCH_SINGLE_PRODUCT:
    case AnalysisActionTypes.FETCH_ANALYSE_DATA_START:
    return {
      ...state,
      isFetching: true
    }
    case AnalysisActionTypes.FETCH_ANALYSE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data:action.payload,
      }
      case AnalysisActionTypes.RESET_SINGLE_PRODUCT:
        return {
          ...state,
          isFetching:false,
          singleProduct: action.payload
        }
      case AnalysisActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          isFetching:false,
          singleProduct: action.payload
        }
      case AnalysisActionTypes.FETCH_RELATE_PRODUCT_SUCCESS:
        return {
          ...state,
          relatedProduct:action.payload
        }
      case AnalysisActionTypes.FETCH_SEARCH_SUCCESS:
        return {
          ...state,
          searchData:action.payload
        }
    case AnalysisActionTypes.FETCH_RELATE_PRODUCT_FAILURE:
    case AnalysisActionTypes.FETCH_SINGLE_PRODUCT_FAILURE:
    case AnalysisActionTypes.FETCH_ANALYSE_DATA_FAILURE:
    case AnalysisActionTypes.FETCH_SEARCH_FAILURE:
      return{
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    case AnalysisActionTypes.PAGINATION_ITEM:
      return {
        ...state,
        paginationItem:action.paginationValue
      }
    default:
      return state;
  }
};
export default shopReducer;
