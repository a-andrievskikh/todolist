import { authReducer, authThunks } from 'features/auth/model'

import { AuthParams } from 'features/auth/types'

type AuthState = ReturnType<typeof authReducer>
let startState: AuthState

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authReducer(
    startState,
    authThunks.login.fulfilled({ isLoggedIn: true }, '', {} as AuthParams)
  )

  expect(endState.isLoggedIn).toBe(true)
})
