import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from 'app/model'
import { authReducer } from 'features/auth/model'
import { tasksReducer, todolistsReducer } from 'features/todolists-list/model'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

// @ts-ignore
window.store = store
