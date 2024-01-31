import { Meta, StoryObj } from '@storybook/react'
import { Typography } from '.'

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  argTypes: {
    hierarchy: {
      control: 'select',
      options: [
        'mainTitle1',
        'mainTitle2',
        'subTitle1',
        'subTitle2',
        'body1',
        'body2',
        'body3',
        'caption1',
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof Typography>

export const MainTitle1: Story = {
  args: {
    children: 'MainTitle1',
    hierarchy: 'mainTitle1',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const MainTitle2: Story = {
  args: {
    children: 'MainTitle2',
    hierarchy: 'mainTitle2',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const SubTitle1: Story = {
  args: {
    children: 'SubTitle1',
    hierarchy: 'subTitle1',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const SubTitle2: Story = {
  args: {
    children: 'SubTitle2',
    hierarchy: 'subTitle2',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const Body1: Story = {
  args: {
    children: 'Body1',
    hierarchy: 'body1',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const Body2: Story = {
  args: {
    children: 'Body2',
    hierarchy: 'body2',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const Body3: Story = {
  args: {
    children: 'Body3',
    hierarchy: 'body3',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}

export const Caption1: Story = {
  args: {
    children: 'Caption1',
    hierarchy: 'caption1',
  },
  render: (args) => {
    return <Typography {...args} />
  },
}
