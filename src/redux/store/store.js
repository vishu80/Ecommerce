import { createStore,combineReducers,applyMiddleware } from 'redux'
import { getProductListFromReducer } from '../reducer/productList';
import { composeWithDevTools } from '@redux-devtools/extension';

import thunk from 'redux-thunk';

const reducer=combineReducers({
      getProductListFromReducer
});
// const getItemFromLocalStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const middleware = [thunk]
const initialState={
      cart:{cartItems:'Hello'}
}
const store=createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store