import { authActions, authReducer, AuthStateT } from 'features/Auth/auth-reducer'

let startState: AuthStateT

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authReducer(startState, authActions.setIsLoggedIn({ isLoggedIn: true }))

  expect(endState.isLoggedIn).toBe(true)
})
