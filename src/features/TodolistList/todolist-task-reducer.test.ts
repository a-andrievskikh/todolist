import { tasksReducer, TasksStateT } from './tasks-reducer'
import { createTodolistAC, TodolistDomainT, todolistsReducer } from './todolists-reducer'
import { TodolistType } from 'api/todolists-api'

test('ids should be equals', () => {
  const startTasksState: TasksStateT = {}
  const startTodolistsState: TodolistDomainT[] = []

  const todolist: TodolistType = {
    id: 'new id',
    title: 'new Todolist',
    order: 0,
    addedDate: '',
  }

  const action = createTodolistAC(todolist)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolist.id)
  expect(idFromTodolists).toBe(action.todolist.id)
})
