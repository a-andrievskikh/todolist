import { store } from 'app/store'
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
/**
 * Custom hook that wraps around `bindActionCreators` from Redux. It binds action creators to the dispatch function.
 *
 * @template T The type of the action creators object.
 * @param {T} actions The object containing one or more action creators.
 * @returns {RemapActionCreators<T>} An object mirroring the original `actions` object but with each function
 * dispatching the actions directly.
 */
export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch),
    [actions, dispatch]
  )
}
// Types
/**
 * Utility type that checks if the provided type `T` is a valid argument to iterate over its keys.
 *
 * @template T The type to validate.
 * @returns {boolean} `true` if `T` is an object with enumerable properties, otherwise `false`.
 */
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
/**
 * Type that extracts the return type of the action creators passed to `useActions`.
 *
 * @template T The action creator function type.
 * @returns The return type of the action creators.
 */
type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
/**
 * Type that replaces the return type of the function type `T` with a new return type `TNewReturn`.
 * It checks if the provided function type `T` has valid arguments.
 *
 * @template T The original function type.
 * @template TNewReturn The new return type for the function.
 * @returns A function type with the provided new return type `TNewReturn`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ReplaceReturnType<T, TNewReturn> = T extends (...args: any[]) => infer R
  ? IsValidArg<Extract<T, (...args: any[]) => any>> extends true
    ? (...args: Parameters<Extract<T, (...args: any[]) => any>>) => TNewReturn
    : () => TNewReturn
  : never
/**
 * Utility type that remaps the action creators object `T` to a new object with the same keys.
 * The functions within the object are modified to dispatch the action creators directly, in place of returning them.
 *
 * @template T The type of the action creators object.
 * @returns A remapped object with the same keys as `T` but with dispatching functions.
 */
type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}
