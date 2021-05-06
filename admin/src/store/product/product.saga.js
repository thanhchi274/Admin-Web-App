import { takeLatest, call, put, all,select } from "redux-saga/effects";
import ShopActionTypes from "./product.types";
import axios from "axios";
import _ from "lodash"
import { fetchDataError, fetchDataSuccess,fetchSingleProductSuccess,fetchSingleProductError,fetchRelateProductSuccess,fetchSearchSuccess,fetchSearchFailure,resetSingleProduct, editProductSuccess, editProductError,addProductSuccess,addProductFailure,hideProductSuccess,hideProductFailure,deleteProductFailure,deleteProductSuccess} from "./product.actions";
import {selectPaginationValue,selectProductRelatedTag} from './product.selectors'
import {
  cloudStorage
} from "../../firebase/firebase.util";
let lst1 = []
let populateData2 = data => {
  lst1.push(data);
};
let searchArr = []
let oldImagesArr = []
let variants = []
let newProductVariantsArr = []
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
    console.log(paginationValue)
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
    ShopActionTypes.FETCH_DATA_START,
    fetchDataAsync
  );
}
export function* changePagePagination(){
  yield takeLatest(
    ShopActionTypes.PAGINATION_ITEM_SHOP,
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
export function* addProductStart(){
  yield takeLatest(ShopActionTypes.ADD_PRODUCT_START, addProductAsync)
}
export function* addProductAsync({payload,files}){
  try {
    if(!payload.files){
      yield axios.post(`${process.env.REACT_APP_BASE_URL}/products/create_product`, payload.product)
      yield put(addProductSuccess())
      yield alert('Update Successfully')
      yield window.location.reload()
    }
    else{
        let file0 = yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[0].name}`).put(payload.files[0])
        let file1 =payload.files[1]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[1].name}`).put(payload.files[2]):null
        let file2 =payload.files[2]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[2].name}`).put(payload.files[2]):null
        let file3 =payload.files[3]?yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[3].name}`).put(payload.files[3]):null
        const itemDownload0 = yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[0].name}`)
        const itemDownload1 =payload.files[1]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[1].name}`):null
        const itemDownload2 =payload.files[2]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[2].name}`):null
        const itemDownload3 =payload.files[3]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[3].name}`):null
        const itemUrl0 = yield itemDownload0.getDownloadURL().then(url=>url)
        const itemUrl1 =payload.files[1]? yield itemDownload1.getDownloadURL().then(url=>url):null
        const itemUrl2 =payload.files[2]? yield itemDownload2.getDownloadURL().then(url=>url):null
        const itemUrl3 =payload.files[3]? yield itemDownload3.getDownloadURL().then(url=>url):null
        let currentItem0 ={"images":itemUrl0}
        let currentItem1 =itemUrl1?{"images":itemUrl1}:null
        let currentItem2 =itemUrl2?{"images":itemUrl2}:null
        let currentItem3 =itemUrl3?{"images":itemUrl3}:null
        yield newProductVariantsArr.push(currentItem0)
        yield currentItem1!==null?newProductVariantsArr.push(currentItem1):null
        yield currentItem2!==null?newProductVariantsArr.push(currentItem2):null
        yield currentItem3!==null?newProductVariantsArr.push(currentItem3):null
        let newProduct ={...payload.newProduct,"variants":newProductVariantsArr}
        yield axios.post(`${process.env.REACT_APP_BASE_URL}/products/create_product`, newProduct)
        // yield put(addProductSuccess())
        // yield alert('Update Successfully')
        // yield window.location.reload()
    }
  } catch (error) {
    yield alert('Update Failed')
    yield put(addProductFailure(error))
  }
  }
export function* editProductStart(){
yield takeLatest(ShopActionTypes.EDIT_PRODUCT_START, editProductAsync)
}
export function* editProductAsync({payload,files}){
try {
  if(!payload.files){
    yield axios.put(`${process.env.REACT_APP_BASE_URL}/products/updateProduct/?id=${payload.product._id}`, payload.product)
    yield put(editProductSuccess())
    yield alert('Update Successfully')
    yield window.location.reload()
  }
  else{
      let file0 = yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[0].name}`).put(payload.files[0])
      let file1 =payload.files[1]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[1].name}`).put(payload.files[2]):null
      let file2 =payload.files[2]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[2].name}`).put(payload.files[2]):null
      let file3 =payload.files[3]?yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[3].name}`).put(payload.files[3]):null
      const itemDownload0 = yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[0].name}`)
      const itemDownload1 =payload.files[1]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[1].name}`):null
      const itemDownload2 =payload.files[2]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[2].name}`):null
      const itemDownload3 =payload.files[3]? yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[3].name}`):null
      const itemUrl0 = yield itemDownload0.getDownloadURL().then(url=>url)
      const itemUrl1 =payload.files[1]? yield itemDownload1.getDownloadURL().then(url=>url):null
      const itemUrl2 =payload.files[2]? yield itemDownload2.getDownloadURL().then(url=>url):null
      const itemUrl3 =payload.files[3]? yield itemDownload3.getDownloadURL().then(url=>url):null
      yield payload.product.variants.map((item,index)=>oldImagesArr.push(decodeURI(item.images).slice(89,-53)))
      yield oldImagesArr!==[]?oldImagesArr.map((item,index)=>{
        cloudStorage.ref(`/Product_Images`).child(item).delete().then((res) => {
        }).catch((error) => {
          console.log('success')
        });
      }):null
      let currentItem0 ={"images":itemUrl0}
      let currentItem1 =itemUrl1?{"images":itemUrl1}:null
      let currentItem2 =itemUrl2?{"images":itemUrl2}:null
      let currentItem3 =itemUrl3?{"images":itemUrl3}:null
      yield payload.product.variants ===[]
      yield variants.push(currentItem0)
      yield currentItem1!==null?variants.push(currentItem1):null
      yield currentItem2!==null?variants.push(currentItem2):null
      yield currentItem3!==null?variants.push(currentItem3):null
      let newProduct ={...payload.product,variants}
      yield axios.put(`${process.env.REACT_APP_BASE_URL}/products/updateProduct/?id=${payload.product._id}`, newProduct)
      yield put(editProductSuccess())
      yield alert('Update Successfully')
      yield window.location.reload()
  }
} catch (error) {
  yield alert('Update Failed')
  yield put(editProductError(error))
}
}

export function* hideProductStart(){
  yield takeLatest(ShopActionTypes.HIDE_PRODUCT_START, hideProductAsync)
  }
  export function* hideProductAsync({payload}){
    try {
    yield axios.put(`${process.env.REACT_APP_BASE_URL}/products/updateProduct/?id=${payload._id}`,{"stock":"0"})
      yield put(hideProductSuccess())
      yield alert('Hide Product Successfully')
    } catch (error) {
     yield put(hideProductFailure())
    }
}
export function* removeProductStart(){
  yield takeLatest(ShopActionTypes.REMOVE_PRODUCT_START, removeProductAsync)
}
export function* removeProductAsync({payload}){
  try {
    yield axios.put(`${process.env.REACT_APP_BASE_URL}/products/delete_item/?id=${payload._id}`)
    yield put(deleteProductSuccess())
  } catch (error) {
    yield put(deleteProductFailure())
  }
}
export function* productSagas() {
  yield all([call(fetchDataStart), call(editProductStart), call(fetchSingleProductStart), call(fetchSearchDataStart), call(changePagePagination), call(addProductStart), call(hideProductStart),removeProductStart]);
}
