import { v1 } from 'uuid'

import type { TodolistFilterValues, TodolistDomain, TodolistT } from 'shared/types'
import { todolistsReducer, todolistsThunks, todolistsActions } from 'features/todolists-list/model'
import { RequestStatus } from 'shared/types'

let todolistID1: string
let todolistID2: string
let startState: TodolistDomain[]

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = [
    {
      id: todolistID1,
      title: 'What to learn',
      filterValue: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistID2,
      title: 'What to buy',
      filterValue: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ]
})

test('correct todolist should be removed', () => {
  const payload = { todolistID: todolistID1 }
  const action = todolistsThunks.deleteTodolist.fulfilled(payload, '', todolistID1)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
  const todolist: TodolistT = {
    id: 'new id',
    title: 'New Todolist',
    order: 0,
    addedDate: '',
  }

  const action = todolistsThunks.addTodolist.fulfilled({ todolist }, '', todolist.title)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filterValue).toBe('all')
})

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist'

  const payload = {
    todolistID: todolistID2,
    title: newTodolistTitle,
  }
  const action = todolistsThunks.changeTodolistTitle.fulfilled(payload, '', payload)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  const newFilter: TodolistFilterValues = 'completed'

  const action = todolistsActions.changeTodolistFilter({
    todolistID: todolistID2,
    filterValue: newFilter,
  })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filterValue).toBe('all')
  expect(endState[1].filterValue).toBe(newFilter)
})

test('todolist should be set to the state', () => {
  const action = todolistsThunks.getTodolists.fulfilled({ todolists: startState }, '')
  const endState = todolistsReducer([], action)
  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
  const newTodolistEntityStatus: RequestStatus = 'idle'
  const action = todolistsActions.changeTodolistEntityStatus({
    todolistID: todolistID1,
    entityStatus: newTodolistEntityStatus,
  })
  const endState = todolistsReducer(startState, action)
  expect(endState[0].entityStatus).toBe(newTodolistEntityStatus)
  expect(endState[1].entityStatus).toBe(newTodolistEntityStatus)
})
