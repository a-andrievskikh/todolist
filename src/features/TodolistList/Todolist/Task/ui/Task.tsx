import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { memo } from 'react'
import { useTask } from 'features/TodolistList/Todolist/Task/hooks/useTask'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums/enums'
import { TaskPT } from 'features/TodolistList/Todolist/Task/types/task-types'

export const Task = memo(({ todolistID, taskID, title, status }: TaskPT) => {
  const {
    deleteTaskCallBack,
    updateTaskStatusCallBack,
    updateTaskTitleCallBack,
    listItemClassName,
  } = useTask(todolistID, taskID, status)

  return (
    <li className={listItemClassName} key={taskID}>
      <Checkbox
        color='primary'
        checked={status === TaskStatuses.Completed}
        onChange={updateTaskStatusCallBack}
      />
      <EditableSpan value={title} onChangeTitle={updateTaskTitleCallBack} />
      <IconButton onClick={deleteTaskCallBack}>
        <Delete fontSize={'small'} />
      </IconButton>
    </li>
  )
})
