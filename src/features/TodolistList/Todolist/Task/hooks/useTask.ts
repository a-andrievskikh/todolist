import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { ChangeEvent, useCallback } from 'react'
import { tasksThunks } from 'features/TodolistList/Todolist/Task/model/tasks-reducer'
import { TaskStatuses } from 'common/enums/enums'

export const useTask = (todolistID: string, taskID: string, status: TaskStatuses) => {
  const dispatch = useAppDispatch()

  const deleteTask = useCallback(() => {
    dispatch(tasksThunks.deleteTask({ todolistID, taskID }))
  }, [dispatch, todolistID, taskID])

  const updateTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksThunks.updateTask({
          todolistID,
          taskID,
          model: {
            status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
          },
        })
      )
    },
    [dispatch, todolistID, taskID]
  )

  const updateTaskTitle = useCallback(
    (taskTitle: string) => {
      dispatch(tasksThunks.updateTask({ todolistID, taskID, model: { title: taskTitle } }))
    },
    [dispatch, todolistID, taskID]
  )

  const listItemClassName = status === TaskStatuses.Completed ? 'isDone' : ''

  return { deleteTask, updateTaskStatus, updateTaskTitle, listItemClassName }
}
