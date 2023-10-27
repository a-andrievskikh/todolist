import { useAppDispatch } from 'app/hooks/useAppDispatch'
import { ChangeEvent, useCallback } from 'react'
import { deleteTaskTC, updateTaskTC } from 'features/TodolistList/tasks-reducer'
import { TaskStatuses } from 'api/tasks-api'

export const useTask = (todolistID: string, taskID: string, status: TaskStatuses) => {
  const dispatch = useAppDispatch()

  const deleteTask = useCallback(() => {
    dispatch(deleteTaskTC(todolistID, taskID))
  }, [dispatch, todolistID, taskID])

  const updateTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateTaskTC(todolistID, taskID, {
          status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        })
      )
    },
    [dispatch, todolistID, taskID]
  )

  const updateTaskTitle = useCallback(
    (taskTitle: string) => {
      dispatch(updateTaskTC(todolistID, taskID, { title: taskTitle }))
    },
    [dispatch, todolistID, taskID]
  )

  const listItemClassName = status === TaskStatuses.Completed ? 'isDone' : ''

  return { deleteTask, updateTaskStatus, updateTaskTitle, listItemClassName }
}
