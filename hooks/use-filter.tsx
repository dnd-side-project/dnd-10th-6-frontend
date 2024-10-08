import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { cn } from '@/lib/client/utils'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

import { fadeInProps } from '@/variants'
import FilterText from '@/components/filter-text'
import FilterButton from '@/components/filter-button'

export type KnowFilterType = 'period' | 'relation' | 'total'
export type FilterType = {
  type: KnowFilterType
  value: string
}

const filters: {
  type: KnowFilterType
  text: string
  default: string
  items: { label: string; value: string }[]
}[] = [
  {
    type: 'total',
    text: '전체 보기',
    default: 'total',
    items: [],
  },
  {
    type: 'relation',
    text: '알게 된 경로',
    default: 'ELEMENTARY_SCHOOL',
    items: [
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
  },
  {
    type: 'period',
    text: '알게 된 기간',
    default: '',
    items: [
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
  },
]

const defaultFilterContext = {
  filterIndex: { typeIdx: 0, valueIdx: 0 },
  selectedFilter: { type: 'total' as const, value: 'total' },
  setFilterIndex: () => {},
  clear: () => {},
}

const FilterContext = createContext<{
  filterIndex: { typeIdx: number; valueIdx: number }
  setFilterIndex: Dispatch<
    SetStateAction<{ typeIdx: number; valueIdx: number }>
  >
  selectedFilter: {
    type: KnowFilterType
    value: string
  }
} | null>(null)

const useFilter = () => {
  if (typeof window === 'undefined') return defaultFilterContext
  const context = useContext(FilterContext)
  if (!context) {
    return defaultFilterContext
  }
  const { filterIndex, selectedFilter, setFilterIndex } = context
  const clear = () => setFilterIndex({ typeIdx: 0, valueIdx: 0 })
  return {
    filterIndex,
    selectedFilter,
    setFilterIndex,
    clear,
  }
}

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [filterIndex, setFilterIndex] = useState<{
    typeIdx: number
    valueIdx: number
  }>({ typeIdx: 0, valueIdx: 0 })
  return (
    <FilterContext.Provider
      value={{
        filterIndex,
        selectedFilter: {
          type: filters[filterIndex.typeIdx].type,
          value:
            filters[filterIndex.typeIdx].items[filterIndex.valueIdx]?.value ??
            filters[filterIndex.typeIdx].default,
        },
        setFilterIndex,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const Filter = (props?: { className?: string }) => {
  const { filterIndex, setFilterIndex } = useFilter() ?? defaultFilterContext
  return (
    <div
      className={cn(
        'sticky top-0 z-10 mb-3 bg-white duration-300',
        props?.className,
      )}
    >
      <div className="z-10 flex h-14 items-center gap-x-6  px-5">
        {filters.map((filter, index) => (
          <FilterText
            key={filter.text}
            label={filter.text}
            active={index === filterIndex.typeIdx}
            onClick={() => setFilterIndex({ typeIdx: index, valueIdx: 0 })}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {filters[filterIndex.typeIdx].items.length && (
          <motion.div
            key={filterIndex.typeIdx ?? 'defaultKnowState'}
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
            {filters[filterIndex.typeIdx].items.map((item, idx) => (
              <FilterButton
                selected={filterIndex.valueIdx === idx}
                onClick={() =>
                  setFilterIndex((prev) => ({ ...prev, valueIdx: idx }))
                }
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

export default useFilter
