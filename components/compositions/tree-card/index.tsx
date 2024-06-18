import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
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
      className={cn('h-full aspect-[104/110] cursor-pointer relative', {
        'preserve-3d': isFlipped,
      })}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={handleCardClick}
    >
      <div
        className={`card flex justify-center w-full ${isFlipped ? 'flipped' : ''}`}
      >
        <div
          className={cn(
            `card-front m-auto w-full flex flex-col justify-center items-center rounded-md ${bgColor}`,
          )}
        >
          <div className="overflow-hidden flex justify-center items-center mt-3 z-0  ">
            {treeType.render(period as Period, relation as Relation)}
          </div>
        </div>

        <div
          className={`card-back px-y w-full flex flex-col justify-center items-center rounded-md ${bgColor}`}
        >
          <div className="w-full flex flex-col space-y-2 justify-center items-center m-auto">
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

  const toggleBottomSheet = (e: any) => {
    setBottomSheet((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
    e.stopPropagation()
  }

  const handleLinkClick = (e: any) => {
    if (senderWikiId === null) {
      e.preventDefault()
    } else {
      e.stopPropagation()
    }
  }

  const handleDetailClick = (e: any) => {
    e.stopPropagation()
  }

  const handleWritingClick = (e: any) => {
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
        className="absolute z-20 top-3 right-3"
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
          <div className="p-4 flex flex-col text-body3-medium">
            <div className="ml-2 flex flex-col my-auto space-y-4 justify-start items-start">
              <Link
                href={`/surveys/questions?wikiId=${senderWikiId}`}
                onClick={handleLinkClick}
              >
                <button
                  className="flex gap-2 items-center"
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
                <button className="flex gap-2 items-center">
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
