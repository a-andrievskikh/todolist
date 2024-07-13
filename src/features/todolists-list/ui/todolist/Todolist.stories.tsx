import { Meta, StoryObj } from '@storybook/react'
import { Todolist } from 'features/todolists-list/ui/todolist'
import { type AppRootState, ReduxStoreProviderDecorator } from 'app/store'
import { useSelector } from 'react-redux'
import { TodolistDomain } from 'shared/types'

const meta: Meta<typeof Todolist> = {
  title: 'Todolists/Todolist',
  component: Todolist,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof Todolist>

const TodolistWithRedux = () => {
  const todolist = useSelector<AppRootState, TodolistDomain>(state => state.todolists[0])
  const demo = true

  return todolist ? (
    <Todolist todolist={todolist} demo={demo} />
  ) : (
    <>Todolist have expired. Restart Storybook</>
  )
}

export const TodolistStory: Story = {
  render: () => <TodolistWithRedux />,
}
