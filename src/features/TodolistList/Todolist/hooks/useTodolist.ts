import {
  deleteTodolistTC,
  FilterT,
  TodolistDomainT,
  todolistsActions,
  updateTodolistTC,
} from 'features/TodolistList/todolists-reducer'
import { useAppDispatch } from 'app/hooks/useAppDispatch'
import { useCallback } from 'react'
import { createTaskTC } from 'features/TodolistList/tasks-reducer'

export const useTodolist = (todolist: TodolistDomainT) => {
  const dispatch = useAppDispatch()
  const addItem = useCallback(
    (itemTitle: string) => {
      dispatch(createTaskTC(todolist.id, itemTitle))
    },
    [dispatch, todolist.id]
  )

  const updateTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTodolistTC(todolist.id, newTitle))
    },
    [dispatch, todolist.id]
  )

  const updateTodolistFilter = useCallback(
    (filterValue: FilterT) => {
      dispatch(todolistsActions.updateTodolistFilter({ todolistID: todolist.id, filter: filterValue }))
    },
    [dispatch, todolist.id]
  )

  const deleteTodolist = useCallback(
    (todolistID: string) => {
      dispatch(deleteTodolistTC(todolistID))
    },
    [dispatch]
  )

  return { addItem, updateTodolistTitle, updateTodolistFilter, deleteTodolist }
}
