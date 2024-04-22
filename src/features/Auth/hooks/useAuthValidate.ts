import { FormikHelpers, FormikErrors, useFormik } from 'formik'
import { authThunks } from 'features/Auth/model/auth-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { AuthDataT } from 'features/Auth/types/auth-api-types'
import { BaseResponseT } from 'common/types'
import { useActions } from 'common/hooks/useActions'

const validate = (values: FormikErrors<FormikErrorT>) => {
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as AuthDataT,
    validate,
    onSubmit: (values, formikHelpers: FormikHelpers<AuthDataT>) => {
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

  return { formik, isButtonDisabled }
}

// Types
type FormikErrorT = {
  email?: string
  password?: string
}
