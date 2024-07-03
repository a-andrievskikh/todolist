import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from 'shared/ui'
import { TaskStatuses } from 'shared/enums'
import s from 'features/todolists-list/ui/todolist/tasks/task/Task.module.css'
import { type RequestStatus, TaskT } from 'shared/types'
import { useActions, useAppSelector } from 'app/store'
import { tasksThunks } from 'features/todolists-list/model'
import { appSelectors } from 'app/model'
import { ChangeEvent } from 'react'

type Props = {
  task: TaskT
  todolistID: string
}

export const Task = ({ task, todolistID }: Props) => {
  const { id: taskID, status, title } = task
  const { deleteTask, changeTask } = useActions(tasksThunks)
  const { statusSelector } = appSelectors
  const appStatus = useAppSelector<RequestStatus>(statusSelector)

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const taskStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    changeTask({
      todolistID,
      taskID,
      model: {
        status: taskStatus,
      },
    })
  }
  const changeTaskTitleHandler = (title: string) => {
    changeTask({ todolistID, taskID, model: { title } })
  }

  const deleteTaskHandler = () => deleteTask({ todolistID, taskID })

  const taskCompletedStyles = status === TaskStatuses.Completed ? s.isDone : ''
  const isDeleteButtonDisabled = appStatus === 'loading'

  return (
    <li className={taskCompletedStyles} key={task.id}>
      <Checkbox
        color='primary'
        onChange={changeTaskStatusHandler}
        checked={status === TaskStatuses.Completed}
      />
      <EditableSpan value={title} onChangeValue={changeTaskTitleHandler} />
      <IconButton onClick={deleteTaskHandler} disabled={isDeleteButtonDisabled}>
        <Delete fontSize={'small'} />
      </IconButton>
    </li>
  )
}
