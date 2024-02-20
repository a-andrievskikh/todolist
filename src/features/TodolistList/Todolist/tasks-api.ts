import { instance } from 'common/api/instance'
import { BaseResponseT } from 'common/types/common-types'
import {
  CreateTaskArgT,
  DeleteTaskArgT,
  GetTasksResponseT,
  TaskT,
  UpdateTaskArgT,
} from 'features/TodolistList/Todolist/task-types'

export const tasksAPI = {
  getTasks: (todolistID: string) =>
    instance.get<GetTasksResponseT>(`todo-lists/${todolistID}/tasks`),
  createTask: (arg: CreateTaskArgT) =>
    instance.post<BaseResponseT<{ item: TaskT }>>(`todo-lists/${arg.todolistID}/tasks`, {
      title: arg.title,
    }),
  deleteTask: (arg: DeleteTaskArgT) =>
    instance.delete<BaseResponseT>(`todo-lists/${arg.todolistID}/tasks/${arg.taskID}`),
  updateTask: (arg: UpdateTaskArgT) =>
    instance.put<BaseResponseT>(`todo-lists/${arg.todolistID}/tasks/${arg.taskID}`, arg.model),
}
