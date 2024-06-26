import { useMemo, useRef } from 'react'
import { cn, useBrowserLayoutEffect } from '@/lib/client/utils'
import { Pie, Sector } from 'recharts'
import { Cell } from 'recharts'
import { PieChart, ResponsiveContainer } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { FilterType } from '@/hooks/use-filter'
import { RANK_COLOR } from '@/constants'
import { Button } from '@/components/ui'
import { BEST_WORTH } from '@/model/dashboard.entity'
export interface Payload {
  percent: number
  name: number
  midAngle: number
  middleRadius: number
  cx: number
  cy: number
  stroke: string
  fill: string
  legend: string
  percentage: number
  color: string
  innerRadius: number
  outerRadius: number
  maxRadius: number
  value: number
  startAngle: number
  endAngle: number
  paddingAngle: number
  tabIndex: number
}
const RenderActiveShape = (props: PieSectorDataItem) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    name,
    payload,
    color,
    legend,
  } = props as PieSectorDataItem & Payload
  const textRef = useRef<SVGTextElement>(null)
  const IsStartAnimation = useRef(false)
  useBrowserLayoutEffect(() => {
    if (!IsStartAnimation.current) {
      const DURATION = 1500
      const easeOutQuint = (x: number): number => {
        return 1 - Math.pow(1 - x, 5)
      }

      const target = (percent ?? 0) * 100

      let animationId: number
      // 최초 시작 시간
      let start: number

      const animate = () => {
        if (!start) start = new Date().getTime()
        // 현재시간 - 최초시작시간
        const timestamp = new Date().getTime()
        const progress = timestamp - start
        if (progress >= DURATION) {
          if (textRef.current) {
            textRef.current.textContent = `${Math.floor(target)}%`
          }
          return cancelAnimationFrame(animationId)
        }

        const p = progress / DURATION
        const value = easeOutQuint(p)
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(target * value)}%`
        }
        if (p < DURATION) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animationId = requestAnimationFrame(animate)
      IsStartAnimation.current = true
    }
  }, [percent])

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy="0%"
        textAnchor="middle"
        className="text-[2vb] font-bold"
      >
        {legend}
      </text>
      <text
        ref={textRef}
        className={cn('font-base text-[2vb] font-bold')}
        x={cx}
        y={cy}
        dy="10%"
        textAnchor="middle"
        fill={fill}
      ></text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        style={{ fill: color }}
        fill={fill}
      />
    </g>
  )
}

const statisics: BEST_WORTH = {
  dashboardType: 'BEST_WORTH',
  questionId: '',
  rank: [
    {
      legend: '돈',
      percentage: 71,
    },
    {
      legend: '명예',
      percentage: 28,
    },
    {
      legend: '우정',
      percentage: 0,
    },
    {
      legend: '직접 입력',
      percentage: 0,
    },
    {
      legend: '사랑',
      percentage: 0,
    },
  ],
}
function Step3BestWorth({ filter }: { filter: FilterType }) {
  const { ref, inView } = useInViewRef<HTMLDivElement>({
    once: true,
    margin: '5%',
  })

  const orderByMaxValueList = useMemo(() => {
    const arr = statisics?.rank?.sort((a, b) => b.percentage - a.percentage)

    return arr?.map((item, index) => ({
      ...item,
      percentage: item.percentage ?? 0,
      color:
        RANK_COLOR[index] ??
        `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
    }))
  }, [statisics])

  return (
    <div ref={ref} className="w-full h-full flex flex-col">
      <>
        <h2 className="text-start text-[1.6vb] font-bold mb-[1.5vb]">
          가장 중요한 것은{' '}
          <b style={{ color: orderByMaxValueList?.[0].color }}>
            {orderByMaxValueList?.[0].legend}
          </b>
          이네요
        </h2>
        <div className="flex justify-center py-[1.2vb] items-center rounded-2xl shadow-basic mt-[0.8vb] flex-col px-[0.6vb]">
          <div className="w-[20vb] h-[20vb] mx-auto relative">
            {inView && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart barGap={0} barCategoryGap={0}>
                  <Pie
                    data={orderByMaxValueList}
                    activeIndex={0}
                    activeShape={RenderActiveShape}
                    animationBegin={0}
                    animationDuration={700}
                    animationEasing="ease-in-out"
                    labelLine={false}
                    dataKey="percentage"
                    cx="50%"
                    cy="50%"
                    innerRadius="50%"
                    outerRadius="20vb"
                  >
                    {orderByMaxValueList?.map((entry, index) => (
                      <Cell
                        style={{
                          fill: entry.color,
                        }}
                        key={`cell-${index}`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex justify-center space-x-[0.4vb] w-full mt-[0.8vb]">
            {orderByMaxValueList?.slice(0, 3).map((item) => {
              return (
                <div key={item.legend} className="flex items-center space-x-1">
                  <div
                    className={cn('w-[0.6vb] h-[0.6vb] rounded-full')}
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="font-bold text-[1vb] text-text-main-black11">
                    {item.legend}
                  </p>
                  <span className="font-medium text-[1vb] text-text-sub-gray4f">
                    {item.percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
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
      </>
    </div>
  )
}

export default Step3BestWorth
