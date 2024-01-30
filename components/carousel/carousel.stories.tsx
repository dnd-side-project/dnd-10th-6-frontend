import { Meta, StoryObj } from '@storybook/react'
import Carousel from '.'
import { media } from '@/components/media'
import Image from 'next/image'
const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  args: {
    slides: media,
    renderItem(item, index) {
      const image = item as (typeof media)[number]
      return (
        <Image
          key={index}
          height={300}
          width={600}
          src={image.src}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          alt={image.src}
        />
      )
    },
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
