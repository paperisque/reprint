import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { applicationReducer } from './reducers';

export const store = createStore( applicationReducer, applyMiddleware(thunk))