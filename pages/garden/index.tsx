import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

import BaseLayout from '@/layout/base-layout'
import withAuth from '@/layout/HOC/with-auth'
import { NamuiApi } from '@/lib/namui-api'
import { cn } from '@/lib/client/utils'
import { useToggletheme } from '@/contexts/wiki-provider'

import { useIntersectionObserver } from '@/hooks/use-observer'
import { fadeInProps } from '@/variants'
import { WikiType } from '@/types'

import TreeCard from '@/components/compositions/tree-card'
import ShareModal from '@/components/share-modal'
import InfoIcon from '@/components/svgs/info-icon'
import { Button } from '@/components/ui'
import backIcon from '@/assets/icons/back.svg'

const Pages = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const wikiType = searchParams.get('wikiType') as WikiType

  const {
    data: surveys,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['surveys', wikiType],
    queryFn: ({ pageParam = 0 }) => NamuiApi.getSurveys(pageParam, wikiType),
    getNextPageParam: (lastPage) => {
      return lastPage.data.totalPage - 1 <= lastPage.data.page
        ? undefined
        : lastPage.data.page + 1
    },
    initialPageParam: 0,
  })

  const { data: wikis } = useQuery({
    queryKey: ['wikis'],
    queryFn: NamuiApi.getWikis,
  })

  const wikiAnswerCount = useMemo(
    () =>
      wikis?.data.wikiList.find((wiki) => wiki.wikiType === wikiType)
        ?.answerCount || 0,
    [wikis, wikiType],
  )

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    hasNextPage,
    fetchNextPage,
  })

  useToggletheme(wikiType)

  const [showScrollButton, setShowScrollButton] = useState(false)

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
      className="bg-bg-white flex h-calc-h flex-col px-5"
      header={{
        className: 'bg-bg-white w-full flex justify-between items-center px-0',
        leftIcon: (
          <Image src={backIcon} alt="back" onClick={() => router.back()} />
        ),
        rightIcon: false,
        center: <p className="text-t4-kr-b text-black">내 정원</p>,
      }}
    >
      <div className="flex items-center justify-between py-6 ">
        <div className="flex flex-col space-y-2 ">
          <p className="text-b2-kr-m text-font-gray-03">
            내 정원에 심어진 나무
          </p>
          <h3 className="text-d4-kr-b text-black">
            {wikiAnswerCount}
            <span className=" text-subTitle1-bold text-black"> 그루</span>
          </h3>
        </div>
        <div className="flex items-center justify-start ">
          <ShareModal wikiType={wikiType}>
            <Button className="px-4 py-3 text-but3-sb" variant="BG-neutral">
              링크 공유
            </Button>
          </ShareModal>
        </div>
      </div>
      <hr className="mb-6 border-line-regular" />
      <section className="flex grow flex-col bg-white">
        <div className="flex items-center justify-start py-4">
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

                  <div className=" relative z-10 h-full w-full flex-1 whitespace-nowrap rounded-lg bg-black-800 px-4 py-3 text-b3-kr-sb text-white">
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
                className="grid w-full grid-cols-3 gap-2 "
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
                      wikiType={wikiType}
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
                    className=" flex aspect-[104/110] h-full items-center justify-center rounded-md border border-dashed bg-bg-light p-[25%]"
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
                    className={cn(
                      'skeleton relative aspect-[104/110] h-full cursor-pointer',
                    )}
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
      </section>
    </BaseLayout>
  )
}

const Garden = withAuth(Pages)
Garden.getLayout = (page: ReactNode) => page

export default Garden
