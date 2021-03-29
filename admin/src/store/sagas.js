import { all, call } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';
import {productSagas } from "./product/product.saga";
import {analysisSagas} from './analysis/analysis.saga'
export default function* rootSaga() {
    yield all([
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        LayoutSaga(),
        call(productSagas),
        call(analysisSagas)
    ])
}