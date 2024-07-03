import { Meta, StoryObj } from '@storybook/react'
import { useSelector } from 'react-redux'
import { type AppRootState, ReduxStoreProviderDecorator, todolistID1 } from 'app/store'
import type { TaskT } from 'shared/types'
import { Task } from 'features/todolists-list/ui/todolist/tasks/task'

const meta: Meta<typeof Task> = {
  title: 'Todolists/Task',
  component: Task,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof Task>

const TaskWithRedux = () => {
  const task = useSelector<AppRootState, TaskT>(state => state.tasks[todolistID1][0])
  return task ? (
    <Task task={task} todolistID={todolistID1} />
  ) : (
    <>Tasks have expired. Restart Storybook</>
  )
}

export const TaskStory: Story = {
  render: () => <TaskWithRedux />,
}
