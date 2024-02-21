import Header from '@/components/header'
import Drawer from '.'
import { StoryObj, Meta } from '@storybook/react'
import { SessionProvider } from '@/provider/session-provider'

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  argTypes: {},
  decorators: [
    (Story, args) => (
      <SessionProvider session={{}}>
        <div className="flex w-full">
          <Header></Header>
          <Story {...args} />
        </div>
      </SessionProvider>
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
