import { combineReducers } from 'redux'
import { reducerAuthentication } from './reducerAuthentication'
import { reducerThemes } from './reducerThemes';

export const applicationReducer = combineReducers({
    authentication: reducerAuthentication,
    themes: reducerThemes
})

export type AppState = ReturnType<typeof applicationReducer>;