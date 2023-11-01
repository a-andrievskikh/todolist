import { deleteTodolistTC, FilterT, todolistsActions, updateTodolistTC } from 'features/TodolistList/todolists-reducer'
import { useAppDispatch } from 'app/hooks/useAppDispatch'
import { useCallback, useEffect } from 'react'
import { createTaskTC, tasksThunks } from 'features/TodolistList/tasks-reducer'
import { TodolistPT } from 'features/TodolistList/Todolist/Todolist'

export const useTodolist = ({ todolist, demo }: TodolistPT) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) return
    dispatch(tasksThunks.getTasks(todolist.id))
  }, [dispatch, demo, todolist.id])

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
