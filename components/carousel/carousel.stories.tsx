import { Meta, StoryObj } from '@storybook/react'
import Carousel from '.'

import { onBoardingItems } from '@/components/onboard'
const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  args: {
    slides: onBoardingItems,
    renderItem: (item) => item as JSX.Element,
  },

  decorators: [
    (Story, args) => (
      <div className="flex w-full p-6 flex-col">
        <Story {...args} />
      </div>
    ),
  ],
  tags: ['UI', 'autodocs'],
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  name: 'default',
  render: (args) => {
    return <Carousel {...args} />
  },
}
