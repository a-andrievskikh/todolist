import { instance } from './basic'
import { AuthDataType } from 'features/Auth/Auth'
import { ResponseT } from './common-types'

export const authApi = {
  me() {
    return instance.get<ResponseT<UserT>>('auth/me')
  },
  login(loginData: AuthDataType) {
    return instance.post<ResponseT<{ userId: number }>>('auth/login', loginData)
  },
  logout() {
    return instance.delete<ResponseT>('auth/login')
  },
}

//Types
type UserT = {
  id: number
  email: string
  login: string
}
