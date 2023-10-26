import { useAppSelector } from 'app/hooks'
import { authSelectors } from 'features/Auth/auth-selectors'

export const useAuth = () => {
  const isLoggedIn = useAppSelector<boolean>(authSelectors)

  return { isLoggedIn }
}
