import type { TodolistDomain, TodolistT, TasksState } from 'shared/types'
import { todolistsReducer, todolistsThunks } from 'features/todolists-list/model'
import { tasksReducer } from 'features/todolists-list/model'

test('ids should be equals', () => {
  const startTasksState: TasksState = {}
  const startTodolistsState: TodolistDomain[] = []

  const todolist: TodolistT = {
    id: 'new id',
    title: 'new Todolist',
    order: 0,
    addedDate: '',
  }

  const action = todolistsThunks.addTodolist.fulfilled({ todolist }, '', todolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
