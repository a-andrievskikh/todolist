import './App.css'
import { memo, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from './hooks'
import { TodolistList } from 'features/TodolistList/TodolistList'
import { Login } from 'features/Login/Login'
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar'
import { RequestStatusT } from 'app/app-slice'
import { logoutTC, meTC } from 'features/Login/auth-slice'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isInitializedSelector, isLoggedInSelector, statusSelector } from 'app/app-selectors'

export const App = memo(({ demo = false }: AppPropsT) => {
  const status = useAppSelector<RequestStatusT>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const dispatch = useAppDispatch()

  const logOutHandler = () => dispatch(logoutTC())

  useEffect(() => {
    dispatch(meTC())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }
  console.log('App rendered!')
  return (
    <div className='App'>
      <ErrorSnackbar />
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>TODOLIST</Typography>
          {isLoggedIn && (
            <Button color={'warning'} onClick={logOutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress color={'secondary'} />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistList demo={demo} />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path={'*'} element={<Navigate to={'404'} />} />
        </Routes>
      </Container>
    </div>
  )
})

// Types
type AppPropsT = { demo?: boolean }
