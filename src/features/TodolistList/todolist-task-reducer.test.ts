import { tasksReducer, TasksStateT } from 'features/TodolistList/tasks-reducer'
import {
  TodolistDomainT,
  todolistsReducer,
  todolistsThunks,
} from 'features/TodolistList/todolists-reducer'
import { TodolistT } from 'features/TodolistList/todolist-types'

test('ids should be equals', () => {
  const startTasksState: TasksStateT = {}
  const startTodolistsState: TodolistDomainT[] = []

  const todolist: TodolistT = {
    id: 'new id',
    title: 'new Todolist',
    order: 0,
    addedDate: '',
  }

  const action = todolistsThunks.createTodolist.fulfilled({ todolist }, '', todolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
