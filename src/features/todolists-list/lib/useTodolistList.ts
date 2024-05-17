import { useAppSelector } from 'shared/lib'
import { useActions } from 'shared/lib'
import { todolistsThunks } from 'features/todolists-list/ui/Todolist/model/todolistsSlice'
import { todolistsSelector } from 'features/todolists-list/model/todolistsListSelectors'
import { isLoggedInSelector } from 'features/auth/model/authSelectors'
import { useCallback, useEffect } from 'react'
import { TodolistDomain } from 'features/todolists-list/ui/Todolist/model/types/todolists.types'
import { TodolistsListTypes } from 'features/todolists-list/model/types/todolistsListTypes'

export const useTodolistList = ({ demo }: TodolistsListTypes) => {
  const { addTodolist, getTodolists } = useActions(todolistsThunks)
  const todolists = useAppSelector<TodolistDomain[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolistCb = useCallback(
    (todolistTitle: string) => addTodolist(todolistTitle).unwrap(),
    [addTodolist]
  )

  useEffect(() => {
    if (demo || !isLoggedIn) return
    getTodolists()
  }, [demo, isLoggedIn, getTodolists])

  return { todolists, isLoggedIn, addTodolistCb }
}
