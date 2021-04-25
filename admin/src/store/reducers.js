import { combineReducers  } from 'redux';
import {persistReducer} from 'redux-persist'
import Layout from './layout/reducer';
import storage from 'redux-persist/lib/storage'
import userReducer from './user/user.reducer.js'
import Product from './product/product.reducer'
import AnalysisData from './analysis/analysis.reducer'
const persistConfig ={
    key: 'root',
    storage
}
const rootReducer = combineReducers({
    Layout,
    user: userReducer,
    product:Product,
    analysis: AnalysisData
});
export default persistReducer(persistConfig,rootReducer);