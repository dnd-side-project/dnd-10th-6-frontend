import useFilter, { Filter } from '@/hooks/use-filter'
import { getDashboardQuery } from '@/queries/dashboard'
import { useQuery } from '@tanstack/react-query'
import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'
import TripleTrees from '../svgs/triple-trees'
import ShareModal from '../share-modal'
import Button from '../ui/button'
import BestWorth from '@/components/compositions/dashboard/best-worth'
import Character from '@/components/compositions/dashboard/character'
import Money from '@/components/compositions/dashboard/money'
import Happy from '@/components/compositions/dashboard/happy'
import Sad from '@/components/compositions/dashboard/sad'
import TreeInfo from '@/components/compositions/dashboard/tree-info'
const DashboardContainer = ({
  shouldShowHeader,
}: {
  shouldShowHeader: boolean
}) => {
  const { selectedFilter } = useFilter()
  const { data: statisics, isLoading } = useQuery(
    getDashboardQuery(selectedFilter),
  )
  return (
    <motion.div {...fadeInProps} className="flex flex-col pb-[50px] grow">
      <Filter className={cn(shouldShowHeader && 'top-header')} />
      <AnimatePresence mode="wait">
        {isLoading || statisics?.length ? (
          <motion.div
            {...fadeInProps}
            key="exist"
            className="flex flex-col divide-y-[12px] divide-line-soft"
          >
            {/* 내 정원에 심어진 나무는? */}
            <Section className="pt-5">
              <TreeInfo filter={selectedFilter} />
            </Section>
            {/* 가장 중요한 것 - 파이차트 */}
            <Section>
              <BestWorth filter={selectedFilter} />
            </Section>
            {/* 이런사람이에요 - 박스 */}
            <Section>
              <Character filter={selectedFilter} />
            </Section>
            <Section>
              <Money filter={selectedFilter} />
            </Section>
            {/* 기쁠 떄 */}
            <Section>
              <Happy filter={selectedFilter} />
            </Section>
            <Section>
              <Sad filter={selectedFilter} />
            </Section>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            {...fadeInProps}
            className="h-full flex flex-col justify-center items-center relative mx-5 space-y-6 text-center"
          >
            <TripleTrees />
            <h3 className="text-subTitle1-bold mt-8 mb-4">
              나무를 심어준 친구가 없어요
            </h3>
            <p className="text-body1-medium text-text-sub-gray4f">
              나에 대해 궁금하다면 링크 공유하기를 눌러
              <br />
              친구에게 알려달라고 부탁해보세요
            </p>
            <ShareModal>
              <Button className="w-28 h-11">링크 공유하기</Button>
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
        'pt-10 pb-12 px-6 flex flex-col overflow-x-hidden bg-text-main-whiteFF',
        props.className,
      )}
    >
      {children}
    </section>
  )
}
