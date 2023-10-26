import { AppRootStateT } from 'app/store'

export const authSelectors = (s: AppRootStateT) => s.auth.isLoggedIn