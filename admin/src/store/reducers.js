import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import Product from './product/product.reducer'
const rootReducer = combineReducers({
    Layout,
    Account,
    Login,
    Forget,
    product:Product,
});

export default rootReducer;