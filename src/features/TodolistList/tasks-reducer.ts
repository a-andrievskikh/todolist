import { todolistsThunks } from 'features/TodolistList/todolists-reducer'
import { tasksAPI } from 'features/TodolistList/Todolist/tasks-api'
import { appActions } from 'app/app-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { clearData } from 'common/actions/clearData'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCodes } from 'common/enums/enums'
import {
  CreateTaskArgT,
  DeleteTaskArgT,
  TaskT,
  UpdateTaskArgT,
} from 'features/TodolistList/Todolist/task-types'
import { TodolistT } from 'features/TodolistList/todolist-types'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state[payload.todolistID] = payload.tasks
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        const tasks = state[payload.task.todoListId]
        tasks.unshift(payload.task)
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        const tasks = state[payload.arg.todolistID]
        const index = tasks.findIndex(t => t.id === payload.arg.taskID)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const tasks = state[payload.todolistID]
        let index = tasks.findIndex(t => t.id === payload.taskID)
        if (index !== -1) tasks[index] = { ...tasks[index], ...payload.model }
      })
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, { payload }) => {
        state[payload.todolist.id] = []
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, { payload }) => {
        delete state[payload.todolistID]
      })
      .addCase(todolistsThunks.getTodolists.fulfilled, (state, { payload }) => {
        payload.todolists.forEach((tl: TodolistT) => (state[tl.id] = []))
      })
      .addCase(clearData, () => {})
  },
})

// Thunks
const getTasks = createAppAsyncThunk<{ todolistID: string; tasks: TaskT[] }, string>(
  ` ${slice.name}tasks/getTasks`,
  async (todolistID, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await tasksAPI.getTasks(todolistID)
      const tasks = res.data.items
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { todolistID, tasks }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

const createTask = createAppAsyncThunk<{ task: TaskT }, CreateTaskArgT>(
  `${slice.name}/createTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await tasksAPI.createTask(arg)
      if (res.data.resultCode === ResultCodes.Success) {
        const task = res.data.data.item
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { task }
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

const deleteTask = createAppAsyncThunk<{ arg: DeleteTaskArgT }, DeleteTaskArgT>(
  `${slice.name}/deleteTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      await tasksAPI.deleteTask(arg)
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { arg }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

const updateTask = createAppAsyncThunk<UpdateTaskArgT, UpdateTaskArgT>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { todolistID, taskID, model } = arg
    const { dispatch, rejectWithValue, getState } = thunkAPI
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const task = getState().tasks[todolistID].find(t => t.id === taskID)
      if (!task) {
        console.warn('task not found in the state')
        return rejectWithValue(null)
      }
      const modelTemplate = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        ...model,
      }
      const res = await tasksAPI.updateTask({
        todolistID,
        taskID,
        model: modelTemplate,
      })
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return arg
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

export const tasksReducer = slice.reducer
export const tasksThunks = { getTasks, createTask, deleteTask, updateTask }

// Types
export type TasksStateT = {
  [key: string]: TaskT[]
}
