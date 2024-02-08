import { FilterT, todolistsActions, todolistsThunks } from 'features/TodolistList/todolists-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useCallback } from 'react'
import { tasksThunks } from 'features/TodolistList/tasks-reducer'
import { TodolistPT } from 'features/TodolistList/Todolist/Todolist'

export const useTodolist = ({ todolist, demo }: TodolistPT) => {
  const dispatch = useAppDispatch()

  const addItem = useCallback(
    (itemTitle: string) => {
      dispatch(tasksThunks.createTask({ todolistID: todolist.id, title: itemTitle }))
    },
    [dispatch, todolist.id]
  )

  const updateTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(todolistsThunks.updateTodolistTitle({ todolistID: todolist.id, title: newTitle }))
    },
    [dispatch, todolist.id]
  )

  const updateTodolistFilter = useCallback(
    (filterValue: FilterT) => {
      dispatch(
        todolistsActions.updateTodolistFilter({ todolistID: todolist.id, filter: filterValue })
      )
    },
    [dispatch, todolist.id]
  )

  const deleteTodolist = useCallback(
    (todolistID: string) => {
      dispatch(todolistsThunks.deleteTodolist({ todolistID }))
    },
    [dispatch]
  )

  return { addItem, updateTodolistTitle, updateTodolistFilter, deleteTodolist }
}
