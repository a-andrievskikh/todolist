import { Dispatch } from 'redux'
import { BaseResponse } from 'shared/types/common.types'
import { appActions } from 'app/model/appSlice'

/**
 * Handles an error received from the server.
 *
 * @template D - The type of data in the server response.
 * @param {Dispatch} dispatch - Dispatcher function to dispatch Redux actions.
 * @param {BaseResponse<D>} data - Server response data.
 * @param {boolean} [isShowGlobalError=true] - Flag indicating whether to show a global error. The default is true.
 * @returns {void} - The function does not return a value.
 */

export const handleServerAppError = <D>(
  dispatch: Dispatch,
  data: BaseResponse<D>,
  isShowGlobalError: boolean = true
): void => {
  if (isShowGlobalError) {
    const errorText = 'Some error occurred'
    const error = data.messages.length ? data.messages[0] : errorText
    dispatch(appActions.setAppError({ error }))
  }

  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
