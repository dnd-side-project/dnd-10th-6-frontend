import { ReactNode, useEffect, useMemo, useState } from 'react'
import BaseLayout from '@/layout/base-layout'
import withAuth from '@/layout/HOC/with-auth'
import { Button } from '@/components/ui'
import Link from 'next/link'
import TreeCard from '@/components/compositions/tree-card'
import { useSession } from '@/provider/session-provider'
import { useInfiniteQuery } from '@tanstack/react-query'
import { NamuiApi } from '@/lib/namui-api'
import { GetSurveyResponse } from '@/model/survey.entity'
import { useIntersectionObserver } from '@/hooks/use-observer'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
import ShareModal from '@/components/share-modal'
import InfoIcon from '@/components/svgs/info-icon'
import WriteList from '@/components/header/write-list'
import { FilterProvider } from '@/hooks/use-filter'

const Pages = () => {
  const { data } = useSession()
  const {
    data: surveys,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<GetSurveyResponse>({
    initialPageParam: 0,
    getNextPageParam: (page) => {
      return page.data.totalPage - 1 <= page.data.page
        ? undefined
        : page.data.page + 1
    },
    queryKey: ['survey'],
    queryFn: ({ pageParam = 0 }) => {
      return NamuiApi.getSurveys(pageParam as number, 'NAMUI')
    },
  })

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    hasNextPage,
    fetchNextPage,
  })

  const [showScrollButton, setShowScrollButton] = useState(false)
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1)
  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrolledToBottom = scrollTop + windowHeight >= documentHeight
      setShowScrollButton(scrolledToBottom)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleCardClick = (index: number) => {
    if (flippedCardIndex === index) {
      setFlippedCardIndex(-1)
    } else {
      setFlippedCardIndex(index)
    }
  }
  const totalCount = useMemo(
    () => surveys?.pages[0].data.totalCount ?? 0,
    [surveys],
  )

  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (showTooltip) {
      const handleClose = () => {
        setShowTooltip(false)
      }

      document.addEventListener('click', handleClose)

      return () => {
        document.removeEventListener('click', handleClose)
      }
    }
  }, [showTooltip])

  return (
    <BaseLayout
      className="flex h-calc-h flex-col bg-gray-gray50"
      header={{
        className: 'bg-gray-gray50',
        leftIcon: null,
        rightIcon: false,
        center: (
          <p className="text-body1-bold text-text-main-black11">내 정원</p>
        ),
      }}
    >
      <div className="flex flex-col space-y-5 px-[30px] pb-6 pt-8">
        <div className="flex flex-1 flex-col space-y-2">
          <p className="text-body1-medium text-text-sub-gray4f">
            내 정원에 심어진 나무는
          </p>
          <h3 className="text-mainTitle1-bold text-black">
            총 {data?.user?.totalSurveyCnt ?? 0}그루
          </h3>
        </div>
        <div className="flex space-x-2">
          <div className="flex w-full">
            <FilterProvider>
              <WriteList
                trigger={
                  <Button
                    // variant={'muted'}
                    className="w-full border-none !text-body3-medium"
                  >
                    남의위키 작성목록
                  </Button>
                }
              />
            </FilterProvider>
          </div>
          <Link href="/dashboard" className="w-full">
            <button className="w-full rounded-md bg-main-green-green50 px-4 py-3 text-body3-medium text-main-green-green800 hover:bg-[#f3faf3] hover:text-main-green-green300 active:bg-main-green-green100 active:text-main-green-green800">
              내 결과 보기
            </button>
          </Link>
        </div>
      </div>
      <section className="flex grow flex-col bg-white">
        <div className="flex items-center justify-start px-[30px] py-4">
          <div className="relative text-left text-subTitle2-medium text-text-sub-gray4f">
            받은 친구
            <AnimatePresence mode="wait">
              {showTooltip && (
                <motion.div
                  onClick={() => setShowTooltip(false)}
                  initial={{ scale: 0, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{
                    scale: 0,
                    y: 10,
                    opacity: 0,
                    transformOrigin: '25% 0%',
                  }}
                  className="absolute z-10 origin-[25%_0%] -translate-x-1/2 transform text-center"
                >
                  <svg
                    className="relative left-3 z-20"
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4866 1.65177C9.6921 0.769006 8.3079 0.769005 7.51341 1.65177L8.74228e-07 10L18 10L10.4866 1.65177Z"
                      fill="#313131"
                    />
                  </svg>

                  <div className="relative z-10 h-full w-full flex-1 whitespace-nowrap rounded-lg bg-gray-gray800 px-4 py-3 text-body3-medium text-white">
                    알게 된 기간, 경로에 따라 <br /> 나무 모양과 색이 달라져요
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={(event) => {
              event.stopPropagation()
              setShowTooltip((prev) => !prev)
            }}
            className="ml-2 focus:outline-none"
          >
            <InfoIcon />
          </button>
        </div>
        <div className="flex w-full grow flex-col items-center space-y-2 pb-10">
          <AnimatePresence mode="wait">
            {!isLoading && surveys ? (
              <motion.div
                {...fadeInProps}
                transition={{ staggerChildren: 0.03 }}
                className="grid w-full grid-cols-3 gap-2 px-5 "
              >
                {surveys?.pages.map((page, pageNo) =>
                  page.data.content.map((item, index) => (
                    <TreeCard
                      senderName={item.senderName}
                      senderWikiId={item.senderWikiId}
                      key={`${item.surveyId}-${(pageNo + 1) * (index + 1)}`}
                      id={item.surveyId}
                      period={item.period}
                      relation={item.relation}
                      isFlipped={index === flippedCardIndex}
                      onClick={() => handleCardClick(index)}
                    />
                  )),
                )}
                {Array.from(
                  { length: Math.abs((totalCount % 3) - 3) + 3 },
                  () => null,
                ).map((_, index) => (
                  <motion.div
                    variants={fadeInProps.variants}
                    key={`empty-${(index + 1) * (index + 1)}`}
                    className="flex aspect-[104/110] h-full items-center justify-center rounded-md border border-dashed bg-gray-gray50 p-[25%]"
                  >
                    <svg
                      className="h-full w-full"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.36523 17.5469C8.55024 19.222 9.87772 22.8973 13.7077 24.1978C17.5376 25.4983 20.8343 24.6076 22.0039 23.9997"
                        stroke="#D9D9D9"
                        strokeLinecap="round"
                      />
                      <circle cx="17" cy="17" r="16.5" stroke="#D9D9D9" />
                      <circle
                        cx="14.8053"
                        cy="12.6139"
                        r="1.64516"
                        fill="#D9D9D9"
                      />
                      <circle
                        cx="21.3893"
                        cy="14.8053"
                        r="1.64516"
                        fill="#D9D9D9"
                      />
                    </svg>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`empty-container`}
                {...fadeInProps}
                className="grid grid-cols-3 gap-2 "
              >
                {Array.from({ length: 40 }, (_, v) => v + 1).map((i) => (
                  <motion.div
                    variants={fadeInProps.variants}
                    key={`loading-${i}`}
                    className="skeleton"
                  >
                    <div className="flex h-[110px] w-[104px] items-center justify-center rounded"></div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={ref} className="h-2 w-2" />
        </div>

        {showScrollButton && (
          <button
            className="fixed bottom-4 right-4 z-[20] rounded border bg-white p-3 shadow-sm"
            onClick={scrollToTop}
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.38462L7 1M7 1L13 6.38462M7 1V15"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className="sticky bottom-0 bg-gradient-to-t from-white from-85% to-transparent to-100% px-5 py-2 pt-5">
          <ShareModal>
            <Button variant="BG-accent">친구에게 소개서 부탁하기</Button>
          </ShareModal>
        </div>
      </section>
    </BaseLayout>
  )
}
const Garden = withAuth(Pages)
Garden.getLayout = (page: ReactNode) => page

export default Garden
