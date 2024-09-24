import { ReactNode, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useSession } from '@/provider/session-provider'

import { motion } from 'framer-motion'
import { Close } from '@radix-ui/react-dialog'

import { NamuiApi } from '@/lib/namui-api'
import { serverURL } from '@/lib/server/utils'
import BaseLayout from '@/layout/base-layout'
import { useToggletheme } from '@/contexts/wiki-provider'
import { PropswithWikiType } from '@/types'

import SurveyTree from '@/components/svgs/survey-tree'
import Modal from '@/components/modal'
import { Button } from '@/components/ui'
import SurveyFlower from '@/components/svgs/survey-flower'

const Page = ({
  wikiType,
  nickname,
  wikiId,
}: PropswithWikiType<{
  nickname: string
  wikiId: string
}>) => {
  const { signin, data } = useSession()
  const router = useRouter()
  const { isPending, mutate } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signin,
  })

  const [openMineAlert, setOpenMineAlert] = useState(false)

  const IsMine = wikiId === data?.user?.wikiId

  useToggletheme(wikiType)

  const handleStart = () => {
    if (IsMine) return setOpenMineAlert(true)
    router.replace(
      `/surveys/questions?wikiId=${router.query.wikiId}&wikiType=${wikiType}`,
    )
  }

  const SurveyComponent = wikiType === 'ROMANCE' ? SurveyFlower : SurveyTree

  return (
    <div className="flex h-calc-h flex-col px-5 py-4">
      <section className="flex grow flex-col items-center justify-center space-y-16 text-center">
        <div className="flex flex-col items-center">
          {/* 위키타입에 따라 SurveyTree 또는 SurveyFlower 표시 */}
          <SurveyComponent />
          <h1 className="mt-6 text-mainTitle2-bold">
            {nickname}님의
            <br />
            {/* 위키타입이 ROMANCE일 경우 텍스트 변경 */}
            {wikiType === 'ROMANCE'
              ? '연애위키가 도착했어요'
              : '남의위키가 도착했어요'}
          </h1>
          <p className="mt-3 text-subTitle2-medium text-text-sub-gray4f">
            {wikiType === 'ROMANCE' ? '연애위키를 통해' : '남의위키를 통해'}
            <br />
            내가 본 친구의 모습을 알려주세요
          </p>
        </div>
      </section>
      <footer className="relative flex flex-col items-center space-y-3">
        {!data?.user && (
          <motion.div
            initial={{ scale: 0, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            className="absolute -top-[85%] text-center"
          >
            <div className="relative h-full w-full flex-1 rounded-lg bg-white  px-3 py-4 shadow-chat-bubble">
              <p className="text-body3-medium text-black">
                <b>비회원</b>으로 시작하면 <br />
                내가 작성한{' '}
                <b>{wikiType === 'ROMANCE' ? '연애위키' : '남의위키'}</b>를 볼
                수 없어요!
              </p>
            </div>
            <svg
              className="relative left-1/2 -translate-x-1/2 -translate-y-[15%] drop-shadow-chat-bubble"
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0709 13.7252C10.9051 15.6637 8.09493 15.6637 6.92912 13.7252L1.40877 4.54615C0.206241 2.54663 1.64638 1.27978e-07 3.97965 3.31959e-07L15.0204 1.29717e-06C17.3536 1.50115e-06 18.7938 2.54663 17.5912 4.54615L12.0709 13.7252Z"
                fill="white"
              />
            </svg>
          </motion.div>
        )}
        {data?.user?.wikiId ? (
          <Button onClick={handleStart}>시작하기</Button>
        ) : (
          <Button
            disabled={isPending}
            variant="Line-neutral"
            className="!bg-[#FEE500]"
            onClick={() =>
              mutate({
                provider: 'kakao',
                callbackUrl: `/surveys/questions?wikiId=${router.query.wikiId}&wikiType=${wikiType}
                `,
              })
            }
          >
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M11 0C4.92484 0 0 3.82543 0 8.54421C0 11.595 2.05893 14.2719 5.15604 15.7836C4.98754 16.356 4.0733 19.4663 4.03686 19.7107C4.03686 19.7107 4.015 19.8942 4.13566 19.9642C4.25638 20.0343 4.39828 19.9799 4.39828 19.9799C4.74437 19.9323 8.41149 17.3946 9.04626 16.954C9.68034 17.0424 10.3333 17.0884 11 17.0884C17.0752 17.0884 22 13.2631 22 8.54421C22 3.82543 17.0752 0 11 0Z"
                fill="#111111"
              />
            </svg>
            카카오 로그인
          </Button>
        )}
        {!data?.user && (
          <button
            onClick={() => {
              NamuiApi.clear()
              router.replace(
                `/surveys/questions?wikiId=${router.query.wikiId}&wikiType=${wikiType}`,
              )
            }}
            className="text-sm text-text-sub-gray76 underline underline-offset-2"
          >
            비회원으로 시작하기
          </button>
        )}
      </footer>
      <Modal
        onOpenChange={setOpenMineAlert}
        title="이런!"
        description="나의 위키는 답변할 수 없어요!"
        trigger={<></>}
        className="border-none"
        footer={{
          divider: false,
          item: [
            [
              <Close className="flex-[1_0_50%]" key="survey-footer">
                <Button
                  variant="BG-neutral"
                  key="copy-link"
                  className="h-full rounded-none"
                >
                  닫기
                  <span className="sr-only">Close</span>
                </Button>
              </Close>,
              <Button
                key="survey-footer-link"
                className=" h-full w-full flex-[1_0_50%] rounded-none border-[1px] border-none border-transparent px-4 py-[14px] text-center text-white shadow-sm duration-150  "
                onClick={() => router.push('/main')}
                variant="BG-brand"
              >
                메인 홈 가기
              </Button>,
            ],
          ],
        }}
        open={openMineAlert}
      />
    </div>
  )
}

Page.getLayout = (page: ReactNode) => (
  <BaseLayout showHeader={false}>{page}</BaseLayout>
)
export default Page

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { wikiId, wikiType } = ctx.query
  if (!wikiId || typeof wikiType !== 'string' || typeof wikiId === 'object')
    return { notFound: true }
  if (!wikiType || !['NAMUI', 'ROMANCE'].includes(wikiType.toUpperCase())) {
    return { notFound: true }
  }
  serverURL.pathname = '/api/v1/users'
  serverURL.searchParams.append('wikiId', wikiId)

  const response = await fetch(serverURL, {
    cache: 'no-store',
  }).then(
    (res) =>
      res.json() as Promise<{
        data?: { nickname: string }
        errorCode?: string
        reason?: string
      }>,
  )
  serverURL.searchParams.delete('wikiId')
  if (!response.data?.nickname) return { notFound: true }
  return {
    props: {
      nickname: response.data.nickname,
      wikiId,
      wikiType,
    },
  }
}
