import { authActions, authSlice, AuthStateT } from 'features/Login/auth-slice'

let startState: AuthStateT

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authSlice(startState, authActions.setIsLoggedIn({ isLoggedIn: true }))

  expect(endState.isLoggedIn).toBe(true)
})
