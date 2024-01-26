import InputBox from '.'
import { StoryObj, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

const defaultArgs: Partial<(typeof InputBox)['defaultProps']> = {
  value: '',
  disabled: false,
}

const meta: Meta<typeof InputBox> = {
  title: 'UI/InputBox',
  component: InputBox,
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

type Story = StoryObj<typeof InputBox>

export const Default: Story = {
  name: 'default',
  args: defaultArgs,
  render: (args) => {
    return <InputBox {...args} />
  },
}
export const Disabled: Story = {
  name: 'disabled',
  args: { ...defaultArgs, disabled: true },
  render: (args) => {
    return <InputBox {...args} />
  },
}
export const Focus: Story = {
  name: 'focus',
  play: async () => {
    await userEvent.tab()
  },
  args: defaultArgs,
  render: (args) => {
    return <InputBox {...args} />
  },
}
export const OnInput: Story = {
  name: 'onInput',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('디폴트')
    await userEvent.type(input, 'type username here.')
  },
  args: defaultArgs,
  render: (args) => {
    return <InputBox {...args} />
  },
}
export const OnBlurAfterType: Story = {
  name: 'onBlur',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('디폴트')
    await userEvent.type(input, 'type username here.')
    input.blur()
  },
  args: defaultArgs,
  render: (args) => {
    return <InputBox {...args} />
  },
}
