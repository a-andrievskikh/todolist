import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from 'shared/enums'
import type { TasksState } from 'shared/types'
import { tasksReducer, tasksThunks } from 'features/todolists-list/model'
import { todolistsThunks } from 'features/todolists-list/model'

let todolistID1: string
let todolistID2: string
let startState: TasksState

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

test('tasks should be added to todolist', () => {
  const action = tasksThunks.getTasks.fulfilled(
    { todolistID: todolistID1, tasks: startState[todolistID1] },
    '',
    ''
  )
  const endState = tasksReducer({ [todolistID1]: [], [todolistID2]: [] }, action)

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(0)
})

test('correct task should be removed', () => {
  const action = tasksThunks.deleteTask.fulfilled(
    { arg: { todolistID: todolistID2, taskID: '2' } },
    '',
    {
      todolistID: todolistID2,
      taskID: '2',
    }
  )
  const endState = tasksReducer(startState, action)

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
  const newTitle = 'juice'
  const task = {
    todoListId: todolistID2,
    id: 'id exist',
    title: newTitle,
    status: TaskStatuses.New,
    description: '',
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    order: 0,
    addedDate: '',
  }
  const action = tasksThunks.addTask.fulfilled({ task }, '', {
    todolistID: task.todoListId,
    title: task.title,
  })
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(4)
  expect(endState[todolistID2][0].id).toBeDefined()
  expect(endState[todolistID2][0].title).toBe(newTitle)
  expect(endState[todolistID2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const payload = {
    todolistID: todolistID2,
    taskID: '2',
    model: { status: TaskStatuses.New },
  }
  const action = tasksThunks.changeTask.fulfilled(payload, '', payload)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistID2][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const payload = { todolistID: todolistID2, taskID: '2', model: { title: 'apple' } }
  const action = tasksThunks.changeTask.fulfilled(payload, '', payload)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1][1].title).toBe('JS')
  expect(endState[todolistID2][1].title).toBe('apple')
})

test('new array should be added when new todolist is added', () => {
  const payload = {
    todolist: { id: 'new id', title: 'new todolist', order: 0, addedDate: '' },
  }
  const action = todolistsThunks.addTodolist.fulfilled(payload, '', payload.todolist.title)
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2)
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const payload = { todolistID: todolistID2 }
  const action = todolistsThunks.deleteTodolist.fulfilled(payload, '', todolistID2)
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistID2]).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
  const payload = {
    todolists: [
      { id: todolistID1, title: 'What to learn', addedDate: '', order: 0 },
      { id: todolistID2, title: 'What to buy', addedDate: '', order: 0 },
    ],
  }
  const action = todolistsThunks.getTodolists.fulfilled(payload, '')
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todolistID1]).toStrictEqual([])
  expect(endState[todolistID2]).toStrictEqual([])
})
