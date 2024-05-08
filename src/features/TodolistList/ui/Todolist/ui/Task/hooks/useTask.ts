import { ChangeEvent, useCallback } from 'react'
import { tasksThunks } from 'features/TodolistList/ui/Todolist/ui/Task/model/tasks-reducer'
import { TaskStatuses } from 'shared/enums/enums'
import { useActions } from 'shared/lib'

export const useTask = (todolistID: string, taskID: string, status: TaskStatuses) => {
  const { deleteTask, updateTask } = useActions(tasksThunks)

  const deleteTaskCallBack = useCallback(
    () => deleteTask({ todolistID, taskID }),
    [deleteTask, todolistID, taskID]
  )

  const updateTaskStatusCallBack = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateTask({
        todolistID,
        taskID,
        model: {
          status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        },
      })
    },
    [updateTask, todolistID, taskID]
  )

  const updateTaskTitleCallBack = useCallback(
    (title: string) => {
      updateTask({ todolistID, taskID, model: { title } })
    },
    [updateTask, todolistID, taskID]
  )

  const listItemClassName = status === TaskStatuses.Completed ? 'isDone' : ''

  return {
    deleteTaskCallBack,
    updateTaskStatusCallBack,
    updateTaskTitleCallBack,
    listItemClassName,
  }
}
