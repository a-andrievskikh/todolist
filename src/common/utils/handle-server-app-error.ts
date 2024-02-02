import { Dispatch } from 'redux'
import { BaseResponseT } from 'common/types/common-types'
import { appActions } from 'app/app-reducer'

export const handleServerAppError = <D>(dispatch: Dispatch, data: BaseResponseT<D>) => {
  const errorText = 'Some error occurred'

  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: errorText }))
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
