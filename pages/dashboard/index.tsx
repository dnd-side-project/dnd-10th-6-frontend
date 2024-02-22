import { motion } from 'framer-motion'

import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'

import { fadeInProps } from '@/variants'
import { cn, shareToCopyLink, shareToKaKaoLink } from '@/lib/client/utils'
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
import Button from '@/components/button'

import Modal from '@/components/modal'
import { useSession } from '@/provider/session-provider'
import { useQuery } from '@tanstack/react-query'
import { getDashboardQuery } from '@/queries/dashboard'
import TripleTrees from '@/components/svgs/triple-trees'

const Page = () => {
  const { data: statisics, isLoading } = useQuery(getDashboardQuery())
  const headerHeight = useSettingStore((state) => state.headerHeight)
  const { data } = useSession()

  // TODO: 내 정원화면 제작 후 정원페이지로 변경필요
  const ref = useRef<HTMLElement>(null)
  const { direction, scrollTop } = useScrollDirection({ ref })
  const shouldShowHeader = scrollTop > headerHeight && direction === 'UP'

  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [copyModalOpen, setCopyModalOpen] = useState(false)
  const handleCopyLink = useCallback(async () => {
    if (data?.user?.wikiId) {
      const url = new URL(window.location.origin)
      url.pathname = '/surveys'
      url.searchParams.set('wikiId', data?.user?.wikiId)
      await shareToCopyLink(url.toString())
    }
    setShareModalOpen(false)
    setCopyModalOpen(true)
  }, [data?.user?.wikiId])
  return (
    <>
      <BaseLayout
        showHeader
        ref={ref}
        className={cn('h-calc-h overflow-y-scroll')}
      >
        {isLoading ? (
          <div className="flex flex-col grow">
            <h1>Loading...</h1>
          </div>
        ) : statisics?.length ? (
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
        ) : (
          <div className="h-full flex justify-center items-center relative mx-5">
            <div className="absolute top-8 left-[10px]">
              <p className="text-body1-medium text-text-sub-gray4f">
                내 정원에 심어진 나무는
              </p>
              <h3 className="text-mainTitle1-bold">총 0그루</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <TripleTrees />
              <h3 className="text-subTitle1-bold mt-8 mb-4">
                나무를 심어준 친구가 없어요
              </h3>
              <p className="text-body1-medium text-text-sub-gray4f mb-8">
                나에 대해 궁금하다면 링크 공유하기를 눌러
                <br />
                친구에게 알려달라고 부탁해보세요
              </p>
              <Modal
                open={shareModalOpen}
                onOpenChange={(state) => {
                  setShareModalOpen(state)
                }}
                key="selectShareModal"
                trigger={<Button className="!w-fit px-4">링크 공유하기</Button>}
                title="친구에게 내 소개를 부탁하시겠어요?"
                description={
                  <p>
                    링크 공유하기를 통해
                    <br />
                    친구에게 내 소개를 부탁할 수 있어요!
                  </p>
                }
                footer={{
                  divider: false,
                  item: [
                    <Button
                      onClick={handleCopyLink}
                      variant="default"
                      key="copy-link"
                      className="rounded-none"
                    >
                      링크복사
                    </Button>,
                    <Button
                      key="kakao-share"
                      className="rounded-none"
                      onClick={shareToKaKaoLink}
                    >
                      카카오 공유
                    </Button>,
                  ],
                }}
              />
              <Modal
                open={copyModalOpen}
                onOpenChange={setCopyModalOpen}
                key="copyLinkModal"
                title="링크가 복사되었어요"
                footer={{
                  item: [
                    <Button
                      onClick={() => setCopyModalOpen(false)}
                      variant="confirm"
                      className="border-t-[1px]"
                      key="copy-close"
                    >
                      확인
                    </Button>,
                  ],
                }}
                trigger={<></>}
              />
            </div>
          </div>
        )}
      </BaseLayout>
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
