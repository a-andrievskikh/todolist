import { tasksReducer } from 'features/TodolistList/Todolist/Task/model/tasks-reducer'
import { todolistReducer } from 'features/TodolistList/Todolist/model/todolist-reducer'
import { appReducer } from 'app/model/app-reducer'
import { authReducer } from 'features/Auth/model/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateT = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
