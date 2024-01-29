import { AppRootStateT } from 'app/store'

export const isLoggedInSelector = (s: AppRootStateT) => s.auth.isLoggedIn
