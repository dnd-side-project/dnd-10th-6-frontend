import { Button } from '@/components/ui'
import { RANK_COLOR } from '@/constants'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { BarChartType, HAPPY_OR_SAD } from '@/model/dashboard.entity'
import { useSession } from '@/provider/session-provider'
import { getDashboardQuery } from '@/queries/dashboard'
import { PropswithWikiType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'

export const BarChart = ({
  wikiType,
  filter,
  chartType,
}: PropswithWikiType<{
  filter: FilterType
  chartType: BarChartType
}>) => {
  const { data } = useSession()
  const { handle } = useDetailDrawer()
  const { data: statisics, isLoading } = useQuery({
    ...getDashboardQuery(wikiType, filter),
    select(data) {
      return data.data?.statistics.find(
        (item) => item.dashboardType === chartType,
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
      <div
        ref={ref}
        className="flex flex-col items-center space-y-[60px] rounded-[20px] bg-bg-light px-5 py-10"
      >
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
            {orderByMaxValueList?.[0].text === '직접 입력' ? (
              <span>친구가 써준 답변을 확인해보세요</span>
            ) : (
              <h2
                className="mx-auto w-fit text-t1-kr-b"
                dangerouslySetInnerHTML={{
                  __html: (statisics?.questionTitle ?? '').replace(
                    '{{userName}}',
                    data?.user?.name ?? '',
                  ),
                }}
              ></h2>
            )}
            <div className="flex h-[30px] w-full overflow-hidden rounded-lg bg-black-50">
              {orderByMaxValueList
                ?.slice(0, 3)
                .map((rank) => (
                  <Bar
                    active={inView}
                    key={rank.legend}
                    color={rank.color}
                    percent={rank.percentage}
                  />
                ))}
            </div>
            <ul className="w-full space-y-2">
              {orderByMaxValueList?.slice(0, 3).map((item) => {
                return (
                  <IncreamentPercent
                    key={item.legend}
                    percent={item.percentage}
                    color={item.color}
                    active={inView}
                    title={item.legend
                      .split(' ')
                      .splice(1, Infinity)
                      .join(' ')
                      .trim()}
                  />
                )
              })}
            </ul>
            <div className="mx-auto mt-12 flex w-1/2 justify-center">
              <Button
                onClick={() =>
                  statisics?.questionId && handle(statisics?.questionId)
                }
                rounded="full"
                variant="Line-neutral"
                className="mx-auto"
              >
                <span className="text-but2-sb">자세히 보기</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </LazyMotion>
  )
}

interface BarProps {
  percent: number
  color: string
  active?: boolean
}

function Bar({ color, percent, active = false }: BarProps) {
  return (
    <m.div
      initial={{ width: '0%' }}
      animate={
        active
          ? {
              width: `${percent}%`,
              transition: {
                delay: 0.15,
                duration: 0.5,
              },
            }
          : {}
      }
      style={{
        backgroundColor: color,
      }}
      className="h-full"
    />
  )
}
interface IncreamentPercent {
  color: string
  percent: number
  title: string
  active?: boolean
}
function IncreamentPercent({
  active,
  color,
  percent,
  title,
}: IncreamentPercent) {
  const countRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let animationId: number

    const countAnimation = () => {
      if (countRef.current) {
        const startValue = 0

        const DURATION = 3500
        const easeOutQuint = (x: number): number => {
          return 1 - Math.pow(1 - x, 5)
        }

        const target = percent

        // 최초 시작 시간
        let start: number

        const animate = () => {
          if (!start) start = new Date().getTime()
          // 현재시간 - 최초시작시간
          const timestamp = new Date().getTime()
          const progress = timestamp - start
          if (progress >= DURATION) {
            if (countRef.current) {
              countRef.current.innerText = `${isNaN(target) ? 100 : target}%`
            }
            return cancelAnimationFrame(animationId)
          }

          const p = progress / DURATION
          const value = easeOutQuint(p)
          if (countRef.current) {
            const dest = target - startValue
            countRef.current.innerText = `${(isNaN(startValue) ? 0 : startValue ?? 0) + Math.round(dest * value) ?? 0}%`
          }
          if (p < DURATION) {
            animationId = requestAnimationFrame(animate)
          }
        }

        animationId = requestAnimationFrame(animate)
      }
    }

    if (active) {
      countAnimation()
    }
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [active, percent])
  return (
    <li className="flex w-full justify-between">
      <div className="flex items-center space-x-[6px]">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
        <span className="text-b2-kr-b">{title}</span>
      </div>
      <span ref={countRef} className="text-b2-kr-sb">
        0%
      </span>
    </li>
  )
}
