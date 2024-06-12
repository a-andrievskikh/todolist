import { forwardRef, SyntheticEvent } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useActions, useAppSelector } from 'app/store'
import { appActions, appSelectors } from 'app/model'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {
  const { setAppError } = useActions(appActions)
  const { errorSnackbarSelector } = appSelectors
  const error = useAppSelector(errorSnackbarSelector)

  const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setAppError({ error: null })
  }

  return (
    <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
