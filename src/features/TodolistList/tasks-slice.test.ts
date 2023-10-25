import { tasksActions, tasksSlice, TasksStateT } from 'features/TodolistList/tasks-slice'
import { todolistsActions } from 'features/TodolistList/todolists-slice'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from 'api/tasks-api'

let todolistID1: string
let todolistID2: string
let startState: TasksStateT

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = {
    [todolistID1]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: todolistID1,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: todolistID1,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: todolistID1,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
    ],
    [todolistID2]: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: todolistID2,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: todolistID2,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: todolistID2,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
    ],
  }
})

test('correct task should be removed', () => {
  const action = tasksActions.deleteTask({ todolistID: todolistID2, taskID: '2' })
  const endState = tasksSlice(startState, action)

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(2)
  expect(endState[todolistID2].every(x => x.id !== '2')).toBeTruthy()
  expect(endState).toEqual({
    [todolistID1]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: todolistID1,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: todolistID1,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: todolistID1,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
    ],
    [todolistID2]: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: todolistID2,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: todolistID2,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
      },
    ],
  })
})

test('correct task should be added to correct array', () => {
  const action = tasksActions.createTask({
    task: {
      todoListId: todolistID2,
      id: 'id exist',
      title: 'juice',
      status: TaskStatuses.New,
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      order: 0,
      addedDate: '',
    },
  })
  const endState = tasksSlice(startState, action)

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(4)
  expect(endState[todolistID2][0].id).toBeDefined()
  expect(endState[todolistID2][0].title).toBe('juice')
  expect(endState[todolistID2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = tasksActions.updateTask({ todolistID: todolistID2, taskID: '2', model: { status: TaskStatuses.New } })
  const endState = tasksSlice(startState, action)

  expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistID2][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const action = tasksActions.updateTask({ todolistID: todolistID2, taskID: '2', model: { title: 'apple' } })
  const endState = tasksSlice(startState, action)

  expect(endState[todolistID1][1].title).toBe('JS')
  expect(endState[todolistID2][1].title).toBe('apple')
})

test('new array should be added when new todolist is added', () => {
  const action = todolistsActions.createTodolist({
    todolist: { id: 'new id', title: 'new todolist', order: 0, addedDate: '' },
  })
  const endState = tasksSlice(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2)
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = todolistsActions.deleteTodolist({ todolistID: todolistID2 })
  const endState = tasksSlice(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistID2]).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
  const action = todolistsActions.setTodolists({
    todolists: [
      { id: todolistID1, title: 'What to learn', addedDate: '', order: 0 },
      { id: todolistID2, title: 'What to buy', addedDate: '', order: 0 },
    ],
  })
  const endState = tasksSlice({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todolistID1]).toStrictEqual([])
  expect(endState[todolistID2]).toStrictEqual([])
})