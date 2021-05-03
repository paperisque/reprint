/*
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { applicationReducer } from './reducers';

export const store = createStore( applicationReducer, applyMiddleware(thunk))
*/

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { applicationReducer } from './reducers';

export const store = configureStore({
    reducer: applicationReducer
})

export type AppDispatch = typeof store.dispatch;
//export type AppState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof applicationReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;