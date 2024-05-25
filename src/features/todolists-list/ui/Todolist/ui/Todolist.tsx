import { memo } from 'react'
import { ItemForm } from 'shared/ui'
import { useTodolist } from 'features/todolists-list/ui/Todolist/lib/useTodolist'
import type { TodolistProps } from 'features/todolists-list/ui/Todolist/ui/Todolists.types'
import { TasksFilterButtons } from 'features/todolists-list/ui/Todolist/ui/TasksFilterButtons/TasksFilterButtons'
import { Tasks } from 'features/todolists-list/ui/Todolist/ui/Tasks/ui/Tasks'
import { TodolistTitle } from 'features/todolists-list/ui/Todolist/ui/TodolistTitle/TodolistTitle'

export const Todolist = memo(({ todolist, demo = false }: TodolistProps) => {
  const { addTaskCb } = useTodolist(todolist)

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <ItemForm addItem={addTaskCb} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <div>
        <TasksFilterButtons todolist={todolist} />
      </div>
    </div>
  )
})
