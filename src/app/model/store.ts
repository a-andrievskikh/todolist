import { tasksReducer } from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/model/tasksSlice'
import { todolistsReducer } from 'features/todolists-list/ui/Todolist/model/todolistsSlice'
import { appReducer } from 'app/model/appSlice'
import { authReducer } from 'features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
