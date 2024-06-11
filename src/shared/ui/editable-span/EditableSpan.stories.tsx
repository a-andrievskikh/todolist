import { Meta, StoryObj } from '@storybook/react'
import { EditableSpan } from 'shared/ui'

const meta: Meta<typeof EditableSpan> = {
  title: 'Todolists/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Start value empty. Add value push button set string.',
    },
    onChangeValue: {
      description: 'Value EditableSpan changed',
      action: 'clicked',
    },
  },
}
export default meta

type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
  render: args => <EditableSpan value={'Start value'} onChangeValue={args.onChangeValue} />,
}
