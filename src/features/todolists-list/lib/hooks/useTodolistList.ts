import { useAppSelector } from 'shared/lib'
import { useActions } from 'shared/lib'
import { todolistsThunks } from 'features/todolists-list/model/todolists/todolistsSlice'
import { todolistsSelector } from 'features/todolists-list/model/todolistsListSelectors'
import { isLoggedInSelector } from 'features/auth/model/authSelectors'
import { useCallback, useEffect } from 'react'
import { TodolistDomainT } from 'features/todolists-list/ui/Todolist/types/todolists.types'
import { TodolistsListTypes } from 'features/todolists-list/model/types/todolistsListTypes'

export const useTodolistList = ({ demo }: TodolistsListTypes) => {
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
