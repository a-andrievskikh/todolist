import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { isInitializedSelector, statusSelector } from 'app/model/app-selectors'
import { authThunks } from 'features/Auth/model/auth-reducer'
import { useEffect } from 'react'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { RequestStatusT } from 'app/types/app-types'

export const useApp = () => {
  const status = useAppSelector<RequestStatusT>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const dispatch = useAppDispatch()

  const logOutHandler = () => dispatch(authThunks.logout())

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [dispatch])

  return {
    status,
    isInitialized,
    isLoggedIn,
    logOut: logOutHandler,
  }
}
