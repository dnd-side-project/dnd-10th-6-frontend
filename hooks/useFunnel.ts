import { useState } from 'react'
export type StepTitle = readonly string[]

const useFunnel = <T extends StepTitle>(
  steps: T,
  initialStep: T[number] = steps[0],
) => {
  const [currentStep, setCurrentStep] = useState<T[number]>(initialStep)
  const currentStepIdx = steps.indexOf(currentStep)
  const hasPrevStep = currentStepIdx > 0
  const hasNextStep = currentStepIdx < steps.length - 1

  const toPrevStep = () => {
    if (!hasPrevStep) return
    setCurrentStep(steps[currentStepIdx - 1])
  }

  const toNextStep = () => {
    if (!hasNextStep) return
    setCurrentStep(steps[currentStepIdx + 1])
  }

  return {
    currentStep,
    toPrevStep,
    toNextStep,
    hasPrevStep,
    hasNextStep,
  }
}

export default useFunnel
