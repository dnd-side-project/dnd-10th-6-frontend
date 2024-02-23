import Button from '@/components/button'
import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { getDashboardQuery } from '@/queries/dashboard'
import { useQuery } from '@tanstack/react-query'
import { HTMLMotionProps, m, LazyMotion, domAnimation } from 'framer-motion'
import React from 'react'

const Happy = ({ filter }: { filter: FilterType }) => {
  const { data: statisics, isLoading } = useQuery(getDashboardQuery(filter))
  const { inView, ref } = useInViewRef<HTMLDivElement>({
    once: true,
    amount: 'all',
  })
  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        {isLoading ? (
          <>
            <div className="h-8 skeleton w-1/4 mb-2" />
            <div className="h-8 skeleton w-3/4 mb-5" />
            <div className="flex justify-center py-12 items-center rounded-2xl shadow-basic mt-8 flex-col px-6 skeleton aspect-square" />
            <div className="w-1/2  mx-auto mt-10">
              <div className="mx-auto !skeleton rounded-md h-8 w-32" />
            </div>
          </>
        ) : (
          <>
            {' '}
            <h2 className="text-mainTitle2-bold mb-5">
              기쁠 때
              <br />
              <b className="text-brand-main-green400 break-keep">
                사람들에게 알리고 축하를 받아요
              </b>
            </h2>
            <div className="flex flex-col justify-center space-y-8 px-8 py-12 rounded-2xl shadow-basic mx-auto">
              <Bar
                active={inView}
                color="#00BC68"
                percent={100}
                title="사람들에게 알리고 축하를 받아요"
                accent
              />
              <Bar
                active={inView}
                color="#199EF0"
                percent={50}
                title="혼자 조용히 즐겨요"
              />
              <Bar
                active={inView}
                color="#FFEB34"
                percent={21}
                title="맛있는 음식을 먹어요"
              />
            </div>
            <div className="w-1/2  mx-auto mt-10">
              <Button
                rounded="full"
                variant="muted"
                className="bg-text-main-whiteFF"
              >
                자세히 보기
              </Button>
            </div>
          </>
        )}
      </div>
    </LazyMotion>
  )
}

export default Happy

interface BarProps extends HTMLMotionProps<'div'> {
  title: string
  percent: number
  color: string
  active?: boolean
  accent?: boolean
}

function Bar({
  color,
  title,
  percent,
  active = false,
  accent = false,
  ...rest
}: BarProps) {
  const font = accent ? 'text-body1-bold' : 'title-body-medium'
  const 최소바크기보정값 = (80 * percent) / 100 + 10
  return (
    <div className="flex flex-col space-y-3">
      <h3 className={cn('text-text-main-black11', font)}>{title}</h3>
      <div className="flex space-x-2 w-full">
        <m.div
          {...rest}
          initial={{ width: '0%' }}
          animate={
            active
              ? {
                  width: `${최소바크기보정값}%`,
                  transition: {
                    delay: 0.15,
                    duration: 0.5,
                  },
                }
              : {}
          }
          className="w-full rounded-full h-6"
          style={{
            backgroundColor: color,
          }}
        />
        <p className={cn(font)} style={accent ? { color } : {}}>
          {percent}%
        </p>
      </div>
    </div>
  )
}
