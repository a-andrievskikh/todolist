import { appSlice } from 'app/model'
import { todolistsThunks } from 'features/todolists-list/model'

type AppState = ReturnType<typeof appSlice.getInitialState>

let startState: AppState

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('correct error message should be set', () => {
  // const endState = appReducer(startState, appActions.setAppError({ error: 'some error' }))
  const endState = appSlice.reducer(
    startState,
    todolistsThunks.getTodolists.rejected(new Error('some error'), 'requestId')
  )

  expect(endState.error).toBe('some error')
  expect(endState.status).toBe('failed')
})

test('correct status message should be set', () => {
  const endState = appSlice.reducer(
    startState,
    todolistsThunks.getTodolists.fulfilled({ todolists: [] }, 'requestId')
  )

  expect(endState.status).toBe('succeeded')
  expect(endState.error).toBe(null)
})
