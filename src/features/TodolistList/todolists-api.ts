import { instance } from 'common/api/instance'
import { BaseResponseT } from 'common/types/common-types'
import { TodolistT } from 'features/TodolistList/todolist-types'

export const todolistsAPI = {
  getTodolists: () => instance.get<TodolistT[]>('todo-lists/'),
  createTodolist: (title: string) =>
    instance.post<BaseResponseT<{ item: TodolistT }>>('todo-lists/', { title }),
  deleteTodolist: (todolistID: string) =>
    instance.delete<BaseResponseT>(`todo-lists/${todolistID}`),
  updateTodolistTitle: (todolistID: string, title: string) =>
    instance.put<BaseResponseT>(`todo-lists/${todolistID}`, { title }),
}
