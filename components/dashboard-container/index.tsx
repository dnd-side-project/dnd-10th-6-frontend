import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/client/utils'

import useFilter, { Filter } from '@/hooks/use-filter'
import { getDashboardQuery } from '@/queries/dashboard'
import { PropswithWikiType } from '@/types'
import { fadeInProps } from '@/variants'

import { KnowAbout } from '../compositions/dashboard/know-about'
import { BubbleChart } from '../compositions/dashboard/bubble-chart'
import { BarChart } from '../compositions/dashboard/bar-chart'
import { Button } from '@/components/ui'
import Character from '@/components/compositions/dashboard/character'
import Money from '@/components/compositions/dashboard/money'
import TreeInfo from '@/components/compositions/dashboard/tree-info'
import TripleTrees from '../svgs/triple-trees'
import ShareModal from '../share-modal'

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
            <Section>
              <KnowAbout wikiType={wikiType} />
            </Section>
            {/* 가장 중요한 것 - 파이차트 */}
            <Section>
              <BubbleChart wikiType={wikiType} filter={selectedFilter} />
            </Section>
            {/* 이런사람이에요 - 박스 */}
            <Section>
              <Character filter={selectedFilter} wikiType={wikiType} />
            </Section>
            <Section>
              <Money filter={selectedFilter} wikiType={wikiType} />
            </Section>
            {/* 기쁠 떄 */}
            <Section>
              <BarChart
                filter={selectedFilter}
                wikiType={wikiType}
                chartType="HAPPY"
              />
            </Section>
            <Section>
              <BarChart
                filter={selectedFilter}
                wikiType={wikiType}
                chartType="SAD"
              />
            </Section>
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
