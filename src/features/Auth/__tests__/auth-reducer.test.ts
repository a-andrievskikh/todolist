import { authReducer, authThunks } from 'features/Auth/model/auth-reducer'
import { AuthDataT } from 'features/Auth/types/auth-api-types'
import { AuthStateT } from 'features/Auth/model/auth-state-types'

let startState: AuthStateT

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authReducer(
    startState,
    authThunks.login.fulfilled({ isLoggedIn: true }, '', {} as AuthDataT)
  )

  expect(endState.isLoggedIn).toBe(true)
})
