import { motion } from 'framer-motion'

import { HTMLAttributes, PropsWithChildren } from 'react'

import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { useSettingStore } from '@/stores/setting.store'
import { GetServerSideProps } from 'next'
import BestWorth from '@/components/compositions/dashboard/best-worth'
import Character from '@/components/compositions/dashboard/character'
import Money from '@/components/compositions/dashboard/money'
import Happy from '@/components/compositions/dashboard/happy'
import Sad from '@/components/compositions/dashboard/sad'
import KnowingFilterGroup from '@/components/knowing-filter-group'
import TreeInfo from '@/components/compositions/dashboard/tree-info'
import withAuth from '@/layout/HOC/with-auth'

const Page = () => {
  const headerHeight = useSettingStore((state) => state.headerHeight)

  const { direction, scrollTop } = useScrollDirection()

  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  return (
    <motion.div {...fadeInProps} className="flex flex-col pb-[50px] grow">
      <KnowingFilterGroup className={cn(shouldShowHeader && 'top-header')} />
      <div className="flex flex-col divide-y-[12px] divide-line-soft">
        {/* 내 정원에 심어진 나무는? */}
        <Section>
          <TreeInfo />
        </Section>
        {/* 가장 중요한 것 - 파이차트 */}
        <Section>
          <BestWorth />
        </Section>
        {/* 이런사람이에요 - 박스 */}
        <Section>
          <Character />
        </Section>
        <Section>
          <Money />
        </Section>
        {/* 기쁠 떄 */}
        <Section>
          <Happy />
        </Section>
        <Section>
          <Sad />
        </Section>
      </div>
    </motion.div>
  )
}

export default withAuth(Page)

function Section({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      {...props}
      className={cn(
        'pt-10 pb-12 px-6 flex flex-col overflow-x-hidden bg-text-main-whiteFF',
        props.className,
      )}
    >
      {children}
    </section>
  )
}

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
