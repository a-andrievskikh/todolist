import { ChangeEvent, useCallback } from 'react'
import { tasksThunks } from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/model/tasksSlice'
import { TaskStatuses } from 'shared/enums/enums'
import { useActions } from 'shared/lib'
import s from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/ui/Task.module.css'

export const useTask = (todolistID: string, taskID: string, status: TaskStatuses) => {
  const { deleteTask, changeTask } = useActions(tasksThunks)

  const deleteTaskHandler = () => deleteTask({ todolistID, taskID })

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

    changeTask({
      todolistID,
      taskID,
      model: {
        status,
      },
    })
  }

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      changeTask({ todolistID, taskID, model: { title } })
    },
    [changeTask, todolistID, taskID]
  )

  const isTaskCompletedStyles = status === TaskStatuses.Completed ? s.isDone : ''

  return {
    deleteTaskHandler,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
    isTaskCompletedStyles,
  }
}
