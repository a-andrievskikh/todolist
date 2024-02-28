import { instance } from 'common/api/instance'
import { BaseResponseT } from 'common/types/common-types'
import { AuthDataT, UserT } from 'features/Auth/api/auth-api-types'

export const authApi = {
  login: (loginData: AuthDataT) =>
    instance.post<BaseResponseT<{ userId: number }>>('auth/login', loginData),
  logout: () => instance.delete<BaseResponseT>('auth/login'),
  me: () => instance.get<BaseResponseT<UserT>>('auth/me'),
}
