import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const defaultOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: 1000 * 60 * 10,
    },
  },
}

const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(defaultOptions))
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default QueryProvider
