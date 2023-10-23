import { combineReducers } from 'redux'
import { TasksActionsT, tasksReducer } from 'features/TodolistList/tasks-reducer'
import { TodolistActionsT, todolistsReducer } from 'features/TodolistList/todolists-reducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppActionsT, appReducer } from './app-reducer'
import { AuthActionsT, authReducer } from 'features/Login/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type AppRootStateT = ReturnType<typeof store.getState>
export type AppRootActionsT = TodolistActionsT | TasksActionsT | AppActionsT | AuthActionsT
export type AppDispatch = ThunkDispatch<AppRootStateT, unknown, AppRootActionsT>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateT, unknown, AppRootActionsT>

// @ts-ignore
window.store = store
