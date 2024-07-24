import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import type { AppRootState } from 'app/store'
import { clearData } from 'shared/actions'
import { createAppAsyncThunk } from 'shared/lib'
import type { TodolistFilterValues, RequestStatus, TodolistDomain, TodolistT } from 'shared/types'
import { ResultCodes } from 'shared/enums'
import { todolistsApi } from 'features/todolists-list/api'
import { tasksThunks } from 'features/todolists-list/model'

type UpdateTodolistTitle = {
  todolistID: string
  title: string
}

const initialState: TodolistDomain[] = []

const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ todolistID: string; filterValue: TodolistFilterValues }>
    ) => {
      const todolist = state.find(tl => tl.id === action.payload.todolistID)
      if (todolist) todolist.filterValue = action.payload.filterValue
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistID: string; entityStatus: RequestStatus }>
    ) => {
      const todo = state.find(tl => tl.id === action.payload.todolistID)
      if (todo) todo.entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: builder => {
    builder
      .addCase(todolistsThunks.getTodolists.fulfilled, (state, { payload }) => {
        return payload.todolists.map(tl => ({
          ...tl,
          filterValue: 'all',
          entityStatus: 'idle',
        }))
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, { payload }) => {
        state.unshift({ ...payload.todolist, filterValue: 'all', entityStatus: 'idle' })
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, { payload }) => {
        /*const index = state.findIndex(tl => tl.id === payload.todolistID)
        if (index !== -1) state.splice(index, 1)*/
        return state.filter(tl => tl.id !== payload.todolistID)
      })
      .addCase(todolistsThunks.changeTodolistTitle.fulfilled, (state, { payload }) => {
        /*const index = state.findIndex(tl => tl.id === payload.todolistID)
        if (index !== -1) state[index].title = payload.title*/
        const todo = state.find(tl => tl.id === payload.todolistID)
        if (todo) todo.title = payload.title
      })
      .addCase(clearData, () => [])
      /*.addMatcher(isRejected(todolistsThunks.deleteTodolist), (state, action) => {
        const todolist = state.find(tl => tl.id === action.meta.arg)
        if (todolist) todolist.entityStatus = 'failed'
      })*/
      .addMatcher(isPending, state => state.forEach(tl => (tl.entityStatus = 'loading')))
      .addMatcher(isRejected, state => state.forEach(tl => (tl.entityStatus = 'failed')))
      .addMatcher(isFulfilled, state => state.forEach(tl => (tl.entityStatus = 'succeeded')))
  },
})

const getTodolists = createAppAsyncThunk<{ todolists: TodolistT[] }, void>(
  `${slice.name}/getTodolists`,
  async (_, { dispatch }) => {
    const res = await todolistsApi.getTodolists()
    res.data.forEach((tl: TodolistT) => dispatch(tasksThunks.getTasks(tl.id)))
    return { todolists: res.data }
  }
)
const addTodolist = createAppAsyncThunk<{ todolist: TodolistT }, string>(
  `${slice.name}/addTodolist`,
  async (title, { rejectWithValue }) => {
    const res = await todolistsApi.createTodolist(title)
    return res.data.resultCode === ResultCodes.Success
      ? { todolist: res.data.data.item }
      : rejectWithValue(res.data)
  }
)
const deleteTodolist = createAppAsyncThunk<{ todolistID: string }, string>(
  `${slice.name}/deleteTodolist`,
  async (todolistID, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistID, entityStatus: 'loading' }))
    const res = await todolistsApi.deleteTodolist(todolistID)
    return res.data.resultCode === ResultCodes.Success ? { todolistID } : rejectWithValue(res.data)
  }
)
const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitle, UpdateTodolistTitle>(
  `${slice.name}/updateTodolistTitle`,
  async (arg, { rejectWithValue }) => {
    const { todolistID, title } = arg
    const res = await todolistsApi.updateTodolistTitle(todolistID, title)
    return res.data.resultCode === ResultCodes.Success ? arg : rejectWithValue(res.data)
  }
)

const todolistsSelector = (s: AppRootState) => s.todolists

export const todolistsReducer = slice.reducer
export const todolistsThunks = {
  getTodolists,
  addTodolist,
  deleteTodolist,
  changeTodolistTitle,
}
export const todolistsActions = slice.actions
export const todolistsSelectors = { todolistsSelector }
