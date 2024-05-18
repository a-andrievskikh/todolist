import { useCallback } from 'react'
import { tasksThunks } from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/model/tasksSlice'
import type { TodolistDomain } from 'features/todolists-list/ui/Todolist/model/types/todolists.types'
import { useActions } from 'shared/lib'

export const useTodolist = (todolist: TodolistDomain) => {
  const { createTask } = useActions(tasksThunks)

  const addItemCb = useCallback(
    (title: string) => createTask({ todolistID: todolist.id, title }),
    [createTask, todolist.id]
  )

  return {
    addItemCb,
  }
}
