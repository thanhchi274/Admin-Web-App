import { takeLatest, call, put, all,select } from "redux-saga/effects";
import ShopActionTypes from "./product.types";
import axios from "axios";
import _ from "lodash"
import { fetchDataError, fetchDataSuccess,fetchSingleProductSuccess,fetchSingleProductError,fetchRelateProductSuccess,fetchSearchSuccess,fetchSearchFailure,resetSingleProduct, editProductSuccess, editProductError} from "./product.actions";
import {selectPaginationValue,selectProductRelatedTag} from './product.selectors'
import {
  firestore,
  cloudStorage
} from "../../firebase/firebase.util";
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
export function* editProductStart(){
yield takeLatest(ShopActionTypes.EDIT_PRODUCT_START, editProductAsync)
}
export function* editProductAsync({payload}){
try {
  if(!payload.files){
    yield axios.put(`${process.env.REACT_APP_BASE_URL}/products/updateProduct/?id=${payload.product._id}`, payload.product)
  }
  else{
    if(payload.files.length===1){
      yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[0].name}`).put(payload.files[0])
      const itemDownload = yield cloudStorage.ref(`/Product_Images`).child(`Photo ${payload.files[0].name}`)
      const itemUrl = yield itemDownload.getDownloadURL().then(url=>url)
      yield window.location.reload()
    }
    // if(payload.files.length===4){
    //   yield cloudStorage.ref(`/upload_document/${files[2].Faulty}`).child(`${currentUser.email}`).child(files[0].name).put(files[0])
    //   yield cloudStorage.ref(`/upload_document/${files[2].Faulty}`).child(`${currentUser.email}`).child(files[1].name).put(files[1])
    //   const itemDownload1 = yield cloudStorage.ref(`/upload_document/${files[2].Faulty}`).child(`${currentUser.email}`).child(files[0].name)
    //   const itemDownload2 = yield cloudStorage.ref(`/upload_document/${files[2].Faulty}`).child(`${currentUser.email}`).child(files[1].name)
    //   const itemUrl1 = yield itemDownload1.getDownloadURL().then(url=>url)
    //   const itemUrl2 = yield itemDownload2.getDownloadURL().then(url=>url)
    //   let userUploadData = {
    //     id:currentUser.id,
    //     link:itemUrl1,
    //     link2:itemUrl2,
    //     createAt:toString(timeNow),
    //     status:"Submitted",
    //     end:files[2].End,
    //     faulty:files[2].Faulty,
    //     start:files[2].Start,
    //     form:files[3].dateChoose,
    //     email:currentUser.email
    //   }
    //   yield firestore.collection('magazinePost').where('id','==', currentUser.id).where('faulty','==',files[2].Faulty).where('form','==',files[3].dateChoose).get().then((querySnapshot)=>  querySnapshot.forEach((doc) => {
    //     return populateData({...doc.data(),"keyID":doc.id})
    //     }))
    //     if(existsData.length>0){
    //       yield firestore.collection('magazinePost').doc(`${existsData[0].keyID}`).update(userUploadData)
    //     }
    //     else{
    //       yield firestore.collection('magazinePost').add(userUploadData);
    //     }
    //   yield firestore.collection('downloadLink').add({"link":itemUrl1,"name":files[0].name})
    //   yield firestore.collection('downloadLink').add({"link":itemUrl2,"name":files[1].name})
    //   yield firestore.collection("mail").add(Email)
    //   .then(() => console.log("Queued email for delivery!"));
    //   yield alert('Success Upload')
    //   yield put(uploadDataSuccess())
    //   yield existsData=[]
    //   yield window.location.reload()
    // }
  }
  yield put(editProductSuccess())
  yield alert('Update Successfully')
  yield window.location.reload()
} catch (error) {
  yield alert('Update Failed')
  yield put(editProductError(error))
}
}
export function* productSagas() {
  yield all([call(fetchDataStart), call(editProductStart), call(fetchSingleProductStart), call(fetchSearchDataStart)]);
}
