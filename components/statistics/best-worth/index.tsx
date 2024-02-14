import { cn } from '@/lib/client/utils'
import { useInView } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { Pie, Sector } from 'recharts'
import { Cell } from 'recharts'
import { PieChart, ResponsiveContainer } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

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
  } = props

  const textRef = useRef<SVGTextElement>(null)
  useEffect(() => {
    const DURATION = 1700
    function easeInOutQuad(x: number): number {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
    }
    const target = (percent ?? 0) * 100

    let animationId: number
    let start: number

    const animate = (timetamp: number) => {
      if (!start) start = timetamp
      const progress = timetamp - start
      if (progress >= DURATION) {
        if (textRef.current) {
          textRef.current.innerHTML = `${target}%`
        }
        return cancelAnimationFrame(animationId)
      }

      const p = progress / DURATION
      const value = easeInOutQuad(p)
      if (textRef.current) {
        textRef.current.innerHTML = `${Math.round(target * value)}%`
      }
      if (p < DURATION) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
  }, [percent])

  return (
    <g>
      <text x={cx} y={cy} dy={-10} textAnchor="middle">
        {name}
      </text>
      <text
        ref={textRef}
        x={cx}
        y={cy}
        dy={20}
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
  const ref = useRef<HTMLDivElement>(null)
  const isInview = useInView(ref, {
    once: true,
    amount: 0.9,
  })

  const orderByMaxValueList = useMemo(() => {
    const arr = data01.sort((a, b) => b.value - a.value)

    return arr
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-mainTitle2 font-bold">
        가장 중요한 것은 <b className="text-brand-main-green400">명예</b>
        이네요
      </h2>
      <div className="aspect-square flex justify-center items-center rounded-2xl shadow-lg mt-10 flex-col px-6">
        <div ref={ref} className="w-[180px] h-[180px] mx-auto relative -z-[1]">
          {isInview && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart barGap={0} barCategoryGap={0}>
                <Pie
                  data={orderByMaxValueList}
                  activeIndex={0}
                  activeShape={RenderActiveShape}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
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
        <div className="flex justify-between w-full mt-8">
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
    </div>
  )
}

export default BestWorth
