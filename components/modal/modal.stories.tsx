import { Meta, StoryObj } from '@storybook/react'
import Modal from '.'
import Button from '../button'

const meta = {
  title: 'UI/Modal',
  component: Modal,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta<typeof Modal>
export default meta

type Story = StoryObj<typeof Modal>
export const Default: Story = {
  name: 'default',
  args: {
    children: 'Modal Content',
    title: 'Modal Title',
    description: 'Modal Description',
    trigger: <Button>Open Modal</Button>,
  },
  render: (args) => {
    return <Modal {...args} />
  },
}
