import { useAppSelector } from 'common/hooks/useAppSelector'
import { isInitializedSelector, statusSelector } from 'app/model/app-selectors'
import { authThunks } from 'features/Auth/model/auth-reducer'
import { useEffect } from 'react'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { RequestStatusT } from 'app/types/app-types'
import { useActions } from 'common/hooks/useActions'

export const useApp = () => {
  const status = useAppSelector<RequestStatusT>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const { logout, initializeApp } = useActions(authThunks)

  const logoutHandler = () => logout()

  useEffect(() => {
    initializeApp()
  }, [])

  return {
    status,
    isInitialized,
    isLoggedIn,
    logout: logoutHandler,
  }
}
