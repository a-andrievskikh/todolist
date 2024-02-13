import { useFormik } from 'formik'
import { authThunks } from 'features/Auth/model/auth-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { AuthDataT } from 'features/Auth/api/auth-api-types'

const validate = (values: FormikErrorT) => {
  const errors: FormikErrorT = {}
  const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  const passwordRegexp = /^.{4,20}$/i

  if (!values.email) {
    errors.email = 'Required'
  } else if (!emailRegexp.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (!passwordRegexp.test(values.password)) {
    errors.password = 'Must be 4 >= character <= 20'
  }
  return errors
}

export const useAuthValidate = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as AuthDataT,
    validate,
    onSubmit: () => {
      dispatch(authThunks.login(formik.values))
      formik.resetForm()
    },
  })

  const isButtonDisabled =
    !!Object.values(formik.errors).length || !formik.values.email || !formik.values.password

  return { formik, isButtonDisabled }
}

// Types
type FormikErrorT = {
  email?: string
  password?: string
}
