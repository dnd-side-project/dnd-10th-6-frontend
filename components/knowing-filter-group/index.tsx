import { AnimatePresence, motion } from 'framer-motion'
import React, { HTMLAttributes, useState } from 'react'
import FilterText from '../filter-text'
import { cn } from '@/lib/client/utils'
import { fadeInProps } from '@/variants'
import FilterButton from '../filter-button'

type KnowFilterType = 'period' | 'route'
const filterItems: {
  [key in 'period' | 'route']: { label: string; value: string }[]
} = {
  period: [
    {
      label: '전체',
      value: 'ALL',
    },
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
  route: [
    {
      label: '전체',
      value: 'ALL',
    },
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
  const [knowState, setKnowState] = useState<KnowFilterType>('period')
  const [selectedFilterItem, setSelectedFilterItem] = useState('ALL')

  const onKnowFilterClick = (type: KnowFilterType) => () => {
    setSelectedFilterItem('ALL')
    setKnowState(type)
  }
  return (
    <div
      {...props}
      className={cn(
        'sticky top-0 bg-white mb-3 duration-300 z-10',
        props.className,
      )}
    >
      <div className="h-14 flex items-center gap-x-6 px-5 bg-white z-10">
        <FilterText
          label="알게 된 기간"
          active={knowState === 'period'}
          onClick={onKnowFilterClick('period')}
        />
        <FilterText
          label="알게 된 경로"
          active={knowState === 'route'}
          onClick={onKnowFilterClick('route')}
        />
      </div>
      <AnimatePresence mode="wait">
        {knowState && (
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
              'h-[48px] flex overflow-x-scroll px-5 space-x-2 overflow-y-hidden w-screen scrollbar-hide items-center -z-[1] bg-white',
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
