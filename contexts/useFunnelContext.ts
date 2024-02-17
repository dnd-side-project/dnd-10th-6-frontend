import { createContext, useContext } from 'react'

const FunnelContext = createContext({
  toPrevStep: () => {},
  toNextStep: () => {},
})

export const FunnelProvider = FunnelContext.Provider
export const useFunnelContext = () => useContext(FunnelContext)
