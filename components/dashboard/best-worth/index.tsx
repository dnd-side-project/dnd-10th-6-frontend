import { useMemo, useRef } from 'react'
import { cn, useBrowserLayoutEffect } from '@/lib/client/utils'
import { Pie, Sector } from 'recharts'
import { Cell } from 'recharts'
import { PieChart, ResponsiveContainer } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import Button from '@/components/button'
import { useInViewRef } from '@/hooks/use-in-view-ref'

export interface Payload {
  payload: {
    name: string
    value: number
    className: string
  }
  cx: string
  cy: string
  stroke: string
  fill: string
  name: string
  value: number
  className: string
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
            textRef.current.textContent = `${target}%`
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
        {name}
      </text>
      <text
        ref={textRef}
        className={cn(
          payload.className,
          'font-base font-bold text-3xl leading-10',
        )}
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
        className={cn(payload.className)}
        fill={fill}
      />
    </g>
  )
}

const data01 = [
  { name: '명예', value: 40, className: 'fill-brand-main-green400' },
  { name: '사랑', value: 31, className: 'fill-brand-sub1-blue600' },
  { name: '직접 입력', value: 12, className: 'fill-brand-sub1-yellow500' },
]
let cnt = 0
data01.forEach((data, idx) => {
  cnt += data.value
  if (idx === data01.length - 1) {
    data01.push({ name: 'none', value: 100 - cnt, className: 'fill-[#F0F0F0]' })
  }
})

function BestWorth() {
  const { ref, inView } = useInViewRef<HTMLDivElement>({
    once: true,
    margin: '2%',
  })

  const orderByMaxValueList = useMemo(() => {
    const arr = data01.sort((a, b) => b.value - a.value)

    return arr
  }, [])

  return (
    <div ref={ref} className="w-full h-full flex flex-col">
      <h2 className="text-mainTitle2 font-bold">
        가장 중요한 것은 <b className="text-brand-main-green400">명예</b>
        이네요
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
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={80}
                >
                  {orderByMaxValueList.map((entry, index) => (
                    <Cell className={entry.className} key={`cell-${index}`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex justify-center space-x-4 w-full mt-8">
          {data01.slice(0, 3).map((item) => (
            <div key={item.name} className="flex items-center space-x-1">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  item.name === '명예'
                    ? 'bg-brand-main-green400'
                    : item.name === '사랑'
                      ? 'bg-main-sub2-blue-blue600'
                      : 'bg-brand-sub1-yellow500',
                )}
              />
              <p className="font-bold text-sm text-text-main-black11">
                {item.name}
              </p>
              <span className="font-medium text-sm text-text-sub-gray4f">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2  mx-auto mt-10">
        <Button rounded="full" variant="muted" className="bg-text-main-whiteFF">
          자세히 보기
        </Button>
      </div>
    </div>
  )
}

export default BestWorth
