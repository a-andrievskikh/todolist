import { EditableSpan } from 'shared/ui'
import IconButton from '@mui/material/IconButton'
import Delete from '@mui/icons-material/Delete'
import { todolistsThunks } from 'features/todolists-list/model'
import { useActions } from 'app/store'
import { TodolistDomain } from 'shared/types'

type Props = { todolist: TodolistDomain }

export const TodolistTitle = ({ todolist }: Props) => {
  const { id: todolistID, title, entityStatus } = todolist
  const { changeTodolistTitle, deleteTodolist } = useActions(todolistsThunks)

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ todolistID, title })
  }

  const deleteTodolistHandler = () => deleteTodolist(todolistID)

  const isDeleteButtonDisabled = entityStatus === 'loading'

  return (
    <h3>
      <EditableSpan value={title} onChangeValue={changeTodolistTitleHandler} />
      <IconButton onClick={deleteTodolistHandler} disabled={isDeleteButtonDisabled}>
        <Delete fontSize={'small'} />
      </IconButton>
    </h3>
  )
}
