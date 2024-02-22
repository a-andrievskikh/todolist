import { TaskPriorities, TaskStatuses } from 'common/enums/enums'

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
export type GetTasksResponseT = {
  totalCount: number
  error: string | null
  items: TaskT[]
}
export type CreateTaskArgT = {
  todolistID: string
  title: string
}
export type DeleteTaskArgT = {
  todolistID: string
  taskID: string
}
export type UpdateTaskArgT = {
  todolistID: string
  taskID: string
  model: UpdateDomainTaskModelT
}
type UpdateDomainTaskModelT = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
