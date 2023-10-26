import { instance } from './basic'
import { ResponseT } from './common-types'
import { AuthDataT } from 'features/Auth/useAuthValidate'

export const authApi = {
  me() {
    return instance.get<ResponseT<UserT>>('auth/me')
  },
  login(loginData: AuthDataT) {
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
