import UserActionTypes from './user.type'
export const googleSignInStart =()=>({
          type: UserActionTypes.GOOGLE_SIGN_IN_START
})
export const signInSuccess =(user)=>({
          type:UserActionTypes.SIGN_IN_SUCCESS,
          payload:user
});
export const signInFailure =error =>({
          type: UserActionTypes.SIGN_IN_FAILURE,
          payload:error
});
export const signOutStart =() =>({
          type: UserActionTypes.SIGN_OUT_START
});
export const signOutFailure =error =>({
          type: UserActionTypes.SIGN_OUT_FAILURE,
          payload:error
});
export const signOutSuccess =()=>({
          type:UserActionTypes.SIGN_OUT_SUCCESS
});
export const checkUserSession =()=>({
          type:UserActionTypes.CHECK_USER_SESSION
})
export const signUpStart =(userCredentials) =>({
          type: UserActionTypes.SIGN_UP_START,
          payload: userCredentials
});
export const signUpSuccess =({user, additionData})=>({
          type:UserActionTypes.SIGN_UP_SUCCESS,
          payload:{user, additionData}
});
export const signUpFailure =error =>({
          type: UserActionTypes.SIGN_UP_FAILURE,
          payload:error
});
export const updateUserStart =(userCredentials) =>({
          type: UserActionTypes.UPDATE_USER_PROFILE_START,
          userCredentials
});
export const updateUserSuccess =()=>({
          type:UserActionTypes.UPDATE_USER_PROFILE_SUCCESS,
});
export const updateUserFailure =error =>({
          type: UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
          payload:error
});
export const setExtraDataUserInFirebase =(extraData) =>({
          type: UserActionTypes.SET_EXTRA_DATA_FIREBASE,
          payload:extraData
})
export const postComment = (comment)=>({
          type: UserActionTypes.POST_COMMENT,
          comment
})
export const fetchHistoryPaymentUserStart=()=>({
          type: UserActionTypes.FETCH_HISTORY_PAYMENT_START,
})
export const fetchHistoryPaymentSuccess=(data)=>({
          type:UserActionTypes.FETCH_HISTORY_PAYMENT_SUCCESS,
          payload:data
})
export const fetchHistoryPaymentFailed=(error)=>({
          type:UserActionTypes.FETCH_HISTORY_PAYMENT_FAILED,
          payload:error
})
