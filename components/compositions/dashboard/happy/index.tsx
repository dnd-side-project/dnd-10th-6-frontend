import { Button } from '@/components/ui'
import { RANK_COLOR } from '@/constants'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { HAPPY_OR_SAD } from '@/model/dashboard.entity'
import { getDashboardQuery } from '@/queries/dashboard'
import { WikiType } from '@/queries/surveys'
import { useQuery } from '@tanstack/react-query'
import { HTMLMotionProps, m, LazyMotion, domAnimation } from 'framer-motion'
import React, { useMemo } from 'react'

const Happy = ({
  wikiType,
  filter,
}: {
  wikiType: WikiType
  filter: FilterType
}) => {
  const { handle } = useDetailDrawer()
  const { data: statisics, isLoading } = useQuery({
    ...getDashboardQuery(wikiType, filter),
    select(data) {
      return data.data?.statistics.find(
        (item) => item.dashboardType === 'HAPPY',
      ) as HAPPY_OR_SAD
    },
  })

  const { inView, ref } = useInViewRef<HTMLDivElement>({
    once: true,
    amount: 'all',
  })

  const orderByMaxValueList = useMemo(() => {
    const arr = statisics?.rank?.sort((a, b) => b.percentage - a.percentage)

    return arr?.map((item, index) => ({
      ...item,
      color:
        RANK_COLOR[index] ??
        `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
      text: item.legend.split('  ')[1],
    }))
  }, [statisics])

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        {isLoading ? (
          <>
            <div className="skeleton mb-2 h-8 w-1/4" />
            <div className="skeleton mb-5 h-8 w-3/4" />
            <div className="skeleton mt-8 flex aspect-square flex-col items-center justify-center rounded-2xl px-6 py-12 shadow-basic" />
            <div className="mx-auto  mt-10 w-1/2">
              <div className="!skeleton mx-auto h-8 w-32 rounded-md" />
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-5 text-mainTitle2-bold">
              {orderByMaxValueList?.[0].text === '직접 입력' ? (
                <span>친구가 써준 답변을 확인해보세요</span>
              ) : (
                <h2 className="mb-5 text-mainTitle2-bold">
                  기쁠 때 <br />
                  <b
                    className="break-keep"
                    style={{
                      color: orderByMaxValueList?.[0].color,
                    }}
                  >
                    {' '}
                    <span>{orderByMaxValueList?.[0].text}</span>
                  </b>
                </h2>
              )}
            </h2>
            <div className="mx-auto flex flex-col justify-center space-y-8 rounded-2xl px-8 py-12 shadow-basic">
              {orderByMaxValueList?.slice(0, 3).map((item, index) => {
                return (
                  <Bar
                    key={item.percentage + index}
                    active={inView}
                    color={item.color ?? ''}
                    percent={item.percentage}
                    title={item.text}
                    accent={index === 0}
                  />
                )
              })}
            </div>
            <div className="mx-auto mt-10 flex w-1/2 justify-center">
              <Button
                onClick={() =>
                  statisics?.questionId && handle(statisics?.questionId)
                }
                rounded="full"
                variant="Line-neutral"
                className="mx-auto"
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
      <div className="flex w-full space-x-2">
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
          className="h-6 w-full rounded-full"
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
