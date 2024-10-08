import { useMemo, useRef } from 'react'
import { useSession } from '@/provider/session-provider'
import { cn } from '@/lib/client/utils'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { WIKI_COLORS } from '@/pages/dashboard'

import { RANK_COLOR } from '@/constants'
import { PropswithWikiType, WikiType } from '@/types'
import { BubbleChartType, Rank } from '@/model/dashboard.entity'
import { Button } from '@/components/ui'
import useDetailDrawer from '@/hooks/use-detail-drawer'

export const BubbleChart = ({
  dashboard,

  wikiType,
}: PropswithWikiType<{
  dashboard: BubbleChartType
  isLoading?: boolean
}>) => {
  const { data } = useSession()
  const { handle } = useDetailDrawer()

  const orderByMaxValueList = useMemo(() => {
    const arr = dashboard?.rank?.sort((a, b) => b.percentage - a.percentage)

    return arr?.map((item, index) => ({
      ...item,
      percentage: item.percentage ?? 0,
      color:
        RANK_COLOR[wikiType][index] ??
        `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
    }))
  }, [dashboard?.rank, wikiType])

  return (
    <div className="flex flex-col items-center rounded-[20px] bg-bg-light py-10">
      <h2 className="mx-auto w-fit px-5 text-t1-kr-b">
        {data?.user?.name}님에게 가장 중요한 것은
      </h2>
      <GrowingCircles data={orderByMaxValueList} wikiType={wikiType} />
      <Button
        onClick={() => dashboard?.questionId && handle(dashboard?.questionId)}
        variant="Line-neutral"
        rounded="full"
        className="mx-auto w-fit px-12 py-4"
      >
        <span className="text-but2-sb">자세히 보기</span>
      </Button>
    </div>
  )
}

/**
 * 공이 1개일 경우
 * 공이 2개일 경우
 * 공이 3개일 경우
 */

type BubbleOption = {
  left: number
  top: number
  mainColor: string | ((wikiType: WikiType) => string)
  subColor: string
}

type BALL_ONE = [BubbleOption]
type BALL_TWO = [BubbleOption, BubbleOption]
type BALL_THREE = [BubbleOption, BubbleOption, BubbleOption]

type BubbleChartProps = {
  data?: Rank[]
}

const BUBBLE_OPTIONS: [BALL_ONE, BALL_TWO, BALL_THREE] = [
  [
    {
      mainColor: (wikiType: WikiType) => WIKI_COLORS[wikiType].MAIN_COLOR,
      subColor: '#BFF1CF',
      left: 50,
      top: 50,
    },
  ],
  [
    {
      mainColor: (wikiType: WikiType) => WIKI_COLORS[wikiType].MAIN_COLOR,
      subColor: '#BFF1CF',
      left: 30,
      top: 50,
    },
    {
      mainColor: '#199EF0',
      subColor: '#B4E6FF',
      left: 70,
      top: 50,
    },
  ],
  [
    {
      mainColor: (wikiType: WikiType) => WIKI_COLORS[wikiType].MAIN_COLOR,
      subColor: '#BFF1CF',
      left: 30,
      top: 50,
    },
    {
      mainColor: '#199EF0',
      subColor: '#B4E6FF',
      left: 70,
      top: 30,
    },
    {
      mainColor: '#FDD82E',
      subColor: '#FFF59B',
      left: 65,
      top: 65,
    },
  ],
]

const GrowingCircles = ({
  data,
  wikiType,
}: PropswithWikiType<BubbleChartProps>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bubbles = useMemo(() => {
    if (!data) return null
    let lastIndex = data.findIndex((i) => i.percentage === 0)
    if (lastIndex <= 0) lastIndex = data.length
    const currentBubbleOptions =
      BUBBLE_OPTIONS[lastIndex > 3 ? 2 : lastIndex - 1]

    return currentBubbleOptions?.map((item, index) => ({
      ...item,
      id: data[index].legend,
      percentage: data[index].percentage,
      label: data[index].legend,
    }))
  }, [data])

  const totalPercentage = useMemo(() => {
    if (!bubbles?.length) return 0
    return bubbles.reduce((acc, cur) => acc + cur.percentage, 0)
  }, [bubbles])

  const inview = useInView(containerRef, {
    once: true,
    margin: '-100px',
  })

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden text-center"
    >
      {inview &&
        bubbles &&
        bubbles.map((bubble, index) => (
          <motion.div
            key={bubble.id}
            initial={{
              scale: 0,
            }}
            animate={{
              scale: bubble.percentage * (1 / totalPercentage),
            }}
            style={{
              top: bubble.top + '%',
              left: bubble.left + '%',
              x: '-50%',
              y: '-50%',
              background: `linear-gradient(to bottom, ${bubble.subColor} 0%, ${typeof bubble.mainColor === 'function' ? bubble.mainColor(wikiType) : bubble.mainColor})`,
            }}
            transition={{
              delay: 0.15 * index + 0.3,
            }}
            className={cn(
              'absolute flex aspect-square w-full max-w-[70%] origin-center flex-col items-center justify-center rounded-full',
            )}
          >
            <p
              className="font-medium text-font-black-02"
              style={{
                fontSize: mapValue(bubble.percentage, 100, 0, 20, 40),
              }}
            >
              {bubble.percentage}%
            </p>
            <p
              className="font-medium"
              style={{
                fontSize: mapValue(
                  bubble.percentage,
                  100,
                  0,
                  100 * bubble.percentage * (1 / totalPercentage),
                  50,
                ),
              }}
            >
              {bubble.label}
            </p>
          </motion.div>
        ))}
    </div>
  )
}

function mapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): number {
  return start2 + ((value - start1) * (end2 - start2)) / (end1 - start1)
}
