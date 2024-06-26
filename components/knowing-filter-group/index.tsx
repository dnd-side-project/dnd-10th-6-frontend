import { AnimatePresence, motion } from 'framer-motion'
import React, { HTMLAttributes, useState } from 'react'
import FilterText from '../filter-text'
import { cn } from '@/lib/client/utils'
import { fadeInProps } from '@/variants'
import FilterButton from '../filter-button'

type KnowFilterType = 'PERIOD' | 'ROUTE' | 'ALL'
const filterItems: {
  [key in KnowFilterType]: { label: string; value: string }[]
} = {
  ALL: [],
  PERIOD: [
    {
      label: '초등학교',
      value: 'ELEMENTARY_SCHOOL',
    },
    {
      label: '중·고등학교',
      value: 'MIDDLE_AND_HIGH_SCHOOL',
    },
    {
      label: '대학교',
      value: 'UNIVERSITY',
    },
    {
      label: '직장',
      value: 'WORK',
    },
    {
      label: '모임',
      value: 'SOCIAL',
    },
    {
      label: '기타',
      value: 'ETC',
    },
  ],
  ROUTE: [
    {
      label: '6개월 미만',
      value: 'SIX_MONTHS',
    },
    {
      label: '6개월-1년',
      value: 'ONE_YEAR',
    },
    {
      label: '1년-4년',
      value: 'FOUR_YEARS',
    },
    {
      label: '4년 이상',
      value: 'INFINITE',
    },
  ],
}

interface KnowingFilter extends HTMLAttributes<HTMLDivElement> {}

const KnowingFilterGroup = (props: KnowingFilter) => {
  const [knowState, setKnowState] = useState<KnowFilterType>('ALL')
  const [selectedFilterItem, setSelectedFilterItem] = useState('ALL')

  const onKnowFilterClick = (type: KnowFilterType) => () => {
    setSelectedFilterItem(filterItems[type][0]?.value ?? 'ALL')
    setKnowState(type)
  }
  return (
    <div
      {...props}
      className={cn(
        'sticky top-0 z-10 mb-3 bg-white duration-300',
        props.className,
      )}
    >
      <div className="z-10 flex h-14 items-center gap-x-6 bg-white px-5">
        <FilterText
          label="전체 보기"
          active={knowState === 'ALL'}
          onClick={onKnowFilterClick('ALL')}
        />
        <FilterText
          label="알게 된 기간"
          active={knowState === 'PERIOD'}
          onClick={onKnowFilterClick('PERIOD')}
        />
        <FilterText
          label="알게 된 경로"
          active={knowState === 'ROUTE'}
          onClick={onKnowFilterClick('ROUTE')}
        />
      </div>
      <AnimatePresence mode="wait">
        {filterItems[knowState].length && (
          <motion.div
            key={knowState ?? 'defaultKnowState'}
            {...fadeInProps}
            variants={{
              ...fadeInProps.variants,
              animate: {
                ...(fadeInProps.variants?.animate ?? {}),
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className={cn(
              '-z-[1] flex h-[48px] w-screen items-center space-x-2 overflow-y-hidden overflow-x-scroll bg-white px-5 scrollbar-hide',
            )}
          >
            {filterItems[knowState].map((item) => (
              <FilterButton
                selected={selectedFilterItem === item.value}
                onClick={() => setSelectedFilterItem(item.value)}
                key={item.value}
                label={item.label}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KnowingFilterGroup
