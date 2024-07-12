import { createSlice } from '@reduxjs/toolkit'
import type { AppRootState } from 'app/store'
import { createAppAsyncThunk } from 'shared/lib'
import { ResultCodes } from 'shared/enums'
import { clearData } from 'shared/actions'
import type { TasksState, TaskT, TodolistT } from 'shared/types'
import {
  tasksApi,
  type CreateTaskArg,
  type DeleteTaskArg,
  type UpdateTaskArg,
} from 'features/todolists-list/api'
import { todolistsThunks } from 'features/todolists-list/model'

const initialState: TasksState = {}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(tasksThunks.getTasks.fulfilled, (state, { payload }) => {
        state[payload.todolistID] = payload.tasks
      })
      .addCase(tasksThunks.addTask.fulfilled, (state, { payload }) => {
        const tasks = state[payload.task.todoListId]
        tasks.unshift(payload.task)
      })
      .addCase(tasksThunks.deleteTask.fulfilled, (state, { payload }) => {
        const tasks = state[payload.arg.todolistID]
        const index = tasks.findIndex(t => t.id === payload.arg.taskID)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(tasksThunks.changeTask.fulfilled, (state, { payload }) => {
        const tasks = state[payload.todolistID]
        /*let index = tasks.findIndex(t => t.id === payload.taskID)
        if (index !== -1) tasks[index] = { ...tasks[index], ...payload.model }*/
        const task = tasks.find(t => t.id === payload.taskID)
        if (task) Object.assign(task, payload.model)
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, { payload }) => {
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

const getTasks = createAppAsyncThunk<{ todolistID: string; tasks: TaskT[] }, string>(
  ` ${slice.name}/getTasks`,
  async todolistID => {
    const res = await tasksApi.getTasks(todolistID)
    return { todolistID, tasks: res.data.items }
  }
)
const addTask = createAppAsyncThunk<{ task: TaskT }, CreateTaskArg>(
  `${slice.name}/addTask`,
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.createTask(arg)
    return res.data.resultCode === ResultCodes.Success
      ? { task: res.data.data.item }
      : rejectWithValue(res.data)
  }
)
const deleteTask = createAppAsyncThunk<{ arg: DeleteTaskArg }, DeleteTaskArg>(
  `${slice.name}/deleteTask`,
  async arg => {
    await tasksApi.deleteTask(arg)
    return { arg }
  }
)

const changeTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
  `${slice.name}/updateTask`,
  async (arg, { rejectWithValue, getState }) => {
    const { todolistID, taskID, model } = arg
    const task = getState().tasks[todolistID]?.find(t => t.id === taskID)
    if (!task) {
      console.warn('task not found in the state')
      return rejectWithValue(null)
    }
    const res = await tasksApi.updateTask({
      todolistID,
      taskID,
      model: {
        ...task,
        ...model,
      },
    })
    return res.data.resultCode === ResultCodes.Success ? arg : rejectWithValue(res.data)
  }
)

const tasksSelector = (s: AppRootState) => s.tasks

export const tasksReducer = slice.reducer
export const tasksThunks = { getTasks, addTask, deleteTask, changeTask }
export const tasksSelectors = { tasksSelector }
