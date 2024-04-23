import { useAppSelector } from 'common/hooks/useAppSelector'
import { todolistsThunks } from 'features/TodolistList/Todolist/model/todolist-reducer'
import { todolistsSelector } from 'features/TodolistList/model/todolistList-selector'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { useCallback, useEffect } from 'react'
import { TodolistDomainT } from 'features/TodolistList/Todolist/types/todolist-types'
import { TodolistListTypes } from 'features/TodolistList/types/todolistList-types'
import { useActions } from 'common/hooks/useActions'

export const useTodolistList = ({ demo }: TodolistListTypes) => {
  const { createTodolist, getTodolists } = useActions(todolistsThunks)
  const todolists = useAppSelector<TodolistDomainT[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolist = useCallback((todolistTitle: string) => createTodolist(todolistTitle), [])

  useEffect(() => {
    if (demo || !isLoggedIn) return
    getTodolists()
  }, [demo, isLoggedIn])

  return { todolists, isLoggedIn, addTodolist }
}
