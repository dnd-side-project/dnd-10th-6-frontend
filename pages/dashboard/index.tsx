import { AnimatePresence, motion } from 'framer-motion'

import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
} from 'react'

import { fadeInProps } from '@/variants'
import { cn, useBrowserLayoutEffect } from '@/lib/client/utils'
import useScrollDirection from '@/hooks/use-scroll-direction'
import { useSettingStore } from '@/stores/setting.store'
import { GetServerSideProps } from 'next'
import BestWorth from '@/components/compositions/dashboard/best-worth'
import Character from '@/components/compositions/dashboard/character'
import Money from '@/components/compositions/dashboard/money'
import Happy from '@/components/compositions/dashboard/happy'
import Sad from '@/components/compositions/dashboard/sad'
import KnowingFilterGroup from '@/components/knowing-filter-group'
import TreeInfo from '@/components/compositions/dashboard/tree-info'
import withAuth from '@/layout/HOC/with-auth'
import BaseLayout from '@/layout/base-layout'
import FormLayout from '@/layout/form-layout'
import Button from '@/components/button'
import WelcomeTrees from '@/components/icons/welcome-trees'
import { useRouter } from 'next/router'
import Modal from '@/components/modal'

const Page = () => {
  const headerHeight = useSettingStore((state) => state.headerHeight)
  const router = useRouter()
  // TODO: 내 정원화면 제작 후 정원페이지로 변경필요
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { direction, scrollTop } = useScrollDirection({ ref })
  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  useBrowserLayoutEffect(() => {
    setShouldShowWelcome(window.location.hash === '#welcome')
  }, [])

  return (
    <>
      <BaseLayout
        showHeader
        ref={ref}
        className={cn(
          'h-calc-h overflow-y-scroll',
          shouldShowWelcome && 'overflow-hidden',
        )}
      >
        <motion.div {...fadeInProps} className="flex flex-col pb-[50px] grow">
          <KnowingFilterGroup
            className={cn(shouldShowHeader && 'top-header')}
          />
          <div className="flex flex-col divide-y-[12px] divide-line-soft">
            {/* 내 정원에 심어진 나무는? */}
            <Section>
              <TreeInfo />
            </Section>
            {/* 가장 중요한 것 - 파이차트 */}
            <Section>
              <BestWorth />
            </Section>
            {/* 이런사람이에요 - 박스 */}
            <Section>
              <Character />
            </Section>
            <Section>
              <Money />
            </Section>
            {/* 기쁠 떄 */}
            <Section>
              <Happy />
            </Section>
            <Section>
              <Sad />
            </Section>
          </div>
        </motion.div>
      </BaseLayout>
      <AnimatePresence>
        {shouldShowWelcome && (
          <FormLayout
            header={{
              leftIcon: false,
              center: <></>,
              rightIcon: (
                <button
                  onClick={() => {
                    router.replace({
                      hash: null,
                    })
                    setShouldShowWelcome(false)
                  }}
                >
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
                      d="M22.786 6.45173C23.1277 6.11002 23.1277 5.556 22.786 5.21429C22.4443 4.87258 21.8903 4.87258 21.5486 5.21429L14.0007 12.7622L6.45271 5.21429C6.111 4.87258 5.55698 4.87258 5.21527 5.21429C4.87356 5.556 4.87356 6.11002 5.21527 6.45173L12.7632 13.9997L5.21527 21.5476C4.87356 21.8893 4.87356 22.4434 5.21527 22.7851C5.55697 23.1268 6.11099 23.1268 6.4527 22.7851L14.0007 15.2371L21.5486 22.7851C21.8903 23.1268 22.4443 23.1268 22.786 22.7851C23.1277 22.4434 23.1277 21.8893 22.786 21.5476L15.2381 13.9997L22.786 6.45173Z"
                      fill="#111111"
                    />
                  </svg>
                </button>
              ),
            }}
            className="fixed top-0 left-0 z-10 w-full bg-white"
            content={
              <div className="grow -mt-5 flex flex-col items-center justify-center px-5 text-center">
                <WelcomeTrees />
                <p className="text-mainTitle2-bold mt-8 mb-3">
                  환영해요 하아얀님
                </p>
                <p className="text-subTitle2 text-text-sub-gray4f">
                  친구에게 내 소개를 부탁해보세요
                  <br />
                  친구가 소개서를 작성해주면
                  <br />내 정원에 나무가 심겨요
                </p>
              </div>
            }
            button={
              <Modal
                trigger={<Button>친구에게 내 소개 부탁하기</Button>}
                title="친구에게 내 소개를 부탁하시겠어요?"
                description={`링크 공유하기를 통해\n친구에게 내 소개를 부탁할 수 있어요!`}
                footer={{
                  divider: false,
                  item: [
                    <Button
                      variant="default"
                      key="copy-link"
                      className="rounded-none"
                    >
                      링크복사
                    </Button>,
                    <Button key="kakao-share" className="rounded-none">
                      카카오 공유
                    </Button>,
                  ],
                }}
              />
            }
          />
        )}
      </AnimatePresence>
    </>
  )
}
const DashboardWithAuth = withAuth(Page)
DashboardWithAuth.getLayout = (page: ReactNode) => page
export default DashboardWithAuth

function Section({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      {...props}
      className={cn(
        'pt-10 pb-12 px-6 flex flex-col overflow-x-hidden bg-text-main-whiteFF',
        props.className,
      )}
    >
      {children}
    </section>
  )
}

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  if (!isViewOnboard) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: true,
      },
    }
  }
  return { props: {} }
}) satisfies GetServerSideProps
