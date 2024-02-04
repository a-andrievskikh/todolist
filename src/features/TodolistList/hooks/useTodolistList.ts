import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import {
  getTodolists,
  TodolistDomainT,
  todolistsThunks,
} from 'features/TodolistList/todolists-reducer'
import { todolistsSelector } from 'features/TodolistList/todolistList-selector'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { useCallback, useEffect } from 'react'
import { TodolistListPropsT } from 'features/TodolistList/TodolistList'

export const useTodolistList = ({ demo }: TodolistListPropsT) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<TodolistDomainT[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolist = useCallback(
    (todolistTitle: string) => {
      dispatch(todolistsThunks.createTodolist(todolistTitle))
    },
    [dispatch]
  )

  useEffect(() => {
    if (demo || !isLoggedIn) return
    dispatch(getTodolists())
  }, [demo, isLoggedIn, dispatch])

  return { todolists, isLoggedIn, addTodolist }
}
