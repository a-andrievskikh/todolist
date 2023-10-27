import { useAppDispatch, useAppSelector } from 'app/hooks'
import { RequestStatusT } from 'app/app-slice'
import { isInitializedSelector, isLoggedInSelector, statusSelector } from 'app/app-selectors'
import { logoutTC, meTC } from 'features/Auth/auth-slice'
import { useEffect } from 'react'

export const useApp = () => {
  const status = useAppSelector<RequestStatusT>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const dispatch = useAppDispatch()

  const logOutHandler = () => dispatch(logoutTC())

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  return {
    status,
    isInitialized,
    isLoggedIn,
    logOut: logOutHandler,
  }
}
