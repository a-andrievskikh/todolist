import { AppDispatch } from 'app/model/store'
import axios from 'axios'
import { appActions } from 'app/model/appSlice'

/**
 * Handles server network errors and sets corresponding error messages and statuses in the application state.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function to send actions to the store.
 * @param {unknown} err - The captured error, which can be of any type.
 * @returns {void} Does not return anything.
 *
 * @description This function checks if the caught error is an Axios error, a native JavaScript error, or something else.
 * Depending on the type of error, an appropriate error message is formulated.
 * The error message, as well as the 'failed' status, are set in the global state of the application using actions from appActions.
 */

export const handleServerNetworkError = (dispatch: AppDispatch, err: unknown): void => {
  let errorMessage = 'Some error occurred'

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }
  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
