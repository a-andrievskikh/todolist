import { useAppSelector } from 'shared/lib'
import { useActions } from 'shared/lib'
import { isInitializedSelector, statusSelector } from 'app/model/appSelectors'
import { authThunks } from 'features/auth/model/authSlice'
import { useEffect } from 'react'
import { isLoggedInSelector } from 'features/auth/model/authSelectors'
import { RequestStatus } from 'app/ui/App.types'

export const useApp = () => {
  const status = useAppSelector<RequestStatus>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const { logout, initializeApp } = useActions(authThunks)

  const logoutHandler = () => logout()

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  return {
    status,
    isInitialized,
    isLoggedIn,
    logout: logoutHandler,
  }
}
