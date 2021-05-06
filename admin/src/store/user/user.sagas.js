import { takeLatest, all, call, put,select } from "redux-saga/effects";
import UserActionTypes from "./user.type";
import { getUserExtraRef, cloudStorage, firestore } from '../../firebase/firebase.util';
import { selectCurrentUser } from '../user/user.selector';
// import {selectSingleProduct} from '../shop/shop.selectors'
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.util";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure, updateUserSuccess, updateUserFailure, setExtraDataUserInFirebase,fetchHistoryPaymentSuccess,fetchHistoryPaymentFailed } from "./user.action";
import axios from "axios";
import { toast } from "material-react-toastify";
import _ from 'lodash'

export function* getSnapshotFromAuth(userAuth,additionalData) {
  try {
    let userRole = []
    let populateData = data=>{
      userRole.push(data);
    }
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapShot = yield userRef.get();
    const providerData = [...userAuth.providerData]
    let userEmail = userSnapShot.data().email
    yield firestore.collection('valid_data').where('email','==',userEmail).get().then((querySnapshot) =>
    {
      return querySnapshot.forEach((doc) => { return populateData(doc.data())
    });
  })
    if(userRole.length>0){
      yield localStorage.setItem("user",userSnapShot.id)
      yield localStorage.setItem("role", userRole[0].role)
      yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data(), providerData }));
    }
  } catch (err) {
    yield put(signInFailure({ err }));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromAuth(user);
    if(localStorage.getItem("role")==="undefined"){
      yield window.location.href='/login'
    }
    else{
      yield window.location.href='/dashboard' 
    }
  } catch (err) {
    yield put(signInFailure({ err }));
  }
}
export function* signOut(){
  try {
    yield auth.signOut()
    yield localStorage.removeItem('user')
    yield localStorage.removeItem('role')
    yield put(signOutSuccess())
    yield window.location.href='/login'
  } catch (error) {
    yield put(signOutFailure(error))
  }
}
export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}
export function* isUserAuthenticated(){
  try {
    const userAuth = yield getCurrentUser()
    if(!userAuth) return;
    yield getSnapshotFromAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error))
  }
}
export function* onUpdateUserProfileStart(){
  yield takeLatest(UserActionTypes.UPDATE_USER_PROFILE_START,updateUserProfileAsync)
}
export function* updateUserProfileAsync({userCredentials}){
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
    const image = yield userCredentials.photoURL
    if(image!=="http://www.example.com/12345678/photo.png" &&image){
      yield cloudStorage.ref('/images').child(image.name).put(image)
      const imageUrl = yield cloudStorage.ref('/images').child(image.name).getDownloadURL()
      const userData = {...userCredentials,photoURL:imageUrl}
      yield axios.patch(`${process.env.REACT_APP_BASE_URL}/users/?id=${currentUser.id}`,userData)
      yield put(updateUserSuccess())
      const extraDataUserRef = yield getUserExtraRef(currentUser.id);
      yield extraDataUserRef.update(userData);
      // yield location.reload()
    }
    else{
      yield axios.patch(`${process.env.REACT_APP_BASE_URL}/users/?id=${currentUser.id}`,{...userCredentials})
      yield alert(`Update Successfully!`)
      yield put(updateUserSuccess())
      const extraDataUserRef = yield getUserExtraRef(currentUser.id);
      yield extraDataUserRef.update(userCredentials);
      // yield location.reload()
    }
    } catch (error) {
      yield alert(`Error!`+ error.response.data.error)
      yield put(updateUserFailure(error))
    }
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onCheckUserSessions() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}
export function* signInAfterSignUp({payload:{user, additionalData}}){
yield getSnapshotFromAuth(user, additionalData);

}
export function* signUp({payload:{email, password, displayName}}) {
try {
  const {user} = yield auth.createUserWithEmailAndPassword(email, password);
  yield put(signUpSuccess({user, additionalData:{displayName}}))
} catch (error) {
  yield put(signUpFailure(error))
}
}
export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}
export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* onUserDataChange() {
  yield takeLatest(
    [
      UserActionTypes.UPDATE_USER_PROFILE_START
    ],
    updateUserProfileAsync
  );
}
// export function* postCommentAsync({comment}){
//   try {
//   let currentProduct = yield select(selectSingleProduct)
//   yield axios.post(`${process.env.REACT_APP_BASE_URL}/products/post_comment/?productId=${currentProduct[0]._id}`,comment)
//   yield toast.success("Comment Success")
//   yield setTimeout(() => {
//     location.reload()
//   }, 500);
//   } catch (error) {
//     yield toast.error("Comment Error")
//   }
// }
export function* fetchHistoryUserStart(data){
  yield takeLatest(UserActionTypes.FETCH_HISTORY_PAYMENT_START, fetchHistoryUserAsync)
}
export function* fetchHistoryUserAsync(){
  let historyPayment = []
  try {
    const currentUser = yield select(selectCurrentUser);
    yield axios.get(`${process.env.REACT_APP_BASE_URL}/transactions/${currentUser.id}`).then(res=>historyPayment.push(res.data)).catch(error=>put(fetchHistoryPaymentFailed(error)))
    yield put(fetchHistoryPaymentSuccess(_.flatten(_.map(historyPayment))))
  } catch (error) {
    yield put(fetchHistoryPaymentFailed(error))
  }
}
export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onCheckUserSessions), call(onSignOutStart),call(onSignUpStart) ,call(onSignUpSuccess), call(onUserDataChange), call(fetchHistoryUserStart) ]);
}
