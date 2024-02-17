import useFunnel from '@/hooks/useFunnel'

import Funnel, { Step } from '.'

const createFunnel = <T extends readonly string[]>(steps: T) => ({
  Funnel: Funnel<T>,
  Step: Step<T>,
  useFunnel: () => useFunnel(steps),
})

export default createFunnel
