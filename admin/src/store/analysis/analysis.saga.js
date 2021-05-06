import { takeLatest, call, put, all,select } from "redux-saga/effects";
import AnalysisActionTypes from "./analysis.types";
import axios from "axios";
import { fetchDataError, fetchDataSuccess,fetchSingleProductSuccess,fetchSingleProductError,fetchRelateProductSuccess,fetchSearchSuccess,fetchSearchFailure,resetSingleProduct,fetchOrderSuccess,fetchOrderError,fetchOrderLengthSuccess,changeOrderStatusSuccess, changeOrderStatusFailure,sendMailMarketingFailure, sendMailMarketingSuccess,fetchSupportHistorySuccess,fetchSupportHistoryFailure,sendFeedbackSuccess,sendFeedbackFailure  } from "./analysis.actions";
import {
  firestore
} from "../../firebase/firebase.util";
import {selectPaginationValue,selectProductRelatedTag,selectDisplayOrderData} from './analysis.selectors'
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
export function* fetchOrderHistoryStart() {
  yield takeLatest(
    AnalysisActionTypes.FETCH_ORDER_START,
    fetchOrderHistoryAsync
  );
}
export function* fetchOrderHistoryAsync(){
  try {
    let paginationValue =yield select(selectPaginationValue)
    let perPage = yield select(selectDisplayOrderData)
    const response = yield axios.get(`${process.env.REACT_APP_BASE_URL}/transactions/all/history?page=${paginationValue}&perPage=${perPage}`)
    const orderHistoryLength = yield axios.get(`${process.env.REACT_APP_BASE_URL}/transactions/all/length`)
    yield put(fetchOrderLengthSuccess(orderHistoryLength.data))
    yield put(fetchOrderSuccess(response.data));
  } catch (err) {
    console.log(err)
    yield put(fetchOrderError(err.message));
  }
}
export function* changePerPageDisplayOrder(){
  yield takeLatest(
    AnalysisActionTypes.CHANGE_DISPLAY_ORDER,
    fetchOrderHistoryAsync
  );
}
export function* changePageOrder(){
  yield takeLatest(
    AnalysisActionTypes.PAGINATION_ITEM,
    fetchOrderHistoryAsync
  );
}
export function* changeOrderStatusStart(){
  yield takeLatest(
    AnalysisActionTypes.CHANGE_ORDER_STATUS_START,
    changeOrderStatusAsync
  );
  yield takeLatest(
    AnalysisActionTypes.CHANGE_ORDER_STATUS_START,
    fetchOrderHistoryAsync
  );
}
export function* changeOrderStatusAsync({payload}){
  try {
    console.log(payload)
    yield axios.put(`${process.env.REACT_APP_BASE_URL}/transactions/update?id=${payload._id}`, {"status":payload.status})
    yield payload.product.map((item,index)=>{
       axios.put(`${process.env.REACT_APP_BASE_URL}/products/changeStatus/?id=${item._id}`, {"stock": toString(item.quantity)})
    })
    yield put(changeOrderStatusSuccess());
    yield alert('Update order status successful')
  } catch (err) {
    yield put(changeOrderStatusFailure(err.message));
  }
}
export function* sendMailMarketingStart(){
  yield takeLatest(AnalysisActionTypes.SEND_EMAIL_MARKETING_START, sendMailMarketingAsync)
}
export function* sendMailMarketingAsync({payload}){
  try {
    const response = yield axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    let allUserData = yield response.data.map((user, index)=>{
      const Email={
        to: `${user.email}`,
        message: {
          subject: `Testing`,
          html: `<!DOCTYPE html>
          <html lang="en">
              <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link rel="icon" href="assets/images/favicon/1.png" type="image/x-icon">
                  <link rel="shortcut icon" href="assets/images/favicon/1.png" type="image/x-icon">
                  <title>Multikart | Email template </title>
                  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">
                  <style type="text/css">
                      body{
                        text-align: center;
                        margin: 0 auto;
                        width: 650px;
                        font-family: 'Lato', sans-serif;
                        background-color: #e2e2e2;		      	
                        display: block;
                      }
                      ul{
                        margin:0;
                        padding: 0;
                      }
                      li{
                        display: inline-block;
                        text-decoration: unset;
                      }
                      a{
                        text-decoration: none;
                      }
                      h5{
                        margin:10px;
                        color:#777;
                      }
                      .text-center{
                        text-align: center
                      }
                      .main-bg-light{
                        background-color: #fafafa;
                      }
                      .title{
                        color: #444444;
                        font-size: 22px;
                        font-weight: bold;
                        margin-top: 0px;
                        margin-bottom: 10px;
                        padding-bottom: 0;
                        text-transform: uppercase;
                        display: inline-block;
                        line-height: 1;
                      }
                      .menu{
                      width:100%;
                      }
                      .menu li a{
                        text-transform: capitalize;
                        color:#444;
                        font-size:16px;
                        margin-right:15px
                      }
                      .product-box .product {
                        text-align: center;
                        position: relative;
                    }
                      .product-info {
                        margin-top: 15px;
                      }
                      .product-info h6 {
                        line-height: 1;
                        margin-bottom: 0;
                        padding-bottom: 5px;
                        font-size: 14px;
                        font-family: "Open Sans", sans-serif;
                        color: #777; 
                        margin-top: 0;
                      }
                      .product-info h4 {
                        font-size: 16px;
                        color: #444;
                        font-weight: 700;
                        margin-bottom: 0;
                        margin-top: 5px;
                        padding-bottom: 5px;
                        line-height: 1; 
                      }
                      .footer-social-icon tr td img{
                        margin-left:5px;
                        margin-right:5px;
                      }
                  </style>
              </head>
              <body style="margin: 20px auto;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #fff; -webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="slider" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                          <th align="center"width="40%"><img src="https://picsum.photos/500/600" alt="" style="margin-bottom: -5px;"></td>
                                          <th width="60%" style="background-color: #11bfff;padding: 30px;">
                                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tr>
                                                      <td style="color:#ffffff;font-size: 16px;line-height:20px;text-transform:uppercase;text-align:left;padding-bottom: 5px;">New Product</td>
                                                  </tr>
                                                  <tr>
                                                      <td class="h2-white left pb20" style="color:#ffffff; font-family: 'Roboto', sans-serif; font-size:52px; line-height:58px; text-transform:uppercase; font-weight:bold; text-align:left; padding-bottom:20px;">new <br>Product</td>
                                                  </tr>
                                                  <tr>
                                                      <td style=""><p style="font-size:13px;color:#4e54cb;text-align:left;color:#fff;">We are committed to your satisfaction with every order.</p></td>
                                                  </tr>
                                              </table>
                                              <table>
                                                  <tr >
                                                      <td class="text-button white-button" style="font-size:14px; line-height:18px; text-align:center; text-transform:uppercase; padding:10px; background:#ffffff; color:#f54084; font-weight:bold;"><a href="https://thanhchishop.com" target="_blan" style="color:#4e54cb; text-decoration:none;"><span style="color:#f1415e; text-decoration:none;">shop now</span></a></td>
                                                  </tr>
                                              </table>
                                          </th>
                                      </tr>
                                  </table>
                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:30px;">
                                      <thead>
                                          <tr>
                                              <h4 class="title" style="width: 100%; text-align:center;margin-top: 50px;">GET EVEN 25% OFF DISCOUNT</h4>
                                          </tr>
                                          <tr>${payload}</tr>
                                      </thead>
                                  </table>
                                  <table class="main-bg-light text-center"  align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:30px;">
                                      <tr>
                                          <td style="padding: 30px;">
                                              <div style="border-top: 1px solid #ddd; margin: 20px auto 0;"></div>
                                              <table  border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px auto 0;" >
                                                  <tr>
                                                      <td>
                                                          <a href="#" style="font-size:13px">Want to change how you receive these emails?</a>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          <p style="font-size:13px; margin:0;">2020 - 21 Copy Right by Pham Thanh Chi -GCS19059</p>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          <a href="#" style="font-size:13px; margin:0;text-decoration: underline;">Unsubscribe</a>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </body>
          </html>`,
        },
      }
      return user.email!==undefined? firestore.collection("mail").add(Email).then(() => console.log("Queued email for delivery!")):null
    })
    yield put(sendMailMarketingSuccess())
    yield alert('Send Mail Success')
  } catch (error) {
    yield alert('Send Mail Error')
   yield put(sendMailMarketingSuccess())
  }
}
export function* fetchSupportHistoryStart(){
  yield takeLatest(AnalysisActionTypes.FETCH_SUPPORT_START, fetchSupportHistoryAsync)
}
export function* fetchSupportHistoryAsync(){
  try {
    const response = yield axios.get(`${process.env.REACT_APP_BASE_URL}/contact_us`)
    yield put(fetchSupportHistorySuccess(response.data))
  } catch (error) {
    yield put(fetchSupportHistoryFailure(error))
}
}
export function* sendFeedbackStart(){
  yield takeLatest(AnalysisActionTypes.FEEDBACK_SEND_START, sendFeedbackAsync)
  yield takeLatest(AnalysisActionTypes.FEEDBACK_SEND_SUCCESS, fetchSupportHistoryAsync)
}
export function* sendFeedbackAsync({payload}){
  try {
    console.log(payload[0])
    const response = yield axios.put(`${process.env.REACT_APP_BASE_URL}/contact_us?id=${payload[0]._id}`, payload[0])
       const Email={
        to: `${payload[0].email}`,
        message: {
          subject: `${payload[1].title}`,
          html: `<p>${payload[1].message}<p>`,
        },
      }
      yield payload[0].email!==undefined? firestore.collection("mail").add(Email).then(() => console.log("Queued email for delivery!")):null
      yield put(sendFeedbackSuccess())
      yield alert('Success')
  } catch (error) {
    yield put(sendFeedbackFailure(error))
  }
}
export function* analysisSagas() {
  yield all([call(fetchDataStart),call(changePerPageDisplayOrder),call(fetchOrderHistoryStart), call(fetchSingleProductStart),call(changePageOrder), call(fetchSearchDataStart),call(changeOrderStatusStart),call(sendMailMarketingStart), call(fetchSupportHistoryStart), call(sendFeedbackStart)]);
}
