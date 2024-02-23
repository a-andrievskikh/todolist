import { AppRootStateT } from 'app/store'
import { TodolistDomainT } from 'features/TodolistList/todolists-reducer'
import { TaskStatuses } from 'common/enums/enums'

export const todolistSelectors = (todolist: TodolistDomainT) => (s: AppRootStateT) => {
  return todolist.filter === 'active'
    ? s.tasks[todolist.id].filter(t => t.status === TaskStatuses.New)
    : todolist.filter === 'completed'
    ? s.tasks[todolist.id].filter(t => t.status === TaskStatuses.Completed)
    : s.tasks[todolist.id]
}
