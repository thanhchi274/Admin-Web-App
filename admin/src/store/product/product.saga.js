import { takeLatest, call, put, all,select } from "redux-saga/effects";
import ShopActionTypes from "./product.types";
import axios from "axios";
import _ from "lodash"
import { fetchDataError, fetchDataSuccess,fetchSingleProductSuccess,fetchSingleProductError,fetchRelateProductSuccess,fetchSearchSuccess,fetchSearchFailure,resetSingleProduct } from "./product.actions";
import {selectPaginationValue,selectProductRelatedTag} from './product.selectors'
let lst1 = []
let populateData2 = data => {
  lst1.push(data);
};
let searchArr = []
let populateSearch = data=>{
  searchArr.push(data);
}
export function* fetchSearchAsync(props){
  try {
    yield  axios.get(`${process.env.REACT_APP_BASE_URL}/products/search?searchText=${props.payload}`).then(res=> populateSearch(res.data));
    yield put(fetchSearchSuccess(searchArr));
    yield searchArr=[]
  } catch (err) {
    yield put(fetchSearchFailure(err.message));
  }
}
export function* fetchDataAsync() {
  try {
    let paginationValue =yield select(selectPaginationValue)
    yield axios.get(`${process.env.REACT_APP_BASE_URL}/products/?page=${paginationValue}`).then(res=> populateData2(res.data));
    yield put(fetchDataSuccess(lst1));
    lst1=[]
  } catch (err) {
    yield put(fetchDataError(err.message));
  }
}
export function* fetchSingleProductAsync({productId}) {
  let singleProductData = []
  let relatedProductData = []
  try {
    yield axios.get(`${process.env.REACT_APP_BASE_URL}/products/item/?id=${productId}`).then(res =>  singleProductData.push(res.data))
    yield console.log(singleProductData)
    yield put(fetchSingleProductSuccess(singleProductData));
    let relatedTag =yield select(selectProductRelatedTag)
    console.log(relatedTag)
    yield axios.get(`${process.env.REACT_APP_BASE_URL}/products/related_product?tag=${relatedTag}`).then(res => relatedProductData.push(res.data));
    yield put(fetchRelateProductSuccess(relatedProductData[0]));
  } catch (err) {
    yield put(fetchSingleProductError(err.message));
  }
}
export function* fetchDataStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_DATA_START,
    fetchDataAsync
  );
}
export function* fetchSingleProductStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_SINGLE_PRODUCT,
    fetchSingleProductAsync
  )
}
export function* fetchSearchDataStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_SEARCH,
    fetchSearchAsync
  );
}
export function* productSagas() {
  yield all([call(fetchDataStart), call(fetchSingleProductStart), call(fetchSearchDataStart)]);
}
