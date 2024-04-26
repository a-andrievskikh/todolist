import { ChangeEvent, useCallback } from 'react'
import { tasksThunks } from 'features/TodolistList/Todolist/Task/model/tasks-reducer'
import { TaskStatuses } from 'common/enums/enums'
import { useActions } from 'common/hooks/useActions'

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
    (taskTitle: string) => {
      updateTask({ todolistID, taskID, model: { title: taskTitle } })
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
