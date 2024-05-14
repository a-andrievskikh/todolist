import 'app/ui/App.module.css'
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
import { useApp } from 'app/lib/hooks/useApp'
import { AppRoutes } from 'app/ui/AppRoutes'
import { ErrorSnackbar } from 'shared/ui'
import { AppProps } from 'app/model/types/app.types'

export const App = memo(({ demo = false }: AppProps) => {
  const { status, isInitialized, isLoggedIn, logout } = useApp()

  const progressStyles: CSSProperties = {
    position: 'fixed',
    top: '30%',
    textAlign: 'center',
    width: '100%',
  }

  const toolbarStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

  const progressView = status === 'loading' && <LinearProgress color={'secondary'} />

  if (!isInitialized) {
    return (
      <div style={progressStyles}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className='App'>
      <ErrorSnackbar />
      <AppBar position={'static'}>
        <Toolbar style={toolbarStyles}>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>TODOLIST</Typography>
          {isLoggedIn && (
            <Button color={'warning'} onClick={logout}>
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
