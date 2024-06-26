import { Button } from '@/components/ui'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { MONEY } from '@/model/dashboard.entity'
import { useSession } from '@/provider/session-provider'
import { getDashboardQuery } from '@/queries/dashboard'
import { useQuery } from '@tanstack/react-query'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import React, { useMemo, useState } from 'react'

const Money = ({ filter }: { filter: FilterType }) => {
  const { handle } = useDetailDrawer()

  const { data: statisics, isLoading } = useQuery({
    ...getDashboardQuery(filter),
    select(data) {
      return data.data?.statistics.find(
        (item) => item.dashboardType === 'MONEY',
      ) as MONEY
    },
  })

  const { ref, inView } = useInViewRef<HTMLDivElement>({
    once: true,
    amount: 'all',
  })
  const myAvg = useMemo(() => {
    const total = (statisics?.average ?? 0) + (statisics?.entireAverage ?? 0)

    return {
      mine: (statisics?.average ?? 0) / total,
      entire: (statisics?.entireAverage ?? 0) / total,
    }
  }, [statisics])
  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        {isLoading || !statisics ? (
          <>
            <div className="skeleton mb-2 h-8 w-1/4" />
            <div className="skeleton mb-5 h-8 w-3/4" />
            <div className="skeleton h-5 w-1/5" />
            <div className="skeleton mt-8 flex aspect-square flex-col items-center justify-center rounded-2xl px-6 py-12 shadow-basic" />
            <div className="mx-auto  mt-10 w-1/2">
              <div className="!skeleton mx-auto h-8 w-32 rounded-md" />
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-5 text-mainTitle2-bold">
              <b className="text-brand-main-green400">
                {statisics.peopleCount}명
              </b>
              에게
              <br />
              <b className="text-brand-main-green400">
                {statisics.average.toLocaleString()}원
              </b>{' '}
              빌릴 수 있어요
            </h2>
            {/* <div
              className="text-body3-medium text-text-sub-gray76 px-2 py-1 bg-gray-gray50 w-fit rounded-md
        "
            >
              이용자 중 상위 99%
            </div> */}
            <div className="mx-auto mb-10 mt-8 flex items-center rounded-2xl py-12 shadow-basic">
              <div className="mx-auto flex h-full space-x-12">
                <Bar
                  price={statisics.average ?? 0}
                  active={inView}
                  value={myAvg.mine * 100}
                />
                <Bar
                  price={statisics.entireAverage ?? 0}
                  active={inView}
                  isMe={false}
                  value={myAvg.entire * 100}
                />
              </div>
            </div>
          </>
        )}
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
      </div>
    </LazyMotion>
  )
}

export default Money

interface BarProps {
  active?: boolean
  isMe?: boolean
  value: number
  price: number
}

function Bar({ active, value, price, isMe = true }: BarProps) {
  const { data } = useSession()
  const [isDone, setIsDone] = useState(false)
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex h-40 w-14 flex-col items-center justify-end">
        <div
          className={cn(
            'relative w-fit items-center justify-center whitespace-nowrap  rounded-md text-body3-bold',
            'mb-4 px-2 py-1',
            isMe
              ? 'bg-brand-sub1-yellow900 text-text-main-whiteFF'
              : 'bg-gray-gray100 text-text-sub-gray76',
          )}
        >
          {price.toLocaleString()}원
          <svg
            className={cn(
              'absolute -bottom-2.5 left-1/2 -translate-x-1/2',
              isMe ? 'fill-brand-sub1-yellow900' : 'fill-gray-gray100',
            )}
            width="25"
            height="12"
            viewBox="0 0 25 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.5 12L0.808656 -2.94949e-07L24.1913 1.74923e-06L12.5 12Z" />
          </svg>
        </div>
        <m.div
          initial={{ height: 0 }}
          onAnimationComplete={() => {
            setIsDone(true)
          }}
          animate={
            active
              ? isDone
                ? {
                    height: [`${value}%`, `${value * 0.8}%`],
                    transition: {
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: Math.random() * 5 + 1.2,
                    },
                  }
                : {
                    height: `${value}%`,
                    transition: {
                      delay: 0.15,
                      duration: 0.5,
                    },
                  }
              : {}
          }
          className={cn(
            'relative w-full origin-bottom rounded-md',
            isMe ? 'bg-brand-sub1-yellow900' : 'bg-gray-gray100',
          )}
        />
      </div>

      <p
        className={cn(
          'mx-auto mt-4 w-fit',
          isMe && 'text-body1-bold text-text-main-black11',
          !isMe && 'text-body1-medium text-text-sub-gray76 opacity-50',
        )}
      >
        {isMe ? (data?.user?.name ?? '') + ' 님' : '이용자 평균'}
      </p>
    </div>
  )
}
