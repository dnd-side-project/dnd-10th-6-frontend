import { ReactNode, createContext, useMemo, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { StaticImageData } from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useSettingStore } from '@/stores/setting.store'
import { cn, useBrowserLayoutEffect } from '@/lib/client/utils'

import { useSession } from '@/provider/session-provider'
import BaseLayout from '@/layout/base-layout'
import withAuth from '@/layout/HOC/with-auth'
import { FilterProvider } from '@/hooks/use-filter'
import useScrollDirection from '@/hooks/use-scroll-direction'

import DashboardContainer from '@/components/dashboard-container'
import DetailDrawer from '@/components/dashboard-container/detail-drawer'
import ShareModal from '@/components/share-modal'
import { ShareImageDrawer, ShareImageProvider } from '@/components/share-image'
import { Button } from '@/components/ui'
import { SafeSvgTextInner } from '@/components/safe-svg-text-inner'

import BarChart from '@/pages/assets/images/icons/barchart.png'
import PieChart from '@/pages/assets/images/icons/piechart.png'
import Gift from '@/pages/assets/images/icons/gift.png'
import Message from '@/pages/assets/images/icons/message.png'

interface Colors {
  GRADIENT_FROM: string
  NAME_BOX: string
  WIKINAME_BOX: string
  LETTER_COUNT_BOX: string
  IMAGE_WIKI_DECO: StaticImageData
  IMAGE_COUNT_DECO: StaticImageData
  MAIN_COLOR: string
}

export const WIKI_NAME: { [key in WikiType]: string } = {
  NAMUI: '남의위키',
  ROMANCE: '연애위키',
}

export const WIKI_COLORS: { [key in WikiType]: Colors } = {
  NAMUI: {
    GRADIENT_FROM: '#BFF1CF',
    NAME_BOX: '#199EF0',
    WIKINAME_BOX: '#00BE4F',
    LETTER_COUNT_BOX: '#FFEB34',
    IMAGE_COUNT_DECO: PieChart,
    IMAGE_WIKI_DECO: BarChart,
    MAIN_COLOR: '#00BE4F',
  },
  ROMANCE: {
    GRADIENT_FROM: '#FFD4DA',
    NAME_BOX: '#FF9E3A',
    WIKINAME_BOX: '#FF8282',
    LETTER_COUNT_BOX: '#FFEB34',
    IMAGE_WIKI_DECO: Gift,
    IMAGE_COUNT_DECO: Message,
    MAIN_COLOR: '#FF6460',
  },
}

import { motion, useInView } from 'framer-motion'
import { PropswithWikiType, WikiType } from '@/types'
import { NamuiApi } from '@/lib/namui-api'
import { useToggletheme } from '@/contexts/wiki-provider'
import { useQuery } from '@tanstack/react-query'

export const DetailQsContext = createContext<{
  id: string
  handle: (id: string) => void
}>({ id: '', handle: () => {} })

const Page = ({ wikiType }: PropswithWikiType) => {
  const searchParams = useSearchParams()
  const wiki = wikiType || (searchParams.get('wikiType') as WikiType)
  const headerHeight = useSettingStore((state) => state.headerHeight)
  const [selectedQsId, setSelectedQsId] = useState('')
  const ref = useRef<HTMLElement>(null)

  const router = useRouter()
  const { direction, scrollTop } = useScrollDirection({ ref })
  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  const { data: wikis } = useQuery({
    queryKey: ['wikis'],
    queryFn: NamuiApi.getWikis,
  })

  const wikiCount = useMemo(
    () =>
      wikis?.data.wikiList.find((wiki) => wiki.wikiType === wikiType)
        ?.answerCount || 0,
    [wikiType, wikis],
  )

  useToggletheme(wikiType)

  const handleQsId = (id: string) => {
    setSelectedQsId(id)
  }

  return (
    <BaseLayout
      showHeader
      ref={ref}
      header={{
        options: {
          onBackClick: () => router.back(),
          onCenterClick: () => router.back(),
          showRight: true,
        },
      }}
      className={cn('h-calc-h overflow-y-scroll')}
    >
      <DashboardTitle wikiType={wikiType} wikiCount={wikiCount} />
      <DetailQsContext.Provider
        value={{ id: selectedQsId, handle: handleQsId }}
      >
        <FilterProvider>
          <DashboardContainer
            wikiType={wiki}
            shouldShowHeader={shouldShowHeader}
            wikiCount={wikiCount}
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

  //FIX: change to SSR && set auth in server runtime
  // NamuiApi.setToken(context.req.cookies['accessToken'])
  // try {
  //   const { data: wikis } = await NamuiApi.getWikis()
  //   const wikiCount =
  //     wikis.wikiList.find((wiki) => wiki.wikiType === wikiType)?.answerCount ||
  //     0

  //   return { props: { wikiType: wikiType.toUpperCase(), wikiCount } }
  // } catch {
  //   return { props: { wikiType: wikiType.toUpperCase(), wikiCount: 0 } }
  // }
  return { props: { wikiType: wikiType.toUpperCase() } }
}) satisfies GetServerSideProps

function DashboardTitle({
  wikiType,
  wikiCount,
}: PropswithWikiType<{ wikiCount: number }>) {
  const { data } = useSession()

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  useBrowserLayoutEffect(() => {
    const header = document.querySelector('header')
    if (!header) return
    if (isInView) {
      header.classList.add('!bg-transparent')
    } else {
      header.classList.remove('!bg-transparent')
    }
  }, [isInView])

  return (
    <div
      ref={ref}
      className={cn(
        'relative top-[calc(var(--header-height)_*_-1)] flex flex-col items-center  pb-20 pt-[var(--header-height)]',
        `bg-gradient-to-b from-brand-main  to-white`,
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${WIKI_COLORS[wikiType].GRADIENT_FROM}, #FFFFFF)`,
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
                  fill={WIKI_COLORS[wikiType].NAME_BOX}
                />
                <text
                  ref={ref}
                  x={width / 2}
                  y="40"
                  fill="white"
                  textAnchor="middle"
                  alignmentBaseline="middle"
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
                fill={WIKI_COLORS[wikiType].LETTER_COUNT_BOX}
              />
              <text
                ref={ref}
                x={width / 2}
                y={142.24 + 40}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="fill-black text-d3-kr-b"
              >
                {wikiCount}명 작성
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
            fill={WIKI_COLORS[wikiType].WIKINAME_BOX}
          />
          <text
            x={205}
            y={82.0801 + 40}
            textAnchor="middle"
            alignmentBaseline="middle"
            className="fill-black text-d3-kr-b"
          >
            {WIKI_NAME[wikiType]}
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
          href={WIKI_COLORS[wikiType].IMAGE_WIKI_DECO.src}
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
          href={WIKI_COLORS[wikiType].IMAGE_COUNT_DECO.src}
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
  )
}
