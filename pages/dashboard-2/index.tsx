import { ReactNode, createContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { cn } from '@/lib/client/utils'
import BaseLayout from '@/layout/base-layout'
import withAuth from '@/layout/HOC/with-auth'
import { FilterProvider } from '@/hooks/use-filter'

import DetailDrawer from '@/components/dashboard-container/detail-drawer'
import { ShareImageDrawer, ShareImageProvider } from '@/components/share-image'

export const DetailQsContext = createContext<{
  id: string
  handle: (id: string) => void
}>({ id: '', handle: () => {} })

const Page = () => {
  // const headerHeight = useSettingStore((state) => state.headerHeight)
  const [selectedQsId, setSelectedQsId] = useState('')
  const ref = useRef<HTMLElement>(null)

  const router = useRouter()
  // const { direction, scrollTop } = useScrollDirection({ ref })
  // const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  const handleQsId = (id: string) => {
    setSelectedQsId(id)
  }
  return (
    <BaseLayout
      showHeader
      ref={ref}
      header={{
        options: {
          onBackClick: () => router.replace('/garden'),
          onCenterClick: () => router.replace('/garden'),
          showRight: true,
        },
        rightIcon: <div className="text-but">내정원</div>,
      }}
      className={cn('h-calc-h overflow-y-scroll')}
    >
      <DetailQsContext.Provider
        value={{ id: selectedQsId, handle: handleQsId }}
      >
        {/* <FilterProvider>
          <DashboardContainer shouldShowHeader={shouldShowHeader} />
        </FilterProvider> */}

        <FilterProvider>
          <ShareImageProvider>
            <DetailDrawer />
            <ShareImageDrawer />
          </ShareImageProvider>
        </FilterProvider>
      </DetailQsContext.Provider>
    </BaseLayout>
  )
}

const DashboardWithAuth = withAuth(Page)
DashboardWithAuth.getLayout = (page: ReactNode) => page
export default DashboardWithAuth

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  if (!isViewOnboard) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: true,
      },
    }
  }
  return { props: {} }
}) satisfies GetServerSideProps
