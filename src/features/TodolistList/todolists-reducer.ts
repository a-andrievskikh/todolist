import { appActions, RequestStatusT } from 'app/app-reducer'
import { tasksThunks } from 'features/TodolistList/tasks-reducer'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { clearData } from 'common/actions/clearData'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCodes } from 'common/enums/enums'
import { TodolistT } from 'features/TodolistList/todolist-types'
import { todolistsAPI } from 'features/TodolistList/todolists-api'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainT[],
  reducers: {
    updateTodolistFilter: (
      state,
      action: PayloadAction<{ todolistID: string; filter: FilterT }>
    ) => {
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
    builder
      .addCase(getTodolists.fulfilled, (state, { payload }) => {
        console.log(current(state))
        return payload.todolists.map((tl: TodolistT) => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle',
        }))
      })
      .addCase(deleteTodolist.fulfilled, (state, { payload }) => {
        const index = state.findIndex(tl => tl.id === payload.todolistID)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(createTodolist.fulfilled, (state, { payload }) => {
        state.unshift({ ...payload.todolist, filter: 'all', entityStatus: 'idle' })
      })
      .addCase(updateTodolistTitle.fulfilled, (state, { payload }) => {
        const index = state.findIndex(tl => tl.id === payload.todolistID)
        if (index !== -1) state[index].title = payload.title
      })
      .addCase(clearData, () => [])
  },
})

// Thunks
export const getTodolists = createAppAsyncThunk<{ todolists: TodolistT[] }, void>(
  `${slice.name}/getTodolists`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await todolistsAPI.getTodolists()
      res.data.forEach((tl: any) => dispatch(tasksThunks.getTasks(tl.id)))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { todolists: res.data }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

export const deleteTodolist = createAppAsyncThunk<{ todolistID: string }, { todolistID: string }>(
  `${slice.name}/deleteTodolist`,
  async ({ todolistID }, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    dispatch(todolistsActions.updateTodolistEntityStatus({ todolistID, entityStatus: 'loading' }))
    try {
      const res = await todolistsAPI.deleteTodolist(todolistID)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { todolistID }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

const createTodolist = createAppAsyncThunk<{ todolist: TodolistT }, string>(
  `${slice.name}/createTodolist`,
  async (title, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await todolistsAPI.createTodolist(title)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { todolist: res.data.data.item }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

const updateTodolistTitle = createAppAsyncThunk<
  { todolistID: string; title: string },
  { todolistID: string; title: string }
>(`${slice.name}/updateTodolist`, async ({ todolistID, title }, { dispatch, rejectWithValue }) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  try {
    await todolistsAPI.updateTodolistTitle(todolistID, title)
    dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    return { todolistID, title }
  } catch (e) {
    handleServerNetworkError(dispatch, e)
    return rejectWithValue(null)
  }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { getTodolists, deleteTodolist, createTodolist, updateTodolistTitle }

// Types
export type FilterT = 'all' | 'active' | 'completed'
export type TodolistDomainT = TodolistT & {
  filter: FilterT
  entityStatus: RequestStatusT
}
