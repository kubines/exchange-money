import { configureStore, combineReducers, type ThunkDispatch, type AnyAction } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import exchanges from './exchanges'

const combinedReducers = combineReducers({
  exchanges
})

const store = configureStore({
  reducer: combinedReducers,
  middleware: [thunk]
})

export type RootState = ReturnType<typeof combinedReducers>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export default store

export * from './exchanges'

declare module 'react-redux' {
  interface DefaultRootState extends RootState { }
}
