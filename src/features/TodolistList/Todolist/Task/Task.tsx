import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { memo } from 'react'
import { useTask } from 'features/TodolistList/Todolist/Task/hooks/useTask'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums/enums'

export const Task = memo(({ todolistID, taskID, title, status }: TaskPT) => {
  const { deleteTask, updateTaskStatus, updateTaskTitle, listItemClassName } = useTask(todolistID, taskID, status)

  return (
    <li className={listItemClassName} key={taskID}>
      <Checkbox color='primary' checked={status === TaskStatuses.Completed} onChange={updateTaskStatus} />
      <EditableSpan value={title} onChangeTitle={updateTaskTitle} />
      <IconButton onClick={deleteTask}>
        <Delete fontSize={'small'} />
      </IconButton>
    </li>
  )
})

// Types
export type TaskPT = {
  todolistID: string
  taskID: string
  title: string
  status: TaskStatuses
}
