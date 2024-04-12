import { appActions, appReducer } from 'app/model/app-reducer'
import { AppStateT } from 'app/types/app-types'

let startState: AppStateT

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, appActions.setAppError({ error: 'some error' }))

  expect(endState.error).toBe('some error')
  expect(endState.status).toBe('idle')
})

test('correct status message should be set', () => {
  const endState = appReducer(startState, appActions.setAppStatus({ status: 'succeeded' }))

  expect(endState.status).toBe('succeeded')
  expect(endState.error).toBe(null)
})
