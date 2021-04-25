import {createSelector} from 'reselect'
export const selectUser = state => state.user;
export const selectCurrentUser = createSelector([selectUser],user=>user.currentUser)
export const selectExtraDataCurrentUser = createSelector([selectUser], user =>user.extra_data)
export const selectHistoryPaymentUser= createSelector([selectUser],user=>user.historyPayment)