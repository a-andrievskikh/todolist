import Button from '@mui/material/Button'
import { todolistsActions } from 'features/todolists-list/model'
import { useActions } from 'app/store'
import type { TodolistFilterValues, TodolistDomain } from 'shared/types'

type Props = {
  todolist: TodolistDomain
}

export const TodolistFilterButtons = ({ todolist }: Props) => {
  const { id: todolistID, filterValue } = todolist
  const { changeTodolistFilter } = useActions(todolistsActions)

  const changeTodolistFilterHandler = (filterValue: TodolistFilterValues) => {
    changeTodolistFilter({ todolistID, filterValue })
  }

  return (
    <div>
      <Button
        variant={filterValue === 'all' ? 'contained' : 'outlined'}
        color={'primary'}
        size={'small'}
        onClick={() => changeTodolistFilterHandler('all')}
      >
        All
      </Button>
      <Button
        variant={filterValue === 'active' ? 'contained' : 'outlined'}
        color={'success'}
        size={'small'}
        onClick={() => changeTodolistFilterHandler('active')}
      >
        Active
      </Button>
      <Button
        variant={filterValue === 'completed' ? 'contained' : 'outlined'}
        color={'secondary'}
        size={'small'}
        onClick={() => changeTodolistFilterHandler('completed')}
      >
        Completed
      </Button>
    </div>
  )
}
