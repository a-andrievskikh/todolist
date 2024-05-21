import { Meta, StoryObj } from '@storybook/react'
import { Task } from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/ui/Task'
import { ReduxStoreProviderDecorator, todolistID1 } from 'stories/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootState } from 'app/model/store'
import { TaskT } from 'features/todolists-list/ui/Todolist/ui/Tasks/Task/ui/Task.types'

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
    <Task taskID={task.id} title={task.title} status={task.status} todolistID={todolistID1} />
  ) : (
    <>Tasks have expired. Restart Storybook</>
  )
}

export const TaskStory: Story = {
  render: () => <TaskWithRedux />,
}
