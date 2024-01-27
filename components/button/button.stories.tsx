import { Meta, StoryObj } from '@storybook/react'
import Button from '.'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      action: 'onClick',
    },
  },
  decorators: [
    (Story, args) => (
      <div className="flex w-full p-6">
        <Story {...args} />
      </div>
    ),
  ],
  tags: ['UI', 'autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  name: 'default',
  args: {
    children: 'Button',
    variant: 'primary',
    rounded: 'md',
    disabled: false,
  },
  render: (args) => {
    return <Button {...args} />
  },
}
export const Disabled: Story = {
  name: 'disabled',
  args: {
    children: 'Button',
    variant: 'primary',
    rounded: 'md',
    disabled: true,
  },
  render: (args) => {
    return <Button {...args} />
  },
}

export const Secondary: Story = {
  name: 'secondary',
  args: {
    children: 'Button',
    variant: 'secondary',
    rounded: 'md',
    disabled: false,
  },
  render: (args) => {
    return <Button {...args} />
  },
}

export const SecondaryDisabled: Story = {
  name: 'secondary disabled',
  args: {
    children: 'Button',
    variant: 'secondary',
    rounded: 'md',
    disabled: true,
  },
  render: (args) => {
    return <Button {...args} />
  },
}

