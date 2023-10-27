import { useAppDispatch } from 'app/hooks/useAppDispatch'
import { useAppSelector } from 'app/hooks/useAppSelector'
import { RequestStatusT } from 'app/app-reducer'
import { isInitializedSelector, statusSelector } from 'app/app-selectors'
import { logoutTC, meTC } from 'features/Auth/auth-reducer'
import { useEffect } from 'react'
import { isLoggedInSelector } from 'features/Auth/auth-selectors'

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
