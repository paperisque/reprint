import { combineReducers } from 'redux'
import { reducerAuthentication } from './reducerAuthentication'
import { reducerThemes } from './reducerThemes';
import { reducerDesignsMode } from './reducerDesignsMode';
import sliceDesignsTree from './sliceDesignsTree'

export const applicationReducer = combineReducers({
    authentication: reducerAuthentication,
    designsmode: reducerDesignsMode,
    themes: reducerThemes,
    designstree: sliceDesignsTree
})

//export type AppState = ReturnType<typeof applicationReducer>;