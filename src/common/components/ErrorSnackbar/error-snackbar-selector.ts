import { AppRootStateT } from 'app/store'

export const errorSnackbarSelector = (s: AppRootStateT) => s.app.error
