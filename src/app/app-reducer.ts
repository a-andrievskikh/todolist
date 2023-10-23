import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'loading' as RequestStatusT,
    error: null as ResponseErrorT,
    isInitialized: false as boolean,
    //'Error message 😠'
  } as AppStateT,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusT }>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: ResponseErrorT }>) => {
      state.error = action.payload.error
    },
    setInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC, setInitializedAC } = slice.actions

// Types
export type AppActionsT =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setInitializedAC>

export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorT = string | null
export type AppStateT = {
  status: RequestStatusT
  error: ResponseErrorT
  isInitialized: boolean
}
