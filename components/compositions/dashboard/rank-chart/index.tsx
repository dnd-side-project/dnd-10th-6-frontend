import { Button } from '@/components/ui'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { cn } from '@/lib/client/utils'
import { RankChart as RankChartType } from '@/model/dashboard.entity'
import { useSession } from '@/provider/session-provider'
import { PropswithWikiType } from '@/types'
import { m, domAnimation, LazyMotion } from 'framer-motion'
import { useMemo } from 'react'

interface RankChartProps {
  isLoading?: boolean
  dashboard: RankChartType
}

export const RankChart = ({
  dashboard,

  isLoading,
}: PropswithWikiType<RankChartProps>) => {
  const { data } = useSession()
  const { handle } = useDetailDrawer()

  const { inView, ref } = useInViewRef<HTMLDivElement>({
    once: true,
    amount: 'all',
    margin: '10%',
  })

  const parsedDashboard = useMemo(() => {
    const sorted = dashboard.rank.sort((a, b) => a.percentage + b.percentage)
    const temp = sorted[1]
    sorted[1] = sorted[0]
    sorted[0] = temp
    return sorted
  }, [dashboard.rank])

  const medals = useMemo(() => {
    return [
      <svg
        key="medal-1"
        width="19"
        height="24"
        viewBox="0 0 19 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H6.47059L11 9H4.52941L0 0Z" fill="#4F94F5" />
        <path d="M19 0H12.5294L8 9H14.4706L19 0Z" fill="#3473DE" />
        <circle cx="9.5" cy="14.5" r="9.5" fill="#8B96A8" />
        <circle cx="9.5" cy="14.5" r="7.5" fill="#ABB7C7" />
        <path
          d="M6.49414 17.7227L9.54102 14.9219C9.8418 14.6328 10.0742 14.3945 10.2383 14.207C10.4062 14.0156 10.5352 13.8262 10.625 13.6387C10.7148 13.4473 10.7598 13.2422 10.7598 13.0234C10.7598 12.7773 10.7012 12.5625 10.584 12.3789C10.4707 12.1914 10.3105 12.0488 10.1035 11.9512C9.90039 11.8535 9.66992 11.8047 9.41211 11.8047C9.00977 11.8008 8.68945 11.918 8.45117 12.1562C8.21289 12.3906 8.0957 12.7109 8.09961 13.1172H6.42383C6.42383 12.5742 6.54883 12.0977 6.79883 11.6875C7.05273 11.2734 7.40625 10.9551 7.85938 10.7324C8.31641 10.5098 8.8418 10.3984 9.43555 10.3984C10.0332 10.3984 10.5605 10.5059 11.0176 10.7207C11.4746 10.9316 11.8281 11.2266 12.0781 11.6055C12.332 11.9844 12.459 12.418 12.459 12.9062C12.459 13.2422 12.3945 13.5645 12.2656 13.873C12.1367 14.1777 11.9121 14.5176 11.5918 14.8926C11.2754 15.2676 10.8262 15.7188 10.2441 16.2461L8.95508 17.5V17.5469H12.5762V19H6.50586L6.49414 17.7227Z"
          fill="white"
        />
      </svg>,
      <svg
        key="medal-2"
        width="19"
        height="24"
        viewBox="0 0 19 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H6.47059L11 9H4.52941L0 0Z" fill="#EA4E51" />
        <path d="M19 0H12.5294L8 9H14.4706L19 0Z" fill="#BB3840" />
        <circle cx="9.5" cy="14.5" r="9.5" fill="#FFB843" />
        <circle cx="9.5" cy="14.5" r="7.5" fill="#FFD38B" />
        <path
          d="M11.0117 19H9.24219V12.1914H9.19531L7.25 13.4102V11.8516L9.34766 10.5156H11.0117V19Z"
          fill="white"
        />
      </svg>,
      <svg
        key="medal-3"
        width="19"
        height="24"
        viewBox="0 0 19 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H6.47059L11 9H4.52941L0 0Z" fill="#FFB046" />
        <path d="M19 0H12.5294L8 9H14.4706L19 0Z" fill="#F29126" />
        <circle cx="9.5" cy="14.5" r="9.5" fill="#98552B" />
        <circle cx="9.5" cy="14.5" r="7.5" fill="#CC7331" />
        <path
          d="M9.47656 19.1172C8.86328 19.1172 8.3125 19.0117 7.82422 18.8008C7.33984 18.5898 6.95703 18.2949 6.67578 17.916C6.39844 17.5332 6.25391 17.0977 6.24219 16.6094H8.02344C8.03125 16.8164 8.09961 17 8.22852 17.1602C8.35742 17.3164 8.53125 17.4395 8.75 17.5293C8.96875 17.6191 9.21484 17.6641 9.48828 17.6641C9.76562 17.6641 10.0137 17.6152 10.2324 17.5176C10.4551 17.416 10.627 17.2793 10.748 17.1074C10.8691 16.9316 10.9297 16.7305 10.9297 16.5039C10.9297 16.2734 10.8652 16.0703 10.7363 15.8945C10.6074 15.7148 10.4219 15.5742 10.1797 15.4727C9.9375 15.3711 9.65234 15.3203 9.32422 15.3203H8.53906V14.0195H9.32422C9.60156 14.0195 9.84766 13.9727 10.0625 13.8789C10.2773 13.7852 10.4434 13.6523 10.5605 13.4805C10.6816 13.3086 10.7422 13.1133 10.7422 12.8945C10.7422 12.6797 10.6914 12.4902 10.5898 12.3262C10.4883 12.1621 10.3438 12.0352 10.1562 11.9453C9.97266 11.8516 9.75781 11.8047 9.51172 11.8047C9.26172 11.8047 9.03125 11.8496 8.82031 11.9395C8.60938 12.0254 8.43945 12.1484 8.31055 12.3086C8.18164 12.4688 8.11328 12.6562 8.10547 12.8711H6.41797C6.42578 12.3945 6.56445 11.9688 6.83398 11.5938C7.10742 11.2148 7.47656 10.9219 7.94141 10.7148C8.40625 10.5039 8.92578 10.3984 9.5 10.3984C10.0781 10.3984 10.5898 10.5039 11.0352 10.7148C11.4844 10.9258 11.8301 11.2129 12.0723 11.5762C12.3184 11.9395 12.4414 12.3438 12.4414 12.7891C12.4414 13.0977 12.375 13.3789 12.2422 13.6328C12.1094 13.8828 11.9199 14.0898 11.6738 14.2539C11.4316 14.4141 11.1523 14.5234 10.8359 14.582V14.6523C11.4531 14.7266 11.9297 14.9395 12.2656 15.291C12.6016 15.6426 12.7656 16.0859 12.7578 16.6211C12.7617 17.0977 12.623 17.5273 12.3418 17.9102C12.0645 18.2891 11.6758 18.5859 11.1758 18.8008C10.6758 19.0117 10.1094 19.1172 9.47656 19.1172Z"
          fill="white"
        />
      </svg>,
    ]
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={ref}
        className="flex flex-col items-center  rounded-[20px] bg-bg-light py-10"
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

            <div className="mt-10  flex h-full w-full space-x-3 px-5">
              <div className="grid flex-1 grid-cols-3  gap-x-1">
                {parsedDashboard.slice(0, 3).map((data, index) => (
                  <div
                    key={data.text}
                    className="flex h-full flex-col items-center justify-end"
                  >
                    <div className="flex flex-col items-center rounded-2xl bg-white px-3 py-[10px]">
                      {medals[index]}
                    </div>
                    <div className="mt-2 flex flex-col space-y-1 text-center">
                      <p className="text-t3-kr-b">
                        {data.text.replace(/\([^)]*\)/, '')}
                      </p>
                      <p className="text-b2-kr-m text-black">
                        {data.percentage}%
                      </p>
                    </div>
                    <m.div
                      className="mt-5 flex w-full items-end justify-center rounded-t-xl bg-white pb-1"
                      initial={{ maxHeight: '0%' }}
                      animate={
                        inView
                          ? {
                              maxHeight: '100%',
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                      }}
                      style={{
                        height: [34, 59, 30][index],
                      }}
                    >
                      <span
                        className={cn(
                          'text-b2-kr-m',
                          index !== 1 && 'text-font-gray-04',
                        )}
                      >
                        {[2, 1, 3][index]}
                      </span>
                    </m.div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 w-full space-y-2 px-5">
              {parsedDashboard.slice(3, 5).map((item, index) => (
                <div
                  key={item.text}
                  className="flex items-center space-x-3 rounded-xl bg-white px-5 py-[18px]"
                >
                  <span className="flex h-5 w-5 items-center justify-center text-b2-kr-m text-font-gray-disabled">
                    {index + 4}
                  </span>
                  <div className="flex flex-1 space-x-2 text-b2-kr-m text-font-gray-disabled">
                    <span className="flex-1">{item.text}</span>
                    <span>{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mx-auto mt-10 flex w-2/5 justify-center">
          <Button
            onClick={() =>
              dashboard?.questionId && handle(dashboard?.questionId)
            }
            variant="Line-neutral"
            rounded="full"
          >
            <span className="text-but2-sb">자세히 보기</span>
          </Button>
        </div>
      </div>
    </LazyMotion>
  )
}
