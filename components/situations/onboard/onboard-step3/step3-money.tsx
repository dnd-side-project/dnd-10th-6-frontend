import { Button } from '@/components/ui'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import React, { useMemo, useState } from 'react'

const statistics = {
  dashboardType: 'MONEY',
  questionId: '65d8f7b8c934b525dd047560',
  peopleCount: 11,
  average: 18309133,
  entireAverage: 32453728,
}

const Step3Money = ({ filter }: { filter: FilterType }) => {
  const { handle } = useDetailDrawer()

  const { ref, inView } = useInViewRef<HTMLDivElement>({
    once: true,
    amount: 'all',
  })
  const myAvg = useMemo(() => {
    const total = (statistics?.average ?? 0) + (statistics?.entireAverage ?? 0)

    return {
      mine: (statistics?.average ?? 0) / total,
      entire: (statistics?.entireAverage ?? 0) / total,
    }
  }, [statistics])
  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        <>
          <h2 className="text-start text-[1.6vb] font-bold mb-[1.5vb]">
            <b className="text-brand-main-green400">
              {statistics.peopleCount}명
            </b>
            에게
            <br />
            <b className="text-brand-main-green400">
              {statistics.average.toLocaleString()}원
            </b>{' '}
            빌릴 수 있어요
          </h2>
          <div className="mt-[0.8vb] mb-[1vb] py-[1.2vb] flex items-center rounded-[1.6vb] shadow-basic mx-auto">
            <div className="flex mx-auto h-full space-x-[4vb]">
              <Bar
                price={statistics.average ?? 0}
                active={inView}
                value={myAvg.mine * 100}
              />
              <Bar
                price={statistics.entireAverage ?? 0}
                active={inView}
                isMe={false}
                value={myAvg.entire * 100}
              />
            </div>
          </div>
        </>
        <div className="w-1/2  mx-auto mt-[2vb]">
          <Button
            onClick={() => {}}
            rounded="full"
            variant="Line-neutral"
            className="mx-auto text-[1vb] h-[3vb]"
          >
            자세히 보기
          </Button>
        </div>
      </div>
    </LazyMotion>
  )
}

export default Step3Money

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
    <div className="h-full flex flex-col">
      <div className="w-[4vb] mx-auto flex flex-col items-center justify-end h-[16vb]">
        <div
          className={cn(
            'w-fit relative rounded-md text-[1.2vb] font-bold whitespace-nowrap  items-center justify-center',
            'mb-4 px-2 py-1',
            isMe
              ? 'bg-brand-sub1-yellow900 text-text-main-whiteFF'
              : 'bg-gray-gray100 text-text-sub-gray76',
          )}
        >
          {price.toLocaleString()}원
          <svg
            className={cn(
              'absolute left-1/2 -translate-x-1/2 -bottom-2.5',
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
            'w-full origin-bottom relative rounded-md',
            isMe ? 'bg-brand-sub1-yellow900' : 'bg-gray-gray100',
          )}
        />
      </div>

      <p
        className={cn(
          'w-fit mx-auto mt-4 text-[1.2vb] font-bold',
          isMe && 'text-text-main-black11',
          !isMe && 'text-text-sub-gray76 font-medium opacity-50',
        )}
      >
        {isMe ? '김디엔 님' : '이용자 평균'}
      </p>
    </div>
  )
}
