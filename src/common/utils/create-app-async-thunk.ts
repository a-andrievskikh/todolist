import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootStateT } from 'app/store'
import { BaseResponseT } from 'common/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateT
  dispatch: AppDispatch
  rejectValue: BaseResponseT | null
}>()
