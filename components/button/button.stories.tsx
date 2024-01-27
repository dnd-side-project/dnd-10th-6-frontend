import { Meta, StoryObj } from '@storybook/react'
import Button from '.'
import { userEvent } from '@storybook/testing-library'

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

export const Hover: Story = {
  name: 'hover',
  play: async () => {
    await userEvent.hover(document.activeElement!)
  },
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

export const Active: Story = {
  name: 'active',
  play: async () => {
    await userEvent.tab()
    await userEvent.click(document.activeElement!)
  },
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

export const Focus: Story = {
  name: 'focus',
  play: async () => {
    await userEvent.tab()
  },
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

export const SecondaryHover: Story = {
  name: 'secondary hover',
  play: async () => {
    await userEvent.hover(document.activeElement!)
  },
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

//테스트용이므로 생략
