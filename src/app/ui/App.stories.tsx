import { Meta, StoryObj } from '@storybook/react'
import { App } from 'app/ui'
import { ReduxStoreProviderDecorator } from 'app/store'

const meta: Meta<typeof App> = {
  title: 'Todolists/App',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof App>

export const AppWithReduxStory: Story = {
  render: () => <App />,
}
