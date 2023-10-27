import { AnyAction, combineReducers } from 'redux'
import { tasksReducer } from 'features/TodolistList/tasks-reducer'
import { todolistsReducer } from 'features/TodolistList/todolists-reducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from 'app/app-reducer'
import { authReducer } from 'features/Auth/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type AppRootStateT = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateT, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateT, unknown, AnyAction>

// @ts-ignore
window.store = store
