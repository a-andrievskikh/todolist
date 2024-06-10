import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit'
import type { AppRootState } from 'app/store'
import { createAppAsyncThunk } from 'shared/lib'
import { ResultCodes } from 'shared/enums'
import { clearData } from 'shared/actions'
import { authApi } from 'features/auth/api'
import { AuthParams } from 'features/auth/types'

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }
    )
  },
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, AuthParams>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authApi.login(arg)
    return res.data.resultCode === ResultCodes.Success
      ? { isLoggedIn: true }
      : rejectWithValue(res.data)
  }
)
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(clearData())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue }) => {
    const res = await authApi.me()
    return res.data.resultCode === ResultCodes.Success
      ? { isLoggedIn: true }
      : rejectWithValue(res.data)
  }
)

const isLoggedInSelector = (s: AppRootState) => s.auth.isLoggedIn

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
export const authSelectors = { isLoggedInSelector }
