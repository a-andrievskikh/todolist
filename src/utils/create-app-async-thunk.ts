import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, AppRootStateT } from 'app/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateT
  dispatch: AppDispatch
  rejectValue: null
}>()
