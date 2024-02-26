import { ReactNode, useState } from 'react'
import Button from '@/components/button'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { serverURL } from '@/lib/server/utils'
import BaseLayout from '@/layout/base-layout'
import { NamuiApi } from '@/lib/namui-api'
import SurveyTree from '@/components/svgs/survey-tree'
import Modal from '@/components/modal'
import { Close } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'

const Page = ({ nickname, wikiId }: { nickname: string; wikiId: string }) => {
  const { signin, data } = useSession()
  const router = useRouter()
  const { isPending, mutate } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signin,
  })

  const [openMineAlert, setOpenMineAlert] = useState(false)

  const IsMine = wikiId === data?.user?.wikiId

  const handleStart = () => {
    if (IsMine) return setOpenMineAlert(true)
    router.replace(`/surveys/questions?wikiId=${router.query.wikiId}`)
  }

  return (
    <div className="h-calc-h flex flex-col px-5 py-4">
      <section className="grow flex flex-col text-center justify-center items-center space-y-16">
        <div className="flex flex-col items-center">
          <SurveyTree />
          <h1 className="text-mainTitle2-bold mt-6">
            {nickname}님의<br />
            남의위키가 도착했어요
          </h1>
          <p className="text-subTitle2-medium text-text-sub-gray4f mt-3">
            남의위키를 통해
            <br />
            내가 본 친구의 모습을 알려주세요
          </p>
        </div>
      </section>
      <footer className="flex flex-col space-y-3 items-center relative">
        <motion.div
          initial={{ scale: 0, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          className="absolute text-center -top-[85%]"
        >
          <div className="w-full h-full bg-white shadow-chat-bubble py-4 px-3  rounded-lg flex-1 relative">
            <p className="text-body3-medium text-black">
              <b>비회원</b>으로 시작하면 <br />
              내가 작성한 <b>남의위키를 볼 수 없어요!</b>
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
        {data?.user?.wikiId ? (
          <Button onClick={handleStart}>시작하기</Button>
        ) : (
          <Button
            disabled={isPending}
            variant="kakao"
            onClick={() =>
              mutate({
                provider: 'kakao',
                callbackUrl: `/surveys/questions?wikiId=${router.query.wikiId}`,
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
        <button
          onClick={() => {
            NamuiApi.clear()
            router.replace(`/surveys/questions?wikiId=${router.query.wikiId}`)
          }}
          className="text-text-sub-gray76 text-sm underline underline-offset-2"
        >
          비회원으로 시작하기
        </button>
      </footer>
      <Modal
        onOpenChange={setOpenMineAlert}
        title="이런!"
        description="나의 위키는 답변할 수 없어요!"
        trigger={<></>}
        footer={{
          divider: false,
          item: [
            [
              <Close className="flex-[1_0_50%]">
                <Button
                  variant="default"
                  key="copy-link"
                  className="rounded-none h-full"
                >
                  닫기
                  <span className="sr-only">Close</span>
                </Button>
              </Close>,
              <Link
                className="py-[14px] px-4 h-full rounded-none border-none duration-150 text-center text-white bg-green-500 hover:bg-green-600 active:bg-green-800 focus-visible:ring-offset-2  border-[1px] border-transparent shadow-sm w-full flex-[1_0_50%]"
                href="/garden"
              >
                내 정원가기
              </Link>,
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
  const { wikiId } = ctx.query
  if (!wikiId || typeof wikiId === 'object') return { notFound: true }
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
    },
  }
}
