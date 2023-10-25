import { AnyAction, combineReducers } from 'redux'
import { tasksSlice } from 'features/TodolistList/tasks-slice'
import { todolistsSlice } from 'features/TodolistList/todolists-slice'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appSlice } from 'app/app-slice'
import { authSlice } from 'features/Login/auth-slice'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistsSlice,
  app: appSlice,
  auth: authSlice,
})

export const store = configureStore({ reducer: rootReducer })

export type AppRootStateT = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateT, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateT, unknown, AnyAction>

// @ts-ignore
window.store = store
