import { AppRootStateT } from 'app/store'

export const statusSelector = (s: AppRootStateT) => s.app.status
export const isInitializedSelector = (s: AppRootStateT) => s.app.isInitialized
export const isLoggedInSelector = (s: AppRootStateT) => s.auth.isLoggedIn
