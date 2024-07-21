import { instance } from 'shared/api'
import type { BaseResponse, TodolistT } from 'shared/types'

const baseUrl = 'todo-lists'

export const todolistsApi = {
  getTodolists: () => instance.get<TodolistT[]>(`${baseUrl}`),
  createTodolist: (title: string) =>
    instance.post<BaseResponse<{ item: TodolistT }>>(`${baseUrl}`, { title }),
  deleteTodolist: (todolistID: string) => instance.delete<BaseResponse>(`${baseUrl}/${todolistID}`),
  updateTodolistTitle: (todolistID: string, title: string) =>
    instance.put<BaseResponse>(`${baseUrl}/${todolistID}`, { title }),
}
