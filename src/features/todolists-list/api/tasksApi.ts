import { instance } from 'shared/api'
import type { BaseResponse, TaskT } from 'shared/types'
import type {
  CreateTaskArg,
  DeleteTaskArg,
  GetTasksResponse,
  UpdateTaskArg,
} from 'features/todolists-list/api'

const baseUrlTodos = 'todo-lists'
const baseUrlTasks = 'tasks'

export const tasksApi = {
  getTasks: (todolistID: string) =>
    instance.get<GetTasksResponse>(`${baseUrlTodos}/${todolistID}/${baseUrlTasks}`),
  createTask: (arg: CreateTaskArg) =>
    instance.post<BaseResponse<{ item: TaskT }>>(
      `${baseUrlTodos}/${arg.todolistID}/${baseUrlTasks}`,
      {
        title: arg.title,
      }
    ),
  deleteTask: (arg: DeleteTaskArg) =>
    instance.delete<BaseResponse>(
      `${baseUrlTodos}/${arg.todolistID}/${baseUrlTasks}/${arg.taskID}`
    ),
  updateTask: (arg: UpdateTaskArg) =>
    instance.put<BaseResponse>(
      `${baseUrlTodos}/${arg.todolistID}/${baseUrlTasks}/${arg.taskID}`,
      arg.model
    ),
}
