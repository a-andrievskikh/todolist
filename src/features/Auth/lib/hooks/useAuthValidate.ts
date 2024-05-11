import { FormikHelpers, useFormik } from 'formik'
import { authThunks } from 'features/Auth/model/auth-reducer'
import { AuthParamsT, FormikErrorT } from 'features/Auth/types/auth-types'
import { BaseResponseT } from 'shared/types'
import { useActions, useAppSelector } from 'shared/lib'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'

const validate = (values: AuthParamsT) => {
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
  const { login } = useActions(authThunks)
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: (values, formikHelpers: FormikHelpers<AuthParamsT>) => {
      login(values)
        .unwrap()
        .catch((e: BaseResponseT) => {
          e.fieldsErrors?.forEach(fieldError =>
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          )
        })
      // formik.resetForm()
    },
  })

  const isButtonDisabled =
    !!Object.values(formik.errors).length || !formik.values.email || !formik.values.password

  return { formik, isLoggedIn, isButtonDisabled }
}
