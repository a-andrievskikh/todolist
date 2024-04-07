import './App.css'
import { CSSProperties, memo } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import { useApp } from 'app/hooks/useApp'
import { AppRoutes } from 'app/AppRoutes'
import { ErrorSnackbar } from 'common/components'

export const App = memo(({ demo = false }: AppPT) => {
  const { status, isInitialized, isLoggedIn, logOut } = useApp()
  const progressStyles: CSSProperties = {
    position: 'fixed',
    top: '30%',
    textAlign: 'center',
    width: '100%',
  }
  const progressView = status === 'loading' && <LinearProgress color={'secondary'} />

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
        <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>TODOLIST</Typography>
          {isLoggedIn && (
            <Button color={'warning'} onClick={logOut}>
              Logout
            </Button>
          )}
        </Toolbar>
        {progressView}
      </AppBar>
      <Container fixed>
        <AppRoutes demo={demo} />
      </Container>
    </div>
  )
})

// Types
export type AppPT = { demo?: boolean }
