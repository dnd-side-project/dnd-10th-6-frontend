import { shareToCopyLink, shareToKaKaoLink } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import React, { PropsWithChildren, useCallback, useState } from 'react'
import Modal from '@/components/modal'
import Button from '@/components/button'

const ShareModal = ({ children }: PropsWithChildren) => {
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

  const handleShareKakao = () => {
    if (data?.user?.wikiId) {
      shareToKaKaoLink(`surveys?wikiId=${data?.user?.wikiId}`)
    }
  }
  return (
    <>
      <Modal
        open={shareModalOpen}
        onOpenChange={(state) => {
          setShareModalOpen(state)
        }}
        key="selectShareModal"
        trigger={children}
        title="친구에게 내 소개를 부탁하시겠어요?"
        description={
          <span>
            링크 공유하기를 통해
            <br />
            친구에게 내 소개를 부탁할 수 있어요!
          </span>
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
              onClick={handleShareKakao}
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
    </>
  )
}

export default ShareModal
