import ShopActionTypes from "./product.types";
export const fetchSearchSuccess = data =>({
  type:ShopActionTypes.FETCH_SEARCH_SUCCESS,
  payload:data
})
export const fetchSearchFailure = data =>({
  type:ShopActionTypes.FETCH_SEARCH_FAILURE,
  payload:data
})
export const fetchSearchStart = data=>({
  type:ShopActionTypes.FETCH_SEARCH,
  payload:data
})
export const fetchDataStart =()=>({
  type: ShopActionTypes.FETCH_DATA_START
})
export const fetchDataSuccess = data=>({
  type: ShopActionTypes.FETCH_DATA_SUCCESS,
  payload: data
})
export const fetchDataError = error => ({
  type: ShopActionTypes.FETCH_DATA_FAILURE,
  payload: error,
});
export const fetchSingleProductStart =(value)=>({
  type:ShopActionTypes.FETCH_SINGLE_PRODUCT,
  productId:value
})
export const changePaginationValue = (value)=>({
  type: ShopActionTypes.PAGINATION_ITEM,
  paginationValue:value
})
export const fetchSingleProductSuccess = data=>({
  type: ShopActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: data
})
export const resetSingleProduct = data=>({
  type: ShopActionTypes.RESET_SINGLE_PRODUCT,
  payload: data
})
export const fetchSingleProductError = error => ({
  type: ShopActionTypes.FETCH_SINGLE_PRODUCT_FAILURE,
  payload: error,
});
export const fetchRelatedProduct =()=>({
  type: ShopActionTypes.FETCH_RELATE_PRODUCT
})
export const fetchRelateProductSuccess = data=>({
  type: ShopActionTypes.FETCH_RELATE_PRODUCT_SUCCESS,
  payload: data
})
export const fetchRelateProductError = error => ({
  type: ShopActionTypes.FETCH_RELATE_PRODUCT_FAILURE,
  payload: error,
});
