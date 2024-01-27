import { appActions } from 'app/app-reducer'
import { authApi } from 'features/Auth/api/auth-api'
import { AuthDataT } from 'features/Auth/api/auth-api-types'
import { createSlice } from '@reduxjs/toolkit'
import { clearData } from 'common/actions/clearData'
import { handleServerAppError } from 'common/utils/handle-server-app-error'
import { handleServerNetworkError } from 'common/utils/handle-server-network-error'
import { ResultCodes } from 'common/enums/enums'
import { createAppAsyncThunk } from 'common/utils'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, state => {
        state.isLoggedIn = true
      })
      .addCase(logout.fulfilled, state => {
        state.isLoggedIn = false
      })
      .addCase(me.fulfilled, state => {
        state.isLoggedIn = true
      })
  },
})

// Thunks
const login = createAppAsyncThunk<void, AuthDataT>(
  `${slice.name}/login`,
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await authApi.login(arg)
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(res.data)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

const logout = createAppAsyncThunk<void, void>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    try {
      const res = await authApi.logout()
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(clearData())
        return
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      return rejectWithValue(null)
    }
  }
)

const me = createAppAsyncThunk<void, void>(
  `${slice.name}/me`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      const res = await authApi.me()
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return
      }
      return rejectWithValue(null)
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      rejectWithValue(null)
    } finally {
      dispatch(appActions.setInitialized({ isInitialized: true }))
    }
  }
)

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { login, logout, me }

// Types
export type AuthStateT = ReturnType<typeof authReducer>
