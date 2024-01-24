import { v1 } from 'uuid'
import {
  FilterT,
  TodolistDomainT,
  todolistsActions,
  todolistsReducer,
  todolistsThunks,
} from 'features/TodolistList/todolists-reducer'
import { RequestStatusT } from 'app/app-reducer'
import { TodolistT } from 'features/TodolistList/todolist-types'

let todolistID1: string
let todolistID2: string
let startState: TodolistDomainT[]

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = [
    {
      id: todolistID1,
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistID2,
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ]
})

test('correct todolist should be removed', () => {
  const payload = { todolistID: todolistID1 }
  const action = todolistsThunks.deleteTodolist.fulfilled(payload, '', payload)
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

  const action = todolistsThunks.createTodolist.fulfilled({ todolist }, '', todolist.title)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist'

  const payload = {
    todolistID: todolistID2,
    title: newTodolistTitle,
  }
  const action = todolistsThunks.updateTodolistTitle.fulfilled(payload, '', payload)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterT = 'completed'

  const action = todolistsActions.updateTodolistFilter({
    todolistID: todolistID2,
    filter: newFilter,
  })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {
  const action = todolistsThunks.getTodolists.fulfilled({ todolists: startState }, '')
  const endState = todolistsReducer([], action)
  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
  const newTodolistEntityStatus: RequestStatusT = 'idle'
  const action = todolistsActions.updateTodolistEntityStatus({
    todolistID: todolistID1,
    entityStatus: newTodolistEntityStatus,
  })
  const endState = todolistsReducer(startState, action)
  expect(endState[0].entityStatus).toBe(newTodolistEntityStatus)
  expect(endState[1].entityStatus).toBe(newTodolistEntityStatus)
})
