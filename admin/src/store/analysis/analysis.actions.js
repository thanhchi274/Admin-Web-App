import AnalysisActionTypes from "./analysis.types";
export const fetchSearchSuccess = data =>({
  type:AnalysisActionTypes.FETCH_SEARCH_SUCCESS,
  payload:data
})
export const fetchSearchFailure = data =>({
  type:AnalysisActionTypes.FETCH_SEARCH_FAILURE,
  payload:data
})
export const fetchSearchStart = data=>({
  type:AnalysisActionTypes.FETCH_SEARCH,
  payload:data
})
export const fetchDataStart =()=>({
  type: AnalysisActionTypes.FETCH_ANALYSE_DATA_START
})
export const fetchDataSuccess = data=>({
  type: AnalysisActionTypes.FETCH_ANALYSE_DATA_SUCCESS,
  payload: data
})
export const fetchDataError = error => ({
  type: AnalysisActionTypes.FETCH_ANALYSE_DATA_FAILURE,
  payload: error,
});
export const fetchSingleProductStart =(value)=>({
  type:AnalysisActionTypes.FETCH_SINGLE_PRODUCT,
  productId:value
})
export const changePaginationValue = (value)=>({
  type: AnalysisActionTypes.PAGINATION_ITEM,
  paginationValue:value
})
export const fetchSingleProductSuccess = data=>({
  type: AnalysisActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: data
})
export const resetSingleProduct = data=>({
  type: AnalysisActionTypes.RESET_SINGLE_PRODUCT,
  payload: data
})
export const fetchSingleProductError = error => ({
  type: AnalysisActionTypes.FETCH_SINGLE_PRODUCT_FAILURE,
  payload: error,
});
export const fetchRelatedProduct =()=>({
  type: AnalysisActionTypes.FETCH_RELATE_PRODUCT
})
export const fetchRelateProductSuccess = data=>({
  type: AnalysisActionTypes.FETCH_RELATE_PRODUCT_SUCCESS,
  payload: data
})
export const fetchRelateProductError = error => ({
  type: AnalysisActionTypes.FETCH_RELATE_PRODUCT_FAILURE,
  payload: error,
});
