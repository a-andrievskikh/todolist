import { ResultCodes, todolistsAPI, TodolistType } from 'api/todolists-api'
import { AppThunk } from 'app/store'
import { appActions, RequestStatusT } from 'app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios from 'axios'
import { tasksThunks } from 'features/TodolistList/tasks-reducer'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { clearData } from 'common/actions/clearData'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainT[],
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      // return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      action.payload.todolists.forEach(tl => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
      })
      console.log(current(state))
    },
    deleteTodolist: (state, action: PayloadAction<{ todolistID: string }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID)
      if (index !== -1) state.splice(index, 1)
    },
    createTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    updateTodolistTitle: (state, action: PayloadAction<{ todolistID: string; title: string }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID)
      if (index !== -1) state[index].title = action.payload.title
    },
    updateTodolistFilter: (state, action: PayloadAction<{ todolistID: string; filter: FilterT }>) => {
      const todolist = state.find(tl => tl.id === action.payload.todolistID)
      if (todolist) todolist.filter = action.payload.filter
    },
    updateTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistID: string; entityStatus: RequestStatusT }>
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID)
      if (index) state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: builder => {
    builder.addCase(clearData, () => [])
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// Thunks
export const getTodolistsTC = (): AppThunk => async dispatch => {
  try {
    const res = await todolistsAPI.getTodolists()
    dispatch(todolistsActions.setTodolists({ todolists: res.data }))
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    res.data.forEach(tl => dispatch(tasksThunks.getTasks(tl.id)))
  } catch (e) {
    if (axios.isAxiosError<ErrorT>(e)) {
      handleServerNetworkError(dispatch, e)
    } else {
      handleServerNetworkError(dispatch, e as Error)
    }
  }
}
export const deleteTodolistTC =
  (todolistID: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    dispatch(todolistsActions.updateTodolistEntityStatus({ todolistID: todolistID, entityStatus: 'loading' }))
    try {
      const res = await todolistsAPI.deleteTodolist(todolistID)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(todolistsActions.deleteTodolist({ todolistID: todolistID }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorT>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
export const createTodolistTC =
  (title: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await todolistsAPI.createTodolist(title)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(todolistsActions.createTodolist({ todolist: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorT>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
export const updateTodolistTC =
  (todolistID: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      await todolistsAPI.updateTodolistTitle(todolistID, title)
      dispatch(todolistsActions.updateTodolistTitle({ todolistID, title }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError<ErrorT>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }

// Types
export type FilterT = 'all' | 'active' | 'completed'
export type TodolistDomainT = TodolistType & {
  filter: FilterT
  entityStatus: RequestStatusT
}

type ErrorT = {
  statusCode: 0
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
