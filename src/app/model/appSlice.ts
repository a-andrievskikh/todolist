import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import type { AppRootState } from 'app/store'
import type { RequestStatus } from 'shared/types'
import { authThunks } from 'features/auth/model'
import { todolistsThunks, tasksThunks } from 'features/todolists-list/model'

type ResponseError = string | null

const initialState = {
  status: 'loading' as RequestStatus,
  error: null as ResponseError,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: ResponseError }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = 'failed'
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.initializeApp.rejected.type
          ) {
            return
          }
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred!'
        }
      })
      .addMatcher(
        isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected),
        state => {
          state.isInitialized = true
        }
      )
  },
})

const statusSelector = (s: AppRootState) => s.app.status
const isInitializedSelector = (s: AppRootState) => s.app.isInitialized
const errorSnackbarSelector = (s: AppRootState) => s.app.error

export const appSlice = slice
export const appReducer = slice.reducer
export const appActions = slice.actions
export const appSelectors = { statusSelector, isInitializedSelector, errorSnackbarSelector }
