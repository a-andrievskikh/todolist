import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { RequestStatusT } from 'app/app-reducer'
import { isInitializedSelector, statusSelector } from 'app/app-selectors'
import { authThunks } from 'features/Auth/model/auth-reducer'
import { useEffect } from 'react'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'

export const useApp = () => {
  const status = useAppSelector<RequestStatusT>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const dispatch = useAppDispatch()

  const logOutHandler = () => dispatch(authThunks.logout())

  useEffect(() => {
    dispatch(authThunks.me())
  }, [dispatch])

  return {
    status,
    isInitialized,
    isLoggedIn,
    logOut: logOutHandler,
  }
}
