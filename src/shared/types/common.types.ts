import { TaskPriorities, TaskStatuses } from 'shared/enums'

type FieldError = {
  field: string
  error: string
}

export type BaseResponse<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodolistFilterValues = 'all' | 'active' | 'completed'
export type TodolistT = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type TodolistDomain = TodolistT & {
  filterValue: TodolistFilterValues
  entityStatus: RequestStatus
}

export type TaskT = {
  todoListId: string
  id: string
  title: string
  status: TaskStatuses
  description: string
  priority: TaskPriorities
  startDate: string
  deadline: string
  order: number
  addedDate: string
}

export type TasksState = {
  [key: string]: TaskT[]
}
