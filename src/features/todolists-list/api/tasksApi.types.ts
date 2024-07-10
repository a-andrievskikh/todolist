import type { TaskPriorities, TaskStatuses } from 'shared/enums'
import type { TaskT } from 'shared/types'

type UpdateDomainTaskModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: TaskT[]
}
export type CreateTaskArg = {
  todolistID: string
  title: string
}
export type DeleteTaskArg = {
  todolistID: string
  taskID: string
}
export type UpdateTaskArg = {
  todolistID: string
  taskID: string
  model: UpdateDomainTaskModel
}
