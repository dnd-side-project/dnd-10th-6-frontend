import { MouseEventHandler, useState } from 'react'
import Link from 'next/link'
import { Drawer, DrawerContent } from '../ui/drawer'
import Image from 'next/image'
import pen from '@/assets/icons/pen.svg'
import eye from '@/assets/icons/eye.svg'
import menu from '@/assets/icons/menu.svg'
import Modal from '../modal'

interface BottomSheetButtonProps {
  id: string
  senderWikiId: string | null
}

const BottomSheetButton = ({ id, senderWikiId }: BottomSheetButtonProps) => {
  const [bottomSheet, setBottomSheet] = useState({
    isOpen: false,
  })
  const [modalOpen, setModalOpen] = useState(false)

  const toggleBottomSheet: MouseEventHandler<HTMLButtonElement> = (e) => {
    setBottomSheet((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
    e.stopPropagation()
  }

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (senderWikiId === null) {
      e.preventDefault()
    } else {
      e.stopPropagation()
    }
  }

  const handleDetailClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation()
  }

  const handleWritingClick: MouseEventHandler<HTMLButtonElement> = (_) => {
    if (senderWikiId === null) {
      setModalOpen(true)
    } else {
      setBottomSheet((prev) => ({
        ...prev,
        isOpen: false,
      }))
    }
  }

  return (
    <>
      <button
        className="absolute right-3 top-3 z-20"
        onClick={toggleBottomSheet}
      >
        <Image src={menu} alt="menu" />
      </button>
      <Drawer
        open={bottomSheet.isOpen}
        onOpenChange={(open) =>
          setBottomSheet((prev) => ({
            ...prev,
            isOpen: open,
          }))
        }
      >
        <DrawerContent>
          <div className="flex flex-col p-4 text-body3-medium">
            <div className="my-auto ml-2 flex flex-col items-start justify-start space-y-4">
              <Link
                href={`/surveys/questions?wikiId=${senderWikiId}`}
                onClick={handleLinkClick}
              >
                <button
                  className="flex items-center gap-2"
                  onClick={handleWritingClick}
                >
                  <Image src={pen} alt="pen" />
                  친구 소개 쓰러가기
                </button>
              </Link>
              <Link
                href={`/answers?surveyId=${id}`}
                onClick={handleDetailClick}
              >
                <button className="flex items-center gap-2">
                  <Image src={eye} alt="eye" />
                  소개서 자세히 보기
                </button>
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Modal
        open={modalOpen}
        onOpenChange={(state) => {
          setModalOpen(state)
        }}
        title=""
        description={
          <span className="text-body3-bold text-black">
            비회원으로 작성해서
            <br />
            친구에게 소개서를 써줄 수 없어요
          </span>
        }
        trigger={null}
      />
    </>
  )
}

export default BottomSheetButton
