import { combineReducers } from 'redux'
import { reducerAuthentication } from './reducerAuthentication'

export const applicationReducer = combineReducers({
    authentication : reducerAuthentication
})