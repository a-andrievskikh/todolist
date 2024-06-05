import { instance } from 'shared/api'
import type { BaseResponse } from 'shared/types'

import { AuthParams } from 'features/auth/types'

type User = {
  id: number
  email: string
  login: string
}

const BASE_URL = 'auth'

export const authApi = {
  login: (loginData: AuthParams) =>
    instance.post<BaseResponse<{ userId: number }>>(`${BASE_URL}/login`, loginData),
  logout: () => instance.delete<BaseResponse>(`${BASE_URL}/login`),
  me: () => instance.get<BaseResponse<User>>(`${BASE_URL}/me`),
}
