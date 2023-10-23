import { appReducer, AppStateT, setAppErrorAC, setAppStatusAC } from './app-reducer'

let startState: AppStateT

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC({ error: 'some error' }))

  expect(endState.error).toBe('some error')
  expect(endState.status).toBe('idle')
})

test('correct status message should be set', () => {
  const endState = appReducer(startState, setAppStatusAC({ status: 'succeeded' }))

  expect(endState.status).toBe('succeeded')
  expect(endState.error).toBe(null)
})
