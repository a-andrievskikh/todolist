import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import {
  getTodolists,
  todolistsThunks,
} from 'features/TodolistList/Todolist/model/todolist-reducer'
import { todolistsSelector } from 'features/TodolistList/model/todolistList-selector'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { useCallback, useEffect } from 'react'
import { TodolistDomainT } from 'features/TodolistList/Todolist/types/todolist-types'
import { TodolistListTypes } from 'features/TodolistList/types/todolistList-types'

export const useTodolistList = ({ demo }: TodolistListTypes) => {
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
