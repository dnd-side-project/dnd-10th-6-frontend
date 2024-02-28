import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

const useDetailDrawer = () => {
  const router = useRouter()

  const handle = useCallback((id: string) => {
    router.push(
      {
        query: {
          id,
          dType: 'detail',
        },
      },
      undefined,
      { shallow: true },
    )
  }, [])
  return { handle }
}

export default useDetailDrawer
