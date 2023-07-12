import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UserReducer from './UserDetails/userReducer';
import HomeReducer from './Home/HomeReducer';
import CategoryReducer from './Category/CategoryReducer';
import ProductdtlReducer from './Productdtl/ProductdtlReducer';
import ProductReducer from './Product/ProductReducer';
import CartReducer from './Cart/CartReducer';
import SubcategoryReducer from './Subcategory/SubcategoryReducer';
import OrderReducer from './Order/OrderReducer';

const rootReducer = combineReducers({
    UserReducer: UserReducer,
    HomeReducer:HomeReducer,
    CategoryReducer: CategoryReducer,
    ProductReducer:ProductReducer,
    ProductdtlReducer:ProductdtlReducer,
    CartReducer:CartReducer,
    OrderReducer:OrderReducer,
    SubcategoryReducer:SubcategoryReducer
});

const intialState = {};
const middleware = [thunk];

const Store = createStore(rootReducer,intialState,applyMiddleware(...middleware));


export default Store;