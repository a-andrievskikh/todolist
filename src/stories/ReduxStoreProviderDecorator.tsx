import { ReactNode } from 'react'
import { v1 } from 'uuid'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { tasksReducer } from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/model/tasksSlice'
import { todolistsReducer } from 'features/todolists-list/ui/Todolist/model/todolistsSlice'
import { appReducer } from 'app/model/appSlice'
import { AppRootState } from 'app/model/store'
import { TaskStatuses } from 'shared/enums/enums'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialGlobalState: AppRootState = {
  todolists: [
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
      entityStatus: 'loading',
      addedDate: '',
      order: 0,
    },
  ],
  tasks: {
    [todolistID1]: [
      {
        id: v1(),
        title: 'HTML & CSS',
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
        id: v1(),
        title: 'JS',
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
        id: v1(),
        title: 'Book',
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
        id: v1(),
        title: 'Toy',
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
  },
  app: {
    status: 'idle',
    error: null,
    isInitialized: false,
  },
  auth: {
    isLoggedIn: false,
  },
}

export const storybookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}
