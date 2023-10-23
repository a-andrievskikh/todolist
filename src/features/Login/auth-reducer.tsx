import { setAppStatusAC, setInitializedAC } from 'app/app-reducer'
import axios from 'axios'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { authApi } from 'api/auth-api'
import { ResultCodes } from 'api/todolists-api'
import { LoginDataType } from './Login'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions

// Thunks
export const loginTC =
  (data: LoginDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authApi.login(data)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e.message)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }
export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const meTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authApi.me()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  } finally {
    dispatch(setInitializedAC(true))
  }
}

// Types
export type AuthActionsT = ReturnType<typeof setIsLoggedInAC>
export type AuthStateT = ReturnType<typeof authReducer>

type ErrorType = {
  statusCode: 0
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
