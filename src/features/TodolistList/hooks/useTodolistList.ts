import { useAppDispatch } from 'app/hooks/useAppDispatch'
import { useAppSelector } from 'app/hooks/useAppSelector'
import { createTodolistTC, getTodolistsTC, TodolistDomainT } from 'features/TodolistList/todolists-reducer'
import { todolistsSelector } from 'features/TodolistList/todolistList-selector'
import { isLoggedInSelector } from 'features/Auth/auth-selectors'
import { useCallback, useEffect } from 'react'
import { TodolistListPropsT } from 'features/TodolistList/TodolistList'

export const useTodolistList = ({ demo }: TodolistListPropsT) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<TodolistDomainT[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolist = useCallback(
    (todolistTitle: string) => {
      dispatch(createTodolistTC(todolistTitle))
    },
    [dispatch]
  )

  useEffect(() => {
    if (demo || !isLoggedIn) return
    dispatch(getTodolistsTC())
  }, [demo, isLoggedIn, dispatch])

  return { todolists, isLoggedIn, addTodolist }
}
