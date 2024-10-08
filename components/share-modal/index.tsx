import { shareToCopyLink, shareToKaKaoLink } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import React, { PropsWithChildren, useCallback, useState } from 'react'
import Modal from '@/components/modal'
import { Button } from '@/components/ui'

import { useRouter } from 'next/router'
import { PropswithWikiType } from '@/types'

interface ShareModalProps {
  open?: boolean
  onOpenChange?: (state: boolean) => void
}

const ShareModal = ({
  wikiType,
  children,
  open,
  onOpenChange,
}: PropswithWikiType<PropsWithChildren<ShareModalProps>>) => {
  const { data } = useSession()
  const [shareModalOpen, setShareModalOpen] = useState(open)
  const [copyModalOpen, setCopyModalOpen] = useState(false)
  const router = useRouter()

  const onStateChange = (state: boolean) => {
    setShareModalOpen(state)
    onOpenChange?.(state)
  }

  const handleCopyLink = useCallback(async () => {
    if (data?.user?.wikiId) {
      const url = new URL(window.location.origin)
      url.pathname = '/surveys'
      url.searchParams.set('wikiId', data?.user?.wikiId)
      url.searchParams.set('wikiType', wikiType)
      await shareToCopyLink(url.toString())
    }
    setShareModalOpen(false)
    setCopyModalOpen(true)
  }, [data?.user?.wikiId, wikiType])

  const handleShareKakao = () => {
    if (data?.user?.wikiId) {
      shareToKaKaoLink(
        `surveys?wikiId=${data?.user?.wikiId}&wikiType=${wikiType}`,
        wikiType,
      )
    }
  }

  const isLoggedIn = !!data?.user?.wikiId
  return (
    <>
      <Modal
        open={open ?? shareModalOpen}
        onOpenChange={onStateChange}
        key="selectShareModal"
        trigger={children}
        title={
          isLoggedIn ? '친구에게 내 소개서를 보내시나요?' : '비회원이시군요!'
        }
        description={
          isLoggedIn ? (
            <span>
              링크 공유하기를 통해
              <br />
              남이 보는 내 모습을 알 수 있어요!
            </span>
          ) : (
            <span>내 소개를 부탁하려면 로그인을 해야 해요</span>
          )
        }
        footer={{
          divider: false,
          item: isLoggedIn
            ? [
                // TODO: variant 적용 :default
                <Button
                  onClick={handleCopyLink}
                  variant="Line-neutral"
                  key="copy-link"
                  className="rounded-none border border-transparent bg-bg-regular text-but2-sb"
                >
                  링크 공유
                </Button>,
                <Button
                  key="kakao-share"
                  className="rounded-none text-but2-sb"
                  onClick={handleShareKakao}
                >
                  카카오 공유
                </Button>,
              ]
            : [
                // TODO: variant 적용 :default
                <Button
                  onClick={() => onStateChange(false)}
                  variant="Line-neutral"
                  key="copy-link"
                  className="rounded-none"
                >
                  다음에
                </Button>,

                <Button
                  onClick={() => router.push('/')}
                  key="kakao-share"
                  className="rounded-none"
                >
                  로그인
                </Button>,
              ],
        }}
      />
      <Modal
        open={copyModalOpen}
        onOpenChange={setCopyModalOpen}
        key="copyLinkModal"
        title="링크가 복사되었어요"
        className="text-center text-b2-kr-b text-black"
        footer={{
          item: [
            <Button
              onClick={() => setCopyModalOpen(false)}
              variant="BG-brand"
              className="rounded-none border-t-[1px]"
              key="copy-close"
            >
              확인
            </Button>,
          ],
        }}
        trigger={<></>}
      />
    </>
  )
}

export default ShareModal
