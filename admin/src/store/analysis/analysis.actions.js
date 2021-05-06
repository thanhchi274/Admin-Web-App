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
export const fetchOrderStart =()=>({
  type: AnalysisActionTypes.FETCH_ORDER_START
})
export const fetchOrderSuccess = data=>({
  type: AnalysisActionTypes.FETCH_ORDER_SUCCESS,
  payload: data
})
export const fetchOrderLengthSuccess = data=>({
  type:AnalysisActionTypes.FETCH_ORDER_LENGTH_SUCCESS,
  payload: data
})
export const fetchOrderError = error => ({
  type: AnalysisActionTypes.FETCH_ORDER_SUCCESS,
  payload: error,
});
export const changeDisplayOrderList = (data)=>({
  type: AnalysisActionTypes.CHANGE_DISPLAY_ORDER,
  payload: data
})
export const changeOrderStatusStart = (data)=>({
  type:AnalysisActionTypes.CHANGE_ORDER_STATUS_START,
  payload:data
})
export const changeOrderStatusSuccess = data=>({
  type:AnalysisActionTypes.CHANGE_ORDER_STATUS_SUCCESS,
  payload: data
})
export const changeOrderStatusFailure = error => ({
  type: AnalysisActionTypes.CHANGE_ORDER_STATUS_FAILURE,
  payload: error,
});
export const sendMailMarketingStart = (data)=>({
  type: AnalysisActionTypes.SEND_EMAIL_MARKETING_START,
  payload: data
})
export const sendMailMarketingSuccess = (data)=>({
  type: AnalysisActionTypes.SEND_EMAIL_MARKETING_SUCCESS
})
export const sendMailMarketingFailure = (error)=>({
  type: AnalysisActionTypes.SEND_EMAIL_MARKETING_FAILURE,
  payload:error
})
export const fetchSupportHistoryStart = (data)=>({
  type: AnalysisActionTypes.FETCH_SUPPORT_START,
  payload: data
})
export const fetchSupportHistorySuccess = (data)=>({
  type: AnalysisActionTypes.FETCH_SUPPORT_SUCCESS,
  payload:data
})
export const fetchSupportHistoryFailure = (error)=>({
  type: AnalysisActionTypes.FETCH_SUPPORT_FAILURE,
  payload:error
})
export const sendFeedbackStart = (data)=>({
  type: AnalysisActionTypes.FEEDBACK_SEND_START,
  payload: data
})
export const sendFeedbackSuccess = (data)=>({
  type: AnalysisActionTypes.FEEDBACK_SEND_SUCCESS,
  payload:data
})
export const sendFeedbackFailure = (error)=>({
  type: AnalysisActionTypes.FEEDBACK_SEND_FAILURE,
  payload:error
})