import './App.css'
import { memo } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import { TodolistList } from 'features/TodolistList/TodolistList'
import { Auth } from 'features/Auth/Auth'
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from 'app/useApp'

export const App = memo(({ demo = false }: AppPT) => {
  const { status, isInitialized, isLoggedIn, logOut } = useApp()

  const progressStyles: React.CSSProperties = { position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }

  if (!isInitialized) {
    return (
      <div style={progressStyles}>
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
            <Button color={'warning'} onClick={logOut}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress color={'secondary'} />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistList demo={demo} />} />
          <Route path={'/login'} element={<Auth />} />
          <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path={'*'} element={<Navigate to={'404'} />} />
        </Routes>
      </Container>
    </div>
  )
})

// Types
type AppPT = { demo?: boolean }
