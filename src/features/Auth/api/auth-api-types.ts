export type AuthDataT = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type UserT = {
  id: number
  email: string
  login: string
}
