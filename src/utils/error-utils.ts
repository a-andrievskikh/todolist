import { Dispatch } from 'redux'
import { ResponseT } from 'api/common-types'
import { appActions } from 'app/app-reducer'

const errorText = 'Some error occurred'

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseT<D>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: errorText }))
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
  dispatch(appActions.setAppError({ error: error.message ? error.message : errorText }))
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
