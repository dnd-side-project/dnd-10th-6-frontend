import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { DetailType } from '@/components/dashboard-container/detail-drawer'

const useDetailDrawer = () => {
  const router = useRouter()

  const handle = useCallback(
    (id: string, type: DetailType = 'MULTIPLE_CHOICE') => {
      router.push(
        {
          query: {
            id,
            type,
            dType: 'detail',
          },
        },
        undefined,
        { shallow: true },
      )
    },
    [],
  )
  return { handle }
}

export default useDetailDrawer
