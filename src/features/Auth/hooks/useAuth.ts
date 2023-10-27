import { authSelectors } from 'features/Auth/auth-selectors'
import { useAppSelector } from 'app/hooks/useAppSelector'

export const useAuth = () => {
  const isLoggedIn = useAppSelector<boolean>(authSelectors)

  return { isLoggedIn }
}
