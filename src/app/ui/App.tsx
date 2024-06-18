import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import { AppRoutes } from 'app/ui/AppRoutes'
import { ErrorSnackbar } from 'shared/ui'
import s from './App.module.css'
import { appSelectors } from 'app/model'
import { authSelectors, authThunks } from 'features/auth/model'
import { useActions, useAppSelector } from 'app/store'
import type { RequestStatus } from 'shared/types'
import { useEffect } from 'react'

export const App = () => {
  const { logout, initializeApp } = useActions(authThunks)
  const { statusSelector, isInitializedSelector } = appSelectors
  const { isLoggedInSelector } = authSelectors
  const status = useAppSelector<RequestStatus>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
  const logoutHandler = () => logout()

  useEffect(() => {
    if (!isInitialized) {
      initializeApp()
    }
  }, [isInitialized, initializeApp])

  const progressView = status === 'loading' && <LinearProgress color={'secondary'} />

  if (!isInitialized) {
    return (
      <div className={s.progress}>
        <CircularProgress />
      </div>
    )
  }
  console.log('reload!')
  return (
    <div className='App'>
      <ErrorSnackbar />
      <AppBar position={'static'}>
        <Toolbar className={s.toolbar}>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>TODOLIST</Typography>
          {isLoggedIn && (
            <Button color={'warning'} onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {progressView}
      </AppBar>
      <Container fixed>
        <AppRoutes />
      </Container>
    </div>
  )
}
