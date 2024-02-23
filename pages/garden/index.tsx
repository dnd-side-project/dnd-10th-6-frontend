import { ReactNode, useEffect, useState } from 'react'
import BaseLayout from '@/layout/base-layout'
import withAuth from '@/layout/HOC/with-auth'
import Button from '@/components/button'
import Link from 'next/link'
import TreeCard from '@/components/compositions/tree-card'
import { useSession } from '@/provider/session-provider'
const Pages = () => {
  const mockTreeCard = {
    period: 'INFINITE',
    relation: 'MIDDLE_AND_HIGH_SCHOOL',
  }
  const { data } = useSession()
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

  const totalCards = 2 // data?.user?.totalSurveyCnt ?? 0
  const cols = 4
  const remainder = totalCards % cols

  const emptyCards = remainder !== 0 ? cols - remainder : 0
  const cards = [...Array(totalCards)].map((_, index) => (
    <TreeCard
      key={index}
      period={mockTreeCard.period}
      relation={mockTreeCard.relation}
      isFlipped={index === flippedCardIndex}
      onClick={() => handleCardClick(index)}
    />
  ))

  for (let i = 0; i < emptyCards; i++) {
    cards.push(
      <div key={`empty-${i}`}>
        <div className="flex justify-center items-center rounded w-[80px] h-[90px] bg-gray-gray50 border-dashed border ">
          <svg
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
            <circle cx="14.8053" cy="12.6139" r="1.64516" fill="#D9D9D9" />
            <circle cx="21.3893" cy="14.8053" r="1.64516" fill="#D9D9D9" />
          </svg>
        </div>
      </div>,
    )
  }

  return (
    <BaseLayout
      className="bg-gray-gray50"
      header={{
        className: 'bg-gray-gray50',
        leftIcon: null,
        rightIcon: (
          <button>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58398 11.7539C7.10073 11.7539 6.70898 12.1457 6.70898 12.6289V22.7505C6.70898 23.2338 7.10074 23.6255 7.58398 23.6255H20.4173C20.9006 23.6255 21.2923 23.2338 21.2923 22.7505V12.6289C21.2923 12.1457 20.9006 11.7539 20.4173 11.7539H17.5007C17.0174 11.7539 16.6257 11.3622 16.6257 10.8789C16.6257 10.3957 17.0174 10.0039 17.5007 10.0039H20.4173C21.8671 10.0039 23.0423 11.1792 23.0423 12.6289V22.7505C23.0423 24.2003 21.8671 25.3755 20.4173 25.3755H7.58398C6.13424 25.3755 4.95898 24.2003 4.95898 22.7505V12.6289C4.95898 11.1792 6.13424 10.0039 7.58398 10.0039H10.5007C10.9839 10.0039 11.3757 10.3957 11.3757 10.8789C11.3757 11.3622 10.9839 11.7539 10.5007 11.7539H7.58398Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 3.79297C14.4832 3.79297 14.875 4.18472 14.875 4.66797V17.5013C14.875 17.9846 14.4832 18.3763 14 18.3763C13.5168 18.3763 13.125 17.9846 13.125 17.5013V4.66797C13.125 4.18472 13.5168 3.79297 14 3.79297Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3892 2.87286C13.7288 2.54238 14.2699 2.54238 14.6095 2.87286L18.6929 6.84584C19.0392 7.18283 19.0468 7.7368 18.7098 8.08316C18.3728 8.42952 17.8189 8.43711 17.4725 8.10011L13.9993 4.72083L10.5262 8.10011C10.1798 8.43711 9.62588 8.42952 9.28888 8.08316C8.95188 7.7368 8.95947 7.18283 9.30583 6.84584L13.3892 2.87286Z"
                fill="#111111"
              />
            </svg>
          </button>
        ),
        center: (
          <p className="text-body1-bold text-text-main-black11">내 정원</p>
        ),
      }}
    >
      <div className="flex px-[30px] pt-8 pb-6 space-x-6 justify-between items-center">
        <div className="flex flex-col space-y-2 flex-1">
          <p className="text-body1-medium text-text-sub-gray4f">
            내 정원에 심어진 나무는
          </p>
          <h3 className="text-mainTitle1-bold text-black">
            총 {data?.user?.totalSurveyCnt ?? 0}그루
          </h3>
        </div>
        <Link href="/dashboard">
          <Button className="!w-fit px-3 py-4">내 결과 보기</Button>
        </Link>
      </div>
      <section className="bg-white">
        <div className=" w-full px-[30px] py-6">
          <p className=" text-subTitle2-bold text-text-sub-gray4f text-left">
            받은 친구
          </p>
        </div>
        <div className="w-full justify-center items-center flex flex-col space-y-2 ">
          <div className="grid grid-cols-4 gap-2 ">{cards}</div>
        </div>

        {showScrollButton && (
          <button
            className="fixed z-[20] bottom-4 bg-white shadow-sm right-4 p-3 border rounded"
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
