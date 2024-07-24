import { ReactNode, createContext, useRef, useState } from 'react'
import { cn } from '@/lib/client/utils'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { useSettingStore } from '@/stores/setting.store'
import { GetServerSideProps } from 'next'

import BaseLayout from '@/layout/base-layout'

import { FilterProvider } from '@/hooks/use-filter'
import withAuth from '@/layout/HOC/with-auth'
import DashboardContainer from '@/components/dashboard-container'
import DetailDrawer from '@/components/dashboard-container/detail-drawer'
import { useRouter } from 'next/router'
import { ShareImageDrawer, ShareImageProvider } from '@/components/share-image'
import { useSearchParams } from 'next/navigation'
import { WikiType } from '@/queries/surveys'
import { useToggleTheme } from '@/hooks/use-toggle-theme'
import { Button } from '@/components/ui'
import { useSession } from '@/provider/session-provider'
import { SafeSvgTextInner } from '@/components/safe-svg-text-inner'
import ShareModal from '@/components/share-modal'

import BarChart from '@/pages/assets/images/icons/barchart.png'
import PieChart from '@/pages/assets/images/icons/piechart.png'
import Gift from '@/pages/assets/images/icons/gift.png'
import Message from '@/pages/assets/images/icons/message.png'
import { StaticImageData } from 'next/image'

interface Colors {
  GRADIENT_FROM: string
  NAME_BOX: string
  WIKINAME_BOX: string
  LETTER_COUNT_BOX: string
  IMAGE_WIKI_DECO: StaticImageData
  IMAGE_COUNT_DECO: StaticImageData
}

const WIKI_COLORS: { [key in WikiType]: Colors } = {
  NAMUI: {
    GRADIENT_FROM: '#BFF1CF',
    NAME_BOX: '#199EF0',
    WIKINAME_BOX: '#00BE4F',
    LETTER_COUNT_BOX: '#FFEB34',
    IMAGE_COUNT_DECO: PieChart,
    IMAGE_WIKI_DECO: BarChart,
  },
  ROMANCE: {
    GRADIENT_FROM: '#FFD4DA',
    NAME_BOX: '#FF9E3A',
    WIKINAME_BOX: '#FF8282',
    LETTER_COUNT_BOX: '#FFEB34',
    IMAGE_WIKI_DECO: Gift,
    IMAGE_COUNT_DECO: Message,
  },
}

import { motion } from 'framer-motion'

export const DetailQsContext = createContext<{
  id: string
  handle: (id: string) => void
}>({ id: '', handle: () => {} })

const Page = ({ wikiType }: { wikiType: WikiType }) => {
  const searchParams = useSearchParams()
  const wiki = wikiType || (searchParams.get('wikiType') as WikiType)
  const { data } = useSession()
  const headerHeight = useSettingStore((state) => state.headerHeight)
  const [selectedQsId, setSelectedQsId] = useState('')
  const ref = useRef<HTMLElement>(null)

  const router = useRouter()
  const { direction, scrollTop } = useScrollDirection({ ref })
  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  useToggleTheme(wikiType)

  const handleQsId = (id: string) => {
    setSelectedQsId(id)
  }
  return (
    <BaseLayout
      showHeader
      ref={ref}
      header={{
        className: 'bg-transparent',
        options: {
          onBackClick: () => router.back(),
          onCenterClick: () => router.back(),
          showRight: true,
        },
      }}
      className={cn('h-calc-h overflow-y-scroll')}
    >
      <div
        className={cn(
          'relative top-[calc(var(--header-height)_*_-1)] flex flex-col items-center  pb-20 pt-[var(--header-height)]',
          `bg-gradient-to-b from-brand-main  to-white`,
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${WIKI_COLORS[wiki].GRADIENT_FROM}, #FFFFFF)`,
        }}
      >
        <svg
          className="h-full w-full overflow-visible px-9 py-16"
          viewBox="0 0 305 244"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <SafeSvgTextInner minWidth={200} maxWidth={305}>
            {(ref, width) => {
              const svgWidth = 305

              let gTransform = { x: 0, y: 0 }
              if (width > 0 && ref.current) {
                const gBox = ref.current.getBBox()
                const gCenterX = gBox.x + gBox.width / 2
                const svgCenterX = svgWidth / 2
                const translateX = svgCenterX - gCenterX

                gTransform = { x: translateX, y: gBox.y - 5 }
              }

              return (
                <motion.g
                  initial={{
                    y: gTransform.y - 500,
                    x: gTransform.x,
                    rotateZ: 1.65809,
                  }}
                  animate={{
                    x: gTransform.x,
                    y: gTransform.y,
                    rotateZ: 1.65809,
                  }}
                  transition={{
                    type: 'spring',
                    damping: 8,
                    stiffness: 30,
                    mass: 0.8,
                    delay: 0.2,
                  }}
                >
                  <rect
                    x="2.14117"
                    width={width}
                    height="74"
                    rx="37"
                    fill={WIKI_COLORS[wiki].NAME_BOX}
                  />
                  <text
                    ref={ref}
                    x={width / 2}
                    y="40"
                    fill="white"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    className="text-d3-kr-b"
                  >
                    {data?.user?.name}님의
                  </text>
                </motion.g>
              )
            }}
          </SafeSvgTextInner>

          <SafeSvgTextInner minWidth={190} maxWidth={305}>
            {(ref, width) => (
              <motion.g
                initial={{ y: -500 }}
                animate={{ y: 15, rotateZ: 3 }}
                transition={{
                  type: 'spring',
                  damping: 8,
                  stiffness: 30,
                  mass: 0.8,
                }}
              >
                <rect
                  x="4.18689"
                  y="142.24"
                  width={width}
                  height="80"
                  rx="40"
                  fill={WIKI_COLORS[wiki].LETTER_COUNT_BOX}
                />
                <text
                  ref={ref}
                  x={width / 2}
                  y={142.24 + 40}
                  text-anchor="middle"
                  alignment-baseline="middle"
                  className="fill-black text-d3-kr-b"
                >
                  6명 작성
                </text>
              </motion.g>
            )}
          </SafeSvgTextInner>
          <motion.g
            className="z-[1]"
            transform="rotate(-3 109.08 82.0801)"
            initial={{ y: -500 }}
            animate={{ y: 0, rotateZ: -3 }}
            transition={{
              type: 'spring',
              damping: 8,
              stiffness: 30,
              mass: 0.8,
              delay: 0.1,
            }}
          >
            <rect
              x="109.08"
              y="82.0801"
              width={'192'}
              height="80"
              rx="40"
              fill={WIKI_COLORS[wiki].WIKINAME_BOX}
            />
            <text
              x={205}
              y={82.0801 + 40}
              text-anchor="middle"
              alignment-baseline="middle"
              className="fill-black text-d3-kr-b"
            >
              남의위키
            </text>
          </motion.g>
          <motion.image
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            transition={{
              type: 'spring',
              damping: 8,
              stiffness: 30,
              mass: 0.8,
              delay: 0.1,
            }}
            x="15"
            y="75"
            width="87"
            height="87"
            href={WIKI_COLORS[wiki].IMAGE_WIKI_DECO.src}
          />
          <motion.image
            className="origin-center"
            initial={{ y: -500, rotateY: '45deg' }}
            animate={{
              y: 0,
              rotateY: '0deg',
            }}
            transition={{
              y: {
                type: 'spring',
                damping: 8,
                stiffness: 30,
                mass: 0.8,
                delay: 0.1,
              },
              rotateY: {
                type: 'spring',
                bounce: 0.6,
                damping: 3,
                stiffness: 80,
              },
            }}
            x="188.668"
            y="154"
            width="90"
            height="90"
            href={WIKI_COLORS[wiki].IMAGE_COUNT_DECO.src}
          />
        </svg>

        <motion.h3
          className="text-center text-t3-kr-m"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 8,
            stiffness: 30,
            mass: 0.8,
            delay: 0.5,
          }}
        >
          남이 써주는 나의 소개서
          <br />
          친구들이 보는
          <br />
          나의 모습은 어떤지 알아볼까요?
        </motion.h3>
        <ShareModal wikiType={wikiType}>
          <Button
            rounded="full"
            variant="BG-accent"
            className="mt-[80px] w-fit px-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 5,
              stiffness: 30,
              mass: 0.8,
              delay: 0.8,
            }}
          >
            링크 공유하기
          </Button>
        </ShareModal>
      </div>
      <DetailQsContext.Provider
        value={{ id: selectedQsId, handle: handleQsId }}
      >
        <FilterProvider>
          <DashboardContainer
            wikiType={wiki}
            shouldShowHeader={shouldShowHeader}
          />
        </FilterProvider>

        <FilterProvider>
          <ShareImageProvider>
            <DetailDrawer />
            <ShareImageDrawer />
          </ShareImageProvider>
        </FilterProvider>
      </DetailQsContext.Provider>
    </BaseLayout>
  )
}

const DashboardWithAuth = withAuth(Page)
DashboardWithAuth.getLayout = (page: ReactNode) => page
export default DashboardWithAuth

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  const { wikiType } = context.query
  if (!wikiType || typeof wikiType !== 'string') {
    return {
      redirect: {
        destination: '/main',
        permanent: true,
      },
    }
  }
  if (!isViewOnboard) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: true,
      },
    }
  }
  return { props: { wikiType: wikiType.toUpperCase() } }
}) satisfies GetServerSideProps
