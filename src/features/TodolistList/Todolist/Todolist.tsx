import { memo } from 'react'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { ItemForm } from 'components/ItemForm/ItemForm'
import Button from '@mui/material/Button'
import { TodolistDomainT } from 'features/TodolistList/todolists-slice'
import { Task } from './Task/Task'
import { TaskT } from 'api/tasks-api'
import { useAppSelector } from 'app/hooks/useAppSelector'
import { todolistSelectors } from 'features/TodolistList/Todolist/todolist-selectors'
import { useTodolist } from 'features/TodolistList/Todolist/hooks/useTodolist'

export const Todolist = memo(({ todolist, demo = false }: TodolistPT) => {
  const { addItem, updateTodolistTitle, updateTodolistFilter, deleteTodolist } = useTodolist(todolist)

  const tasks = useAppSelector<TaskT[]>(todolistSelectors(todolist))

  const tasksList = tasks.map(task => {
    return <Task key={task.id} taskID={task.id} title={task.title} status={task.status} todolistID={todolist.id} />
  })

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChangeTitle={updateTodolistTitle} />
        <button onClick={() => deleteTodolist(todolist.id)} disabled={todolist.entityStatus === 'loading'}>
          x
        </button>
      </h3>
      <ItemForm addItem={addItem} disabled={todolist.entityStatus === 'loading'} />
      <ul>{tasksList}</ul>
      <div>
        <Button
          variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
          color={'primary'}
          size={'small'}
          onClick={() => updateTodolistFilter('all')}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
          color={'success'}
          size={'small'}
          onClick={() => updateTodolistFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
          color={'secondary'}
          size={'small'}
          onClick={() => updateTodolistFilter('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})

// Types
export type TodolistPT = {
  todolist: TodolistDomainT
  demo?: boolean
}
