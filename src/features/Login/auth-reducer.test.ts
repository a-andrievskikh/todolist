import { authReducer, AuthStateT, setIsLoggedInAC } from './auth-reducer'

let startState: AuthStateT

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authReducer(startState, setIsLoggedInAC({ isLoggedIn: true }))

  expect(endState.isLoggedIn).toBe(true)
})
