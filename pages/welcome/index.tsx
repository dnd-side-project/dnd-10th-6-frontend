import Button from '@/components/button'
import WelcomeTrees from '@/components/icons/welcome-trees'
import Modal from '@/components/modal'
import FormLayout from '@/layout/form-layout'
import { shareToCopyLink, shareToKaKaoLink } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

const WelcomePage = () => {
  const router = useRouter()
  const { data } = useSession()

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
    <FormLayout
      header={{
        leftIcon: <></>,
        center: <></>,
        rightIcon: (
          <button
            onClick={() => {
              router.replace('/garden')
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
            환영해요 {data?.user?.name}님
          </p>
          <p className="text-subTitle2 text-text-sub-gray4f">
            친구에게 내 소개를 부탁해보세요
            <br />
            친구가 소개서를 작성해주면
            <br />내 정원에 나무가 심겨요
          </p>
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
      }
      button={
        <Modal
          open={shareModalOpen}
          onOpenChange={(state) => {
            setShareModalOpen(state)
          }}
          trigger={<Button>친구에게 내 소개 부탁하기</Button>}
          title="친구에게 내 소개를 부탁하시겠어요?"
          description={`링크 공유하기를 통해\n친구에게 내 소개를 부탁할 수 있어요!`}
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
                onClick={shareToKaKaoLink}
                key="kakao-share"
                className="rounded-none"
              >
                카카오 공유
              </Button>,
            ],
          }}
        />
      }
    />
  )
}

export default WelcomePage
