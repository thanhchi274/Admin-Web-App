import { takeLatest, call, put, all,select } from "redux-saga/effects";
import AnalysisActionTypes from "./analysis.types";
import axios from "axios";
import { fetchDataError, fetchDataSuccess,fetchSingleProductSuccess,fetchSingleProductError,fetchRelateProductSuccess,fetchSearchSuccess,fetchSearchFailure,resetSingleProduct } from "./analysis.actions";
import {selectPaginationValue,selectProductRelatedTag} from './analysis.selectors'
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
    const response = yield axios.get(`${process.env.REACT_APP_BASE_URL}/transactions/?page=${paginationValue}`)
    yield put(fetchDataSuccess(response.data));
  } catch (err) {
    yield put(fetchDataError(err.message));
  }
}
export function* fetchSingleProductAsync({productId}) {
  let singleProductData = []
  let relatedProductData = []
  try {
    yield axios.get(`${process.env.REACT_APP_BASE_URL}/products/item/?id=${productId}`).then(res =>  singleProductData.push(res.data))
    yield put(fetchSingleProductSuccess(singleProductData));
    let relatedTag =yield select(selectProductRelatedTag)
    yield axios.get(`${process.env.REACT_APP_BASE_URL}/products/related_product?tag=${relatedTag}`).then(res => relatedProductData.push(res.data));
    yield put(fetchRelateProductSuccess(relatedProductData[0]));
  } catch (err) {
    yield put(fetchSingleProductError(err.message));
  }
}
export function* fetchDataStart() {
  yield takeLatest(
    AnalysisActionTypes.FETCH_ANALYSE_DATA_START,
    fetchDataAsync
  );
}
export function* fetchSingleProductStart() {
  yield takeLatest(
    AnalysisActionTypes.FETCH_SINGLE_PRODUCT,
    fetchSingleProductAsync
  )
}
export function* fetchSearchDataStart() {
  yield takeLatest(
    AnalysisActionTypes.FETCH_SEARCH,
    fetchSearchAsync
  );
}
export function* analysisSagas() {
  yield all([call(fetchDataStart), call(fetchSingleProductStart), call(fetchSearchDataStart)]);
}
