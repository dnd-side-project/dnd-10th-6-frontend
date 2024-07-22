import { ReactNode, createContext, useRef, useState } from 'react'
import { cn } from '@/lib/client/utils'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { useSettingStore } from '@/stores/setting.store'
import { GetServerSideProps } from 'next'

import BaseLayout from '@/layout/base-layout'

import { FilterProvider } from '@/hooks/use-filter'
import withAuth from '@/layout/HOC/with-auth'
import DashboardContainer from '@/components/dashboard-container'
import DetailDrawer from '@/components/dashboard-container/detail-drawer'
import { useRouter } from 'next/router'
import { ShareImageDrawer, ShareImageProvider } from '@/components/share-image'
import { useSearchParams } from 'next/navigation'
import { WikiType } from '@/queries/surveys'
import { useToggleTheme } from '@/hooks/use-toggle-theme'

export const DetailQsContext = createContext<{
  id: string
  handle: (id: string) => void
}>({ id: '', handle: () => {} })

const Page = ({ wikiType }: { wikiType: WikiType }) => {
  const searchParams = useSearchParams()
  const wiki = wikiType || (searchParams.get('wikiType') as WikiType)

  const headerHeight = useSettingStore((state) => state.headerHeight)
  const [selectedQsId, setSelectedQsId] = useState('')
  const ref = useRef<HTMLElement>(null)

  const router = useRouter()
  const { direction, scrollTop } = useScrollDirection({ ref })
  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  useToggleTheme(wikiType)

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
      }}
      className={cn('h-calc-h overflow-y-scroll')}
    >
      <DetailQsContext.Provider
        value={{ id: selectedQsId, handle: handleQsId }}
      >
        <FilterProvider>
          <DashboardContainer
            wikiType={wiki}
            shouldShowHeader={shouldShowHeader}
          />
        </FilterProvider>

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
  const { wikiType } = context.query
  if (!wikiType || typeof wikiType !== 'string') {
    return {
      redirect: {
        destination: '/main',
        permanent: true,
      },
    }
  }
  if (!isViewOnboard) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: true,
      },
    }
  }
  return { props: { wikiType: wikiType.toUpperCase() } }
}) satisfies GetServerSideProps
