import Button from './Button'
import { StoryFn, Meta } from '@storybook/react'
export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>
const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: '우선순위 보기',
}
