import useFunnel from '@/hooks/use-funnel'

import Funnel, { Step } from '.'

const createFunnel = <T extends readonly string[]>(steps: T) => ({
  Funnel: Funnel<T>,
  Step: Step<T>,
  useFunnel: () => useFunnel(steps),
})

export default createFunnel
