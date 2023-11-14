import { authReducer, AuthStateT, authThunks } from 'features/Auth/model/auth-reducer'

let startState: AuthStateT

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authReducer(startState, authThunks.login.fulfilled({ isLoggedIn: true }))

  expect(endState.isLoggedIn).toBe(true)
})
