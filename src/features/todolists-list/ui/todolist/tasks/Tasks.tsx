import { Task } from 'features/todolists-list/ui/todolist/tasks/task'
import { TaskStatuses } from 'shared/enums'
import type { TodolistDomain } from 'shared/types'
import { useAppSelector } from 'app/store'
import { tasksSelectors } from 'features/todolists-list/model'

type Props = {
  todolist: TodolistDomain
}

export const Tasks = ({ todolist }: Props) => {
  const { id: TodolistID, filterValue } = todolist
  const { tasksSelector } = tasksSelectors
  const tasks = useAppSelector(tasksSelector)[todolist.id]

  const getFilteredTasks = () => {
    switch (filterValue) {
      case 'active':
        return tasks.filter(t => t.status === TaskStatuses.New)
      case 'completed':
        return tasks.filter(t => t.status === TaskStatuses.Completed)
      default:
        return tasks
    }
  }
  const filteredTasks = getFilteredTasks()

  if (!tasks.length) return <div>No tasks available.</div>

  const tasksForTodolist = filteredTasks.map(task => {
    return <Task key={task.id} task={task} todolistID={TodolistID} />
  })

  return <ul>{tasksForTodolist}</ul>
}
