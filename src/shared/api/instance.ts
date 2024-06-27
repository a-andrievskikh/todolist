import axios from 'axios'
import { authApiKey, authData } from 'authData'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': authApiKey,
    Authorization: authData,
  },
})
