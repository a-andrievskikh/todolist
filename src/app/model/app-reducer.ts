import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatusT, ResponseErrorT } from 'app/types/app-types'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'loading' as RequestStatusT,
    error: null as ResponseErrorT,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusT }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: ResponseErrorT }>) => {
      state.error = action.payload.error
    },
    setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const appSlice = slice
