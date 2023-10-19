import { Meta, StoryObj } from '@storybook/react'
import { App } from './App'
import { ReduxStoreProviderDecorator } from 'stories/ReduxStoreProviderDecorator'

const meta: Meta<typeof App> = {
  title: 'Todolists/App',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof App>

export const AppWithReduxStory: Story = {
  render: () => <App demo={true} />,
}
