// import { Button } from '@/components/ui'
// import { RANK_COLOR } from '@/constants'
// import { FilterType } from '@/hooks/use-filter'
// import { useInViewRef } from '@/hooks/use-in-view-ref'
// import { cn } from '@/lib/client/utils'
// import { HTMLMotionProps, m, LazyMotion, domAnimation } from 'framer-motion'
// import React, { useMemo } from 'react'

// const statisics = {
//   dashboardType: 'HAPPY',
//   questionId: '65d8f7b8c934b525dd04755e',
//   rank: [
//     {
//       legend: '🏄🏼  취미생활을 즐겨요',
//       percentage: 11,
//     },
//     {
//       legend: '👏  혼자 조용히 즐겨요',
//       percentage: 11,
//     },
//     {
//       legend: '🎉  사람들에게 알리고 축하받아요',
//       percentage: 44,
//     },
//     {
//       legend: '🍱  맛있는 음식을 먹어요',
//       percentage: 33,
//     },
//     {
//       legend: '✍️  직접 입력',
//       percentage: 0,
//     },
//   ],
// }

// const Step3Happy = ({}: { filter: FilterType }) => {
//   const { inView, ref } = useInViewRef<HTMLDivElement>({
//     once: true,
//     amount: 'all',
//   })

//   const orderByMaxValueList = useMemo(() => {
//     const arr = statisics?.rank?.sort((a, b) => b.percentage - a.percentage)

//     return arr?.map((item, index) => ({
//       ...item,
//       color:
//         RANK_COLOR[index] ??
//         `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
//       text: item.legend.split('  ')[1],
//     }))
//   }, [statisics])

//   return (
//     <LazyMotion features={domAnimation}>
//       <div ref={ref}>
//         <>
//           <h2 className="mb-[1.5vb] text-start text-[1.6vb] font-bold">
//             기쁠 때
//             <br />
//             <b
//               className="break-keep"
//               style={{
//                 color: orderByMaxValueList?.[0].color,
//               }}
//             >
//               {orderByMaxValueList?.[0].text}
//             </b>
//           </h2>
//           <div className="mx-auto flex flex-col justify-center space-y-[1vb] rounded-[1.6vb] px-[0.8vb] py-[2.2vb] shadow-basic">
//             {orderByMaxValueList?.slice(0, 3).map((item, index) => {
//               return (
//                 <Bar
//                   key={item.percentage + index}
//                   active={inView}
//                   color={item.color ?? ''}
//                   percent={item.percentage}
//                   title={item.text}
//                   accent={index === 0}
//                 />
//               )
//             })}
//           </div>
//           <div className="mx-auto  mt-[2vb] w-1/2">
//             <Button
//               onClick={() => {}}
//               rounded="full"
//               variant="Line-neutral"
//               className="mx-auto h-[3vb] text-[1vb]"
//             >
//               자세히 보기
//             </Button>
//           </div>
//         </>
//       </div>
//     </LazyMotion>
//   )
// }

// export default Step3Happy

// interface BarProps extends HTMLMotionProps<'div'> {
//   title: string
//   percent: number
//   color: string
//   active?: boolean
//   accent?: boolean
// }

// function Bar({
//   color,
//   title,
//   percent,
//   active = false,
//   accent = false,
//   ...rest
// }: BarProps) {
//   const font = accent ? 'text-[1vb] font-bold' : 'text-[1vb] font-medium'
//   const 최소바크기보정값 = (80 * percent) / 100 + 10
//   return (
//     <div className="flex flex-col space-y-[1vb]">
//       <h3 className={cn('text-start text-text-main-black11', font)}>{title}</h3>
//       <div className="flex w-full space-x-[0.4vb]">
//         <m.div
//           {...rest}
//           initial={{ width: '0%' }}
//           animate={
//             active
//               ? {
//                   width: `${최소바크기보정값}%`,
//                   transition: {
//                     delay: 0.15,
//                     duration: 0.5,
//                   },
//                 }
//               : {}
//           }
//           className="w-full rounded-full"
//           style={{
//             backgroundColor: color,
//           }}
//         />
//         <p className={cn(font)} style={accent ? { color } : {}}>
//           {percent}%
//         </p>
//       </div>
//     </div>
//   )
// }
