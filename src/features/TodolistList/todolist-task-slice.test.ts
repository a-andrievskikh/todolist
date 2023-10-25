import { tasksSlice, TasksStateT } from 'features/TodolistList/tasks-slice'
import { TodolistDomainT, todolistsActions, todolistsSlice } from 'features/TodolistList/todolists-slice'
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

  const action = todolistsActions.createTodolist({ todolist })

  const endTasksState = tasksSlice(startTasksState, action)
  const endTodolistsState = todolistsSlice(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
