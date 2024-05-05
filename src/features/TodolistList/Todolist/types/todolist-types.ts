import { RequestStatusT } from 'app/types/app-types'

export type FilterT = 'all' | 'active' | 'completed'

export type TodolistT = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodolistDomainT = TodolistT & {
  filter: FilterT
  entityStatus: RequestStatusT
}

export type TodolistPT = {
  todolist: TodolistDomainT
  demo?: boolean
}

export type UpdateTodolistTitle = {
  todolistID: string
  title: string
}
