import { ReactNode } from 'react'
import { v1 } from 'uuid'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { appSlice } from 'app/model'
import type { AppRootState } from 'app/store'
import { TaskStatuses } from 'shared/enums'
import { tasksReducer, todolistsReducer } from 'features/todolists-list/model'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appSlice.reducer,
  },
})

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialGlobalState: AppRootState = {
  todolists: [
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

const storybookStore = createStore(store.getState, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}
