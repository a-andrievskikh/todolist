import axios from 'axios'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { authApi } from 'api/auth-api'
import { ResultCodes } from 'api/todolists-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from 'app/app-slice'
import { clearData } from 'common/actions/clearData'
import { AuthDataT } from 'features/Auth/useAuthValidate'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authSlice = slice.reducer
export const authActions = slice.actions

// Thunks
export const authTC =
  (data: AuthDataT): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await authApi.login(data)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        handleServerNetworkError(dispatch, e)
      } else {
        handleServerNetworkError(dispatch, e as Error)
      }
    }
  }
export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  try {
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
      dispatch(clearData())
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e)
    } else {
      handleServerNetworkError(dispatch, e as Error)
    }
  }
}
export const meTC = (): AppThunk => async dispatch => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  try {
    const res = await authApi.me()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e)
    } else {
      handleServerNetworkError(dispatch, e as Error)
    }
  } finally {
    dispatch(appActions.setInitialized({ isInitialized: true }))
  }
}

// Types
export type AuthStateT = ReturnType<typeof authSlice>

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
