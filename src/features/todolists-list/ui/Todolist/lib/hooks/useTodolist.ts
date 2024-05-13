import {
  todolistsActions,
  todolistsThunks,
} from 'features/todolists-list/model/todolists/todolistsSlice'
import { useCallback } from 'react'
import { tasksThunks } from 'features/todolists-list/model/tasks/tasksSlice'
import { FilterT, TodolistPT } from 'features/todolists-list/ui/Todolist/types/todolists.types'
import { useActions } from 'shared/lib'

export const useTodolist = ({ todolist, demo }: TodolistPT) => {
  const { createTask, updateTodolistTitle, updateTodolistFilter, deleteTodolist } = useActions({
    ...tasksThunks,
    ...todolistsThunks,
    ...todolistsActions,
  })

  const addItem = useCallback(
    (itemTitle: string) => createTask({ todolistID: todolist.id, title: itemTitle }),
    [createTask, todolist.id]
  )

  const updateTodolistTitleCallBack = useCallback(
    (newTitle: string) => {
      updateTodolistTitle({ todolistID: todolist.id, title: newTitle })
    },
    [updateTodolistTitle, todolist.id]
  )

  const updateTodolistFilterCallBack = useCallback(
    (filterValue: FilterT) =>
      updateTodolistFilter({ todolistID: todolist.id, filter: filterValue }),
    [updateTodolistFilter, todolist.id]
  )

  const deleteTodolistCallBack = useCallback(
    (todolistID: string) => deleteTodolist({ todolistID }),
    [deleteTodolist]
  )

  return {
    addItem,
    updateTodolistTitleCallBack,
    updateTodolistFilterCallBack,
    deleteTodolistCallBack,
  }
}
