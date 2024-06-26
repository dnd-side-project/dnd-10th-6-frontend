import { useMemo, useRef } from 'react'
import { cn, useBrowserLayoutEffect } from '@/lib/client/utils'
import { Pie, Sector } from 'recharts'
import { Cell } from 'recharts'
import { PieChart, ResponsiveContainer } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { getDashboardQuery } from '@/queries/dashboard'
import { useQuery } from '@tanstack/react-query'
import { FilterType } from '@/hooks/use-filter'
import { RANK_COLOR } from '@/constants'
import { Button } from '@/components/ui/button'
import useDetailDrawer from '@/hooks/use-detail-drawer'
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
        dy={-10}
        textAnchor="middle"
        className="text-subTitle1-bold"
      >
        {legend.split(' ')[2]}
      </text>
      <text
        ref={textRef}
        className={cn('font-base font-bold text-3xl leading-10')}
        x={cx}
        y={cy}
        dy={25}
        textAnchor="middle"
        fontSize={30}
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

function BestWorth({ filter }: { filter: FilterType }) {
  const { handle } = useDetailDrawer()
  const { ref, inView } = useInViewRef<HTMLDivElement>({
    once: true,
    margin: '5%',
  })

  const { data: statisics, isLoading } = useQuery({
    ...getDashboardQuery(filter),
    select: (data) => {
      const bestWorth = data.data?.statistics.find(
        (item) => item.dashboardType === 'BEST_WORTH',
      )

      return bestWorth as BEST_WORTH
    },
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
      {isLoading ? (
        <>
          <div className="text-mainTitle2-bold font-bold h-8 skeleton w-3/4" />
          <div className="flex justify-center py-12 items-center rounded-2xl shadow-basic mt-8 flex-col px-6 skeleton aspect-square"></div>
          <div className="w-1/2  mx-auto mt-10">
            <div className="mx-auto !skeleton rounded-md h-8 w-32"></div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-mainTitle2-bold font-bold">
            {orderByMaxValueList?.[0].legend.split(' ')[2] === '직접' ? (
              <span>친구가 써준 답변을 확인하세요</span>
            ) : (
              <span>
                가장 중요한 것은{' '}
                <b style={{ color: orderByMaxValueList?.[0].color }}>
                  {orderByMaxValueList?.[0].legend.split(' ')[2]}
                </b>
                이네요
              </span>
            )}
          </h2>
          <div className="flex justify-center py-12 items-center rounded-2xl shadow-basic mt-8 flex-col px-6">
            <div className="w-[180px] h-[180px] mx-auto relative">
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
                      innerRadius={48}
                      outerRadius={80}
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
            <div className="flex justify-center space-x-4 w-full mt-8">
              {orderByMaxValueList?.slice(0, 3).map((item) => {
                return (
                  <div
                    key={item.legend}
                    className="flex items-center space-x-1"
                  >
                    <div
                      className={cn('w-2 h-2 rounded-full')}
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="font-bold text-sm text-text-main-black11">
                      {item.legend.split(' ')[2]}
                    </p>
                    <span className="font-medium text-sm text-text-sub-gray4f">
                      {item.percentage}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mx-auto mt-10 w-1/2 flex justify-center">
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
  )
}

export default BestWorth
