import { ReactNode, createContext, useRef, useState } from 'react'
import { cn } from '@/lib/client/utils'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { useSettingStore } from '@/stores/setting.store'
import { GetServerSideProps } from 'next'

import BaseLayout from '@/layout/base-layout'

import { FilterProvider } from '@/hooks/use-filter'
import withAuth from '@/layout/HOC/with-auth'
import DashboardContainer from '@/components/dashboard-container'
import Drawer from '@/components/ui/drawer'
import DetailDrawer from '@/components/dashboard-container/detail-drawer'

export const DetailQsContext = createContext<{
  id: string
  handle: (id: string) => void
}>({ id: '', handle: () => {} })

const Page = () => {
  const headerHeight = useSettingStore((state) => state.headerHeight)
  const [selectedQsId, setSelectedQsId] = useState('')
  const ref = useRef<HTMLElement>(null)

  const { direction, scrollTop } = useScrollDirection({ ref })
  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  const handleQsId = (id: string) => {
    setSelectedQsId(id)
  }
  return (
    <>
      <BaseLayout
        showHeader
        ref={ref}
        className={cn('h-calc-h overflow-y-scroll')}
      >
        <DetailQsContext.Provider
          value={{ id: selectedQsId, handle: handleQsId }}
        >
          <FilterProvider>
            <DashboardContainer shouldShowHeader={shouldShowHeader} />
          </FilterProvider>

          <FilterProvider>
            <DetailDrawer />
          </FilterProvider>
        </DetailQsContext.Provider>
      </BaseLayout>
    </>
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
