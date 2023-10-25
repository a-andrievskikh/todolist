import { todolistsActions } from 'features/TodolistList/todolists-slice'
import { TaskPriorities, tasksAPI, TaskStatuses, TaskT } from 'api/tasks-api'
import { AppRootStateT, AppThunk } from 'app/store'
import { appActions } from 'app/app-slice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { ResultCodes } from 'api/todolists-api'
import axios from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearData } from 'common/actions/clearData'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateT,
  reducers: {
    deleteTask: (state, action: PayloadAction<{ todolistID: string; taskID: string }>) => {
      const tasks = state[action.payload.todolistID]
      const index = tasks.findIndex(t => t.id === action.payload.taskID)
      if (index !== -1) tasks.splice(index, 1)
    },
    createTask: (state, action: PayloadAction<{ task: TaskT }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ todolistID: string; taskID: string; model: UpdateDomainTaskModelT }>
    ) => {
      const tasks = state[action.payload.todolistID]
      let index = tasks.findIndex(t => t.id === action.payload.taskID)
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model }
    },
    setTasks: (state, action: PayloadAction<{ todolistID: string; tasks: TaskT[] }>) => {
      state[action.payload.todolistID] = action.payload.tasks
    },
  },
  extraReducers: builder => {
    builder
      .addCase(todolistsActions.createTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.deleteTodolist, (state, action) => {
        delete state[action.payload.todolistID]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach(tl => (state[tl.id] = []))
      })
      .addCase(clearData, () => {})
  },
})

export const tasksSlice = slice.reducer
export const tasksActions = slice.actions

// Thunks
export const getTasksTC =
  (todolistID: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await tasksAPI.getTasks(todolistID)
      dispatch(tasksActions.setTasks({ todolistID, tasks: res.data.items }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
export const deleteTaskTC =
  (todolistID: string, taskID: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      await tasksAPI.deleteTask(todolistID, taskID)
      dispatch(tasksActions.deleteTask({ todolistID, taskID }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
export const createTaskTC =
  (todolistID: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await tasksAPI.createTask(todolistID, title)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(tasksActions.createTask({ task: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelT): AppThunk => {
  return async (dispatch, getState: () => AppRootStateT) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    const task = getState().tasks[todolistID].find(t => t.id === taskID)
    if (!task) {
      console.warn('task not found in the state')
      return
    }
    try {
      const res = await tasksAPI.updateTask(todolistID, taskID, {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        ...model,
      })
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(tasksActions.updateTask({ todolistID, taskID, model }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
}

// Types
export type TasksStateT = {
  [key: string]: TaskT[]
}

type UpdateDomainTaskModelT = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

type ErrorType = {
  statusCode: 0
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
