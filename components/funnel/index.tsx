import React from 'react'

interface FunnelProps<T extends readonly string[]> {
  step: T[number]
  children: React.ReactNode
}

const Funnel = <T extends readonly string[]>({
  step,
  children,
}: FunnelProps<T>) => {
  const validChidren = React.Children.toArray(children)
    .filter(React.isValidElement)
    .filter((child) => child.type === Step) as React.ReactElement<
    StepProps<T>
  >[]

  const currentStepIdx = validChidren.find((child) => child.props.name === step)
  if (!currentStepIdx) {
    throw new Error(`Step ${step} not found in Funnel's children.`)
  }
  return <>{currentStepIdx}</>
}

interface StepProps<T extends readonly string[]> {
  name: T[number]
  children: React.ReactNode
  onEnter?: () => void
}
export default Funnel

export const Step = <T extends readonly string[]>({
  children,
  onEnter,
}: StepProps<T>) => {
  if (onEnter) {
    onEnter()
  }

  return <>{children}</>
}
