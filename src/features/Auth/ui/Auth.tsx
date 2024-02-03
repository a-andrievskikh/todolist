import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'
import { useAuthValidate } from 'features/Auth/hooks/useAuthValidate'
import { useAuth } from 'features/Auth/hooks/useAuth'
import s from './Auth.module.css'

export const Auth = () => {
  const { formik, isButtonDisabled } = useAuthValidate()
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) return <Navigate to={'/'} />

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}
                  rel='noreferrer'
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label='Email' margin='normal' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && (
                <div className={s.error}>{formik.errors.email}</div>
              )}
              <TextField
                type='password'
                label='Password'
                margin='normal'
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={s.error}>{formik.errors.password}</div>
              )}

              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={isButtonDisabled}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
