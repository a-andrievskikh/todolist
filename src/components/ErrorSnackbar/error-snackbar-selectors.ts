import { AppRootStateT } from 'app/store'

export const errorSnackbarSelectors = (s: AppRootStateT) => s.app.error
