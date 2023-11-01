import { instance } from './basic'
import { ResponseT } from './common-types'

// API
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistT[]>('todo-lists/')
  },
  createTodolist(title: string) {
    return instance.post<ResponseT<{ item: TodolistT }>>('todo-lists/', { title })
  },
  deleteTodolist(todolistID: string) {
    return instance.delete<ResponseT>(`todo-lists/${todolistID}`)
  },
  updateTodolistTitle(todolistID: string, title: string) {
    return instance.put<ResponseT>(`todo-lists/${todolistID}`, { title })
  },
}

// Types
export type TodolistT = {
  id: string
  title: string
  addedDate: string
  order: number
}

export enum ResultCodes {
  Success = 0,
  Failed = 1,
  Captcha = 10,
}
