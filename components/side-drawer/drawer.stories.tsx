import Header from '@/components/header'

import { StoryObj, Meta } from '@storybook/react'
import { SessionProvider } from '@/provider/session-provider'
import SideDrawer from '.'

const meta: Meta<typeof SideDrawer> = {
  title: 'UI/Drawer',
  component: SideDrawer,
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

type Story = StoryObj<typeof SideDrawer>

export const Default: Story = {
  name: 'default',

  render: (args) => {
    return <SideDrawer {...args} />
  },
}
