import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'loading' as RequestStatusT,
    error: null as ResponseErrorT,
    isInitialized: false,
    //'Error message 😠'
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

// Types
export type AppStateT = ReturnType<typeof slice.getInitialState>
export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorT = string | null
