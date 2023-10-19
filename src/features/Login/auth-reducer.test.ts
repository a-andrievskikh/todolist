import { authReducer, AuthStateT, setIsLoggedAC } from './auth-reducer'

let startState: AuthStateT

beforeEach(() => {
  startState = {
    isLoggedIn: false,
  }
})

test('login status should be changed', () => {
  const endState = authReducer(startState, setIsLoggedAC(true))

  expect(endState.isLoggedIn).toBe(true)
})
