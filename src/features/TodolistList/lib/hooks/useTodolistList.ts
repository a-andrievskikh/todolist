import { useAppSelector } from 'shared/lib'
import { useActions } from 'shared/lib'
import { todolistsThunks } from 'features/TodolistList/ui/Todolist/model/todolist-reducer'
import { todolistsSelector } from 'features/TodolistList/model/todolistList-selector'
import { isLoggedInSelector } from 'features/Auth/model/auth-selectors'
import { useCallback, useEffect } from 'react'
import { TodolistDomainT } from 'features/TodolistList/ui/Todolist/types/todolist-types'
import { TodolistListTypes } from 'features/TodolistList/types/todolistList-types'

export const useTodolistList = ({ demo }: TodolistListTypes) => {
  const { createTodolist, getTodolists } = useActions(todolistsThunks)
  const todolists = useAppSelector<TodolistDomainT[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolist = useCallback(
    (todolistTitle: string) => createTodolist(todolistTitle),
    [createTodolist]
  )

  useEffect(() => {
    if (demo || !isLoggedIn) return
    getTodolists()
  }, [demo, isLoggedIn, getTodolists])

  return { todolists, isLoggedIn, addTodolist }
}
