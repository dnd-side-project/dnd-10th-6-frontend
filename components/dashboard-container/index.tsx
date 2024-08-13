import React, {
  HTMLAttributes,
  PropsWithChildren,
  useMemo,
  useRef,
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/client/utils'

import useFilter, { Filter } from '@/hooks/use-filter'
import { getDashboardQuery } from '@/queries/dashboard'
import { PropswithWikiType } from '@/types'
import { fadeInProps } from '@/variants'

import { BubbleChart } from '../compositions/dashboard/bubble-chart'
import { BarChart } from '../compositions/dashboard/bar-chart'
import { Button } from '@/components/ui'
import TreeInfo from '@/components/compositions/dashboard/tree-info'
import TripleTrees from '../svgs/triple-trees'
import ShareModal from '../share-modal'
import { Statistic } from '@/model/dashboard.entity'
import { BinaryChart } from '../compositions/dashboard/binary-chart'
import Money from '../compositions/dashboard/money'
import { MAIN_COLOR } from '@/constants'
import { RankChart } from '../compositions/dashboard/rank-chart'

const DashboardContainer = ({
  shouldShowHeader,
  wikiType,
  wikiCount,
}: PropswithWikiType<{
  shouldShowHeader: boolean
  wikiCount: number
}>) => {
  const { selectedFilter } = useFilter()
  const { data: statisics, isLoading } = useQuery(
    getDashboardQuery(wikiType, selectedFilter),
  )

  const dashboardList = useMemo(() => statisics, [statisics])

  return (
    <motion.div
      {...fadeInProps}
      className="flex h-full grow flex-col pb-[50px]"
    >
      <Filter className={cn(shouldShowHeader && 'top-header')} />
      <AnimatePresence mode="wait">
        {isLoading || statisics?.length ? (
          <motion.div
            {...fadeInProps}
            key="exist"
            className="flex flex-col space-y-5 px-5 pb-5"
          >
            {/* 내 정원에 심어진 나무는? */}
            <Section className="pt-5">
              <TreeInfo
                filter={selectedFilter}
                wikiType={wikiType}
                wikiCount={wikiCount}
              />
            </Section>
            {dashboardList?.map((stat) => (
              <Section key={stat.questionId}>
                <RecursiveDashboard wikiType={wikiType} dashboard={stat} />
              </Section>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            {...fadeInProps}
            className="relative mx-5 flex h-full flex-col items-center justify-between space-y-6 py-[16px] text-center"
          >
            <div />
            <div className="flex flex-col items-center">
              <TripleTrees />
              <h3 className="mb-4 mt-8 text-t2-kr-b">
                나무를 심어준 친구가 없어요
              </h3>
              <p className="text-b1-kr-m text-font-gray-03 ">
                나에 대해 궁금하다면 링크 공유하기를 눌러
                <br />
                친구에게 알려달라고 부탁해보세요
              </p>
            </div>
            <ShareModal wikiType={wikiType}>
              <Button>링크 공유하기</Button>
            </ShareModal>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default DashboardContainer

function Section({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      {...props}
      className={cn(
        'flex flex-col overflow-x-hidden bg-white',
        props.className,
      )}
    >
      {children}
    </section>
  )
}

interface RecursiveDashboardProps {
  dashboard: Statistic
}

const RecursiveDashboard = ({
  wikiType,
  dashboard,
}: PropswithWikiType<RecursiveDashboardProps>) => {
  const dashboardChild = useMemo(() => {
    switch (dashboard.dashboardType) {
      case 'BAR_CHART':
        return <BarChart wikiType={wikiType} dashboard={dashboard} />
      case 'BINARY':
        return <BinaryChart wikiType={wikiType} dashboard={dashboard} />
      case 'BUBBLE_CHART':
        return <BubbleChart wikiType={wikiType} dashboard={dashboard} />
      case 'MONEY':
        return <Money wikiType={wikiType} dashboard={dashboard} />
      case 'RANK':
        return <RankChart dashboard={dashboard} wikiType={wikiType} />
    }
  }, [dashboard, wikiType])
  return dashboardChild
}
