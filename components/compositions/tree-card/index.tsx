import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { useState, useRef, MouseEvent } from 'react'
import { fadeInProps } from '@/variants'
import pen from '@/assets/icons/pen.svg'
import eye from '@/assets/icons/eye.svg'
import menu from '@/assets/icons/menu.svg'
import Modal from '@/components/modal'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

interface TreeCardProps {
  period: string
  relation: string
  isFlipped: boolean
  onClick: () => void
  id: string
  senderName: string
  senderWikiId: string
}

const TreeCard = ({
  id,
  period,
  relation,
  isFlipped,
  senderName,
  senderWikiId,
  onClick,
}: TreeCardProps) => {
  const bgColor = (() => {
    switch (relation) {
      case 'ELEMENTARY_SCHOOL':
        return 'bg-relation-elementary_school'
      case 'MIDDLE_AND_HIGH_SCHOOL':
        return 'bg-relation-middle_and_high_school'
      case 'UNIVERSITY':
        return 'bg-relation-university'
      case 'WORK':
        return 'bg-relation-work'
      case 'SOCIAL':
        return 'bg-relation-social'
      case 'ETC':
        return 'bg-relation-etc'
      default:
    }
  })()

  const treeType = useRef(new TreeType(treeCardAsset)).current
  const handleCardClick = () => {
    onClick()
  }

  return (
    <motion.div
      id={id}
      variants={fadeInProps.variants}
      className={cn('relative aspect-[104/110] h-full cursor-pointer', {
        'preserve-3d': isFlipped,
      })}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={handleCardClick}
    >
      <div
        className={`card flex w-full justify-center ${isFlipped ? 'flipped' : ''}`}
      >
        <div
          className={cn(
            `card-front m-auto flex w-full flex-col items-center justify-center rounded-md ${bgColor}`,
          )}
        >
          <div className="z-0 mt-3 flex items-center justify-center overflow-hidden  ">
            {treeType.render(period as Period, relation as Relation)}
          </div>
        </div>

        <div
          className={`card-back px-y flex w-full flex-col items-center justify-center rounded-md ${bgColor}`}
        >
          <div className="m-auto flex w-full flex-col items-center justify-center space-y-2">
            <BottomSheetButton id={id} senderWikiId={senderWikiId} />
            <span className="my-2 text-body1-bold">{senderName}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TreeCard

interface BottomSheetButtonProps {
  id: string
  senderWikiId: string | null
}

const BottomSheetButton = ({ id, senderWikiId }: BottomSheetButtonProps) => {
  const [bottomSheet, setBottomSheet] = useState({
    isOpen: false,
  })
  const [modalOpen, setModalOpen] = useState(false)

  const toggleBottomSheet = (e: MouseEvent) => {
    setBottomSheet((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
    e.stopPropagation()
  }

  const handleLinkClick = (e: MouseEvent) => {
    if (senderWikiId === null) {
      e.preventDefault()
    } else {
      e.stopPropagation()
    }
  }

  const handleDetailClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const handleWritingClick = (_: MouseEvent) => {
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
