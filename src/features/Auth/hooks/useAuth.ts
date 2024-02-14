import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const useAuth = () => {
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
  return { isLoggedIn }
}
