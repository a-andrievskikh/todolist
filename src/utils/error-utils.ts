import { setAppErrorAC, setAppStatusAC } from 'app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseT } from 'api/common-types'

const errorText = 'Some error occurred'

export const handleServerAppError = <D>(dispatch: Dispatch<ErrorUtilsDispatchT>, data: ResponseT<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: errorText }))
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchT>, error: string) => {
  dispatch(setAppErrorAC({ error } ? { error } : { error: errorText }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}

// Types
type ErrorUtilsDispatchT = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>
