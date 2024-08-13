import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { DetailType } from '@/components/dashboard-container/detail-drawer'
import { useWikiContext } from '@/contexts/wiki-provider'

const useDetailDrawer = () => {
  const router = useRouter()
  const { wikiType } = useWikiContext()

  const handle = useCallback(
    (id: string, type: DetailType = 'MULTIPLE_CHOICE') => {
      router.push(
        {
          query: {
            id,
            type,
            dType: 'detail',
            wikiType,
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
