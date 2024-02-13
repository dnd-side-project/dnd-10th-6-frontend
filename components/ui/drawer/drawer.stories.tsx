import Header from '@/components/header'
import Drawer from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  argTypes: {},
  decorators: [
    (Story, args) => (
      <div className="flex w-full">
        <Header></Header>
        <Story {...args} />
      </div>
    ),
  ],
  tags: ['UI', 'autodocs'],
}
export default meta

type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  name: 'default',

  render: (args) => {
    return <Drawer {...args} />
  },
}
