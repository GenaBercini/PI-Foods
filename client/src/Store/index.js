import { createStore, applyMiddleware } from 'redux'
import foodReducer from '../Reducer/reducer.js'
import thunk from 'redux-thunk';

const store = createStore(foodReducer, applyMiddleware(thunk));

export default store;