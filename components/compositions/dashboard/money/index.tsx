import { FilterType } from '@/hooks/use-filter'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { getDashboardQuery } from '@/queries/dashboard'
import { useQuery } from '@tanstack/react-query'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import React, { useState } from 'react'

const Money = ({ filter }: { filter: FilterType }) => {
  const { data: statisics, isLoading } = useQuery(getDashboardQuery(filter))
  const { ref, inView } = useInViewRef<HTMLDivElement>({
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
            <div className="h-5 skeleton w-1/5" />
            <div className="flex justify-center py-12 items-center rounded-2xl shadow-basic mt-8 flex-col px-6 skeleton aspect-square" />
            <div className="w-1/2  mx-auto mt-10">
              <div className="mx-auto !skeleton rounded-md h-8 w-32" />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-mainTitle2-bold mb-5">
              <b className="text-brand-main-green400">123명</b>
              에게
              <br />
              <b className="text-brand-main-green400">
                {(9999999).toLocaleString()}원
              </b>{' '}
              빌릴 수 있어요
            </h2>
            <div
              className="text-body3-medium text-text-sub-gray76 px-2 py-1 bg-gray-gray50 w-fit rounded-md
        "
            >
              이용자 중 상위 99%
            </div>
            <div className="mt-8 mb-10 py-12 flex items-center rounded-2xl shadow-basic mx-auto">
              <div className="flex mx-auto h-full space-x-12">
                <Bar active={inView} value={75} />
                <Bar active={inView} isMe={false} value={35} />
              </div>
            </div>
          </>
        )}
      </div>
    </LazyMotion>
  )
}

export default Money

interface BarProps {
  active?: boolean
  isMe?: boolean
  value: number
}

function Bar({ active, value, isMe = true }: BarProps) {
  const [isDone, setIsDone] = useState(false)
  return (
    <div className="h-full flex flex-col">
      <div className="w-14 mx-auto flex flex-col items-center justify-end h-40">
        <div
          className={cn(
            'w-fit relative rounded-md text-body3-bold whitespace-nowrap  items-center justify-center',
            'mb-4 px-2 py-1',
            isMe
              ? 'bg-brand-sub1-yellow900 text-text-main-whiteFF'
              : 'bg-gray-gray100 text-text-sub-gray76',
          )}
        >
          {(1384843).toLocaleString()}원
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
          'w-fit mx-auto mt-4',
          isMe && 'text-text-main-black11 text-body1-bold',
          !isMe && 'text-text-sub-gray76 text-body1-medium opacity-50',
        )}
      >
        {isMe ? '김디엔님' : '이용자 평균'}
      </p>
    </div>
  )
}
