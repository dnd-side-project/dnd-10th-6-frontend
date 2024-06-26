import { Button } from '@/components/ui'
import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import React, { useMemo, useState } from 'react'

const statistics = {
  dashboardType: 'MONEY',
  questionId: '65d8f7b8c934b525dd047560',
  peopleCount: 11,
  average: 18309133,
  entireAverage: 32453728,
}

const Step3Money = ({}: { filter: FilterType }) => {
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
          <h2 className="mb-[1.5vb] text-start text-[1.6vb] font-bold">
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
          <div className="mx-auto mb-[1vb] mt-[0.8vb] flex items-center rounded-[1.6vb] py-[1.2vb] shadow-basic">
            <div className="mx-auto flex h-full space-x-[4vb]">
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
        <div className="mx-auto  mt-[2vb] w-1/2">
          <Button
            onClick={() => {}}
            rounded="full"
            variant="Line-neutral"
            className="mx-auto h-[3vb] text-[1vb]"
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
  const [isDone, setIsDone] = useState(false)
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex h-[16vb] w-[4vb] flex-col items-center justify-end">
        <div
          className={cn(
            'relative w-fit items-center justify-center whitespace-nowrap rounded-md  text-[1.2vb] font-bold',
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
          'mx-auto mt-4 w-fit text-[1.2vb] font-bold',
          isMe && 'text-text-main-black11',
          !isMe && 'font-medium text-text-sub-gray76 opacity-50',
        )}
      >
        {isMe ? '김디엔 님' : '이용자 평균'}
      </p>
    </div>
  )
}
