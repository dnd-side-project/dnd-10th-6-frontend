import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useRef, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: Infinity,
            staleTime: Infinity,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default QueryProvider
