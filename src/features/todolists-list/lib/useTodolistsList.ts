import { useEffect } from 'react'
import type { TodolistDomain } from 'features/todolists-list/ui/TodolistsList/Todolist'
import { todolistsSelectors, todolistsThunks } from 'features/todolists-list/model'
import { authSelectors } from 'features/auth/model'
import { useActions, useAppSelector } from 'app/store'

type Props = { demo?: boolean }

export const useTodolistsList = ({ demo }: Props) => {
  const { isLoggedInSelector } = authSelectors
  const { todolistsSelector } = todolistsSelectors
  const { getTodolists, addTodolist } = useActions(todolistsThunks)
  const todolists = useAppSelector<TodolistDomain[]>(todolistsSelector)
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)

  const addTodolistCb = (todolistTitle: string) => addTodolist(todolistTitle).unwrap()

  const isDisabled = todolists.some(tl => tl.entityStatus === 'loading')

  useEffect(() => {
    if (demo || !isLoggedIn) return
    getTodolists()
  }, [])

  return { todolists, isLoggedIn, addTodolistCb, isDisabled }
}
