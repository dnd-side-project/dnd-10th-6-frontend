import React, { useId, useMemo } from 'react'

import { useSession } from '@/provider/session-provider'
import { m, LazyMotion, domAnimation } from 'framer-motion'

import { PropswithWikiType } from '@/types'
import { MAIN_COLOR } from '@/constants'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { BinaryChartType } from '@/model/dashboard.entity'
import { Button } from '@/components/ui'
import { cn } from '@/lib/client/utils'

export const BinaryChart = ({
  isLoading,
  dashboard,
}: PropswithWikiType<{
  isLoading?: boolean
  dashboard: BinaryChartType
}>) => {
  const { data } = useSession()
  const { handle } = useDetailDrawer()

  const { inView, ref } = useInViewRef<HTMLDivElement>({
    once: true,
  })

  const myAvg = useMemo(() => {
    const total = 100

    return {
      mine: Math.round(((dashboard.percentage ?? 0) / total) * 100) / 100,
      entire:
        Math.round(((total - dashboard.percentage ?? 0) / total) * 100) / 100,
    }
  }, [dashboard])

  const color = useMemo(
    () =>
      MAIN_COLOR.BINARY[Math.floor(Math.random() * MAIN_COLOR.BINARY.length)],
    [],
  )

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={ref}
        className="flex flex-col items-center space-y-[60px] rounded-[20px] bg-bg-light py-10"
      >
        {isLoading || !dashboard ? (
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
            <h2
              className="mx-auto w-fit text-center text-t1-kr-b"
              dangerouslySetInnerHTML={{
                __html: (dashboard?.questionTitle ?? '').replace(
                  '{{userName}}',
                  data?.user?.name ?? '',
                ),
              }}
            ></h2>

            <div className="mx-auto flex h-full space-x-3">
              <BinaryBarBar
                positive
                active={inView}
                value={myAvg.mine * 100}
                color={myAvg.mine >= myAvg.entire ? color : undefined}
              />
              <BinaryBarBar
                active={inView}
                isMe={false}
                value={myAvg.entire * 100}
                color={myAvg.mine < myAvg.entire ? color : undefined}
              />
            </div>
          </>
        )}
        <div className="mx-auto mt-10 flex w-1/2 justify-center">
          <Button
            onClick={() =>
              dashboard?.questionId &&
              handle(dashboard?.questionId, 'TWO_CHOICE')
            }
            rounded="full"
            variant="Line-neutral"
            className="mx-auto "
          >
            <span className="text-but2-sb">자세히 보기</span>
          </Button>
        </div>
      </div>
    </LazyMotion>
  )
}

interface BinaryBarProps {
  active?: boolean
  isMe?: boolean
  value: number
  positive?: boolean
  color?: { from: string; to: string }
}

function BinaryBarBar({ active, value, positive, color }: BinaryBarProps) {
  const id = useId()
  return (
    <m.div className="flex h-full flex-col">
      <div className="relative mx-auto flex h-44 w-36 flex-col items-center justify-end overflow-hidden rounded-[28px] bg-white">
        {positive ? (
          <svg
            width="63"
            height="63"
            viewBox="0 0 63 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 z-[1] -translate-y-1/2"
          >
            <circle
              opacity="0.2"
              cx="31.5"
              cy="31.5"
              r="25.5"
              stroke="black"
              strokeWidth="12"
            />
          </svg>
        ) : (
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 z-[1] -translate-y-1/2"
          >
            <path
              opacity="0.2"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.9407 12.0038C51.6867 9.25775 51.6867 4.80556 48.9407 2.05952C46.1947 -0.68651 41.7425 -0.686507 38.9964 2.05953L25.5 15.556L12.0038 2.05978C9.25775 -0.686253 4.80556 -0.686255 2.05952 2.05978C-0.68651 4.80581 -0.686507 9.25801 2.05953 12.004L15.5557 25.5002L2.06061 38.9953C-0.685427 41.7414 -0.68543 46.1936 2.0606 48.9396C4.80664 51.6856 9.25883 51.6856 12.0049 48.9396L25.5 35.4445L38.9953 48.9399C41.7414 51.6859 46.1936 51.6859 48.9396 48.9399C51.6856 46.1938 51.6856 41.7416 48.9396 38.9956L35.4442 25.5002L48.9407 12.0038Z"
              fill="black"
            />
          </svg>
        )}
        <span
          className={cn(
            'absolute bottom-3 z-[1] text-b2-kr-m ',
            color ? 'text-white' : 'text-font-gray-disabled',
          )}
        >
          {value}%
        </span>
        <m.div
          key={id}
          initial={{ height: 0 }}
          animate={
            active
              ? {
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
            !color && 'bg-bg-regular',
          )}
          style={{
            ...(color
              ? {
                  background: `linear-gradient(to top, ${color?.from || MAIN_COLOR.MONEY.from} 0%, ${color?.to || MAIN_COLOR.MONEY.to} 100%)`,
                }
              : {}),
          }}
        />
      </div>
    </m.div>
  )
}
