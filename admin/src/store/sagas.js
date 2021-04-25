import { all, call } from 'redux-saga/effects'
import LayoutSaga from './layout/saga';
import { userSagas } from "./user/user.sagas";
import {productSagas } from "./product/product.saga";
import {analysisSagas} from './analysis/analysis.saga'
export default function* rootSaga() {
    yield all([
        call(userSagas),
        LayoutSaga(),
        call(productSagas),
        call(analysisSagas)
    ])
}