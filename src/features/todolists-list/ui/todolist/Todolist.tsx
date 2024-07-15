import { useActions } from 'app/store'
import { ItemForm } from 'shared/ui'
import type { TodolistDomain } from 'shared/types'
import { tasksThunks } from 'features/todolists-list/model'
import { Tasks } from 'features/todolists-list/ui/todolist/tasks'
import { TodolistTitle } from 'features/todolists-list/ui/todolist/todolist-title'
import { TodolistFilterButtons } from 'features/todolists-list/ui/todolist/todolist-filter-buttons'
import { useEffect } from 'react'

type Props = {
  todolist: TodolistDomain
  demo?: boolean
}

export const Todolist = ({ todolist, demo = false }: Props) => {
  const { getTasks, addTask } = useActions(tasksThunks)

  const isItemFormDisabled = todolist.entityStatus === 'loading'

  const addTaskCb = (title: string) => addTask({ todolistID: todolist.id, title })

  useEffect(() => {
    getTasks(todolist.id)
  }, [getTasks, todolist.id])

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <ItemForm addItem={addTaskCb} disabled={isItemFormDisabled} />
      <Tasks todolist={todolist} />
      <TodolistFilterButtons todolist={todolist} />
    </>
  )
}
