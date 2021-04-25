import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
const configToDB = {
  apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_MEASUREMENTID,
};
export const createUserProfileDocument =  async (userAuth, additionData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email}= userAuth;
    const createAt = new Date()
    try{
      await userRef.set({displayName, email, createAt,...additionData});
    }
    catch(error)
    {console.log('error create user', error.message)};
  }
  return userRef;
}
export const getUserCartRef = async userId => {
  const cartsRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartsRef.get();
  if (snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};
export const getUserExtraRef =async userId => {
  const dataRef = firestore.collection('extra_data').where('userId', '==', userId)
  const snapShot = await dataRef.get()
  if (snapShot.empty) {
    const extraDataDocRef = firestore.collection('extra_data').doc();
    await extraDataDocRef.set({ userId, userCredentials: [] });
    return extraDataDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
}
export const getWishListUserRef = async userId => {
  const wishListRef = firestore.collection('wishList').where('userId', '==', userId);
  const snapShot = await wishListRef.get();
  if (snapShot.empty) {
    const wishListDocRef = firestore.collection('wishList').doc();
    await wishListDocRef.set({ userId, wishList: [] });
    return wishListDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};
export const addCollectionAndDocuments = async (collectionKey, objectToAdd)=>{
  const collectionRef =firestore.collection(collectionKey);
  const batch = firestore.batch()
  objectToAdd.forEach(obj=>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}
export const reCaptcha = ()=>{
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
      console.log(response)
    }
  });
}
export const convertCollectionsSnapshotToMap = collections=>{
  const transformedCollections = collections.docs.map(doc=>{
    const{title,items} =doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollections.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  },{})
}
export const getCurrentUser = ()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth)
    }, reject);
  })
}
firebase.initializeApp(configToDB);
export const auth = firebase.auth();
export const firestore =firebase.firestore();
export const cloudStorage =firebase.storage()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuthFunction = firebase.auth
export const firebaseLanguage = firebase.auth().useDeviceLanguage();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider)
export default firebase;