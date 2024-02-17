import { useState } from 'react'

const useFunnel = <T extends readonly string[]>(steps: T) => {
  const [step, setStep] = useState<T[number]>(steps[0])
  const currentStepIdx = steps.indexOf(step)

  const hasPrevStep = currentStepIdx > 0
  const hasNextStep = currentStepIdx < steps.length - 1

  const toPrevStep = () => {
    if (!hasPrevStep) return
    setStep(steps[currentStepIdx - 1])
  }

  const toNextStep = () => {
    if (!hasNextStep) return
    setStep(steps[currentStepIdx + 1])
  }

  return {
    step,
    toPrevStep,
    toNextStep,
    hasPrevStep,
    hasNextStep,
  }
}

export default useFunnel
