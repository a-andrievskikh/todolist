import {
  CREATE_TODOLIST,
  DELETE_TODOLIST,
  SET_TODOLISTS,
  CLEAR_DATA,
  createTodolistAC,
  deleteTodolistAC,
  setTodolistsAC,
  clearDataAC,
} from './todolists-reducer'
import { TaskPriorities, tasksAPI, TaskStatuses, TaskT } from 'api/tasks-api'
import { AppRootStateT, AppThunk } from 'app/store'
import { setAppStatusAC } from 'app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { ResultCodes } from 'api/todolists-api'
import axios from 'axios'

export const DELETE_TASK = 'DELETE_TASK'
export const CREATE_TASK = 'CREATE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const SET_TASKS = 'SET_TASKS'

const initialState: TasksStateT = {}

export const tasksReducer = (state: TasksStateT = initialState, action: TasksActionsT): TasksStateT => {
  switch (action.type) {
    case DELETE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(tl => tl.id !== action.taskID),
      }
    case CREATE_TASK:
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      }
    case UPDATE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t =>
          t.id === action.taskID ? { ...t, ...action.model } : t
        ),
      }
    case DELETE_TODOLIST:
      const { [action.todolistID]: deletedItem, ...restItems } = state
      return restItems
    case CREATE_TODOLIST:
      return { ...state, [action.todolist.id]: [] }
    case SET_TODOLISTS: {
      return action.todolists.reduce((copy, tl) => ({ ...copy, [tl.id]: [] }), { ...state })
    }
    case SET_TASKS: {
      return { ...state, [action.todolistID]: action.tasks }
    }
    case CLEAR_DATA:
      return {}
    default:
      return state
  }
}

// Actions
export const deleteTaskAC = (todolistID: string, taskID: string) => ({ type: DELETE_TASK, todolistID, taskID }) as const
export const createTaskAC = (task: TaskT) => ({ type: CREATE_TASK, task }) as const
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelT) =>
  ({ type: UPDATE_TASK, todolistID, taskID, model }) as const
export const setTasksAC = (todolistID: string, tasks: TaskT[]) => {
  return { type: SET_TASKS, todolistID, tasks } as const
}

// Thunks
export const getTasksTC =
  (todolistID: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await tasksAPI.getTasks(todolistID)
      dispatch(setTasksAC(todolistID, res.data.items))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e.message)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }
export const deleteTaskTC =
  (todolistID: string, taskID: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await tasksAPI.deleteTask(todolistID, taskID)
      dispatch(deleteTaskAC(todolistID, taskID))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e.message)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }
export const createTaskTC =
  (todolistID: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await tasksAPI.createTask(todolistID, title)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(createTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e.message)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }
export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelT): AppThunk => {
  return async (dispatch, getState: () => AppRootStateT) => {
    dispatch(setAppStatusAC('loading'))
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
        dispatch(updateTaskAC(todolistID, taskID, model))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e.message)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }
}

// Types
export type TasksActionsT =
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof clearDataAC>

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
