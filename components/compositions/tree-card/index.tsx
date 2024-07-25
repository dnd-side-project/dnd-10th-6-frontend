import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { useState, useRef, MouseEvent } from 'react'
import { fadeInProps } from '@/variants'
import pen from '@/assets/icons/pen.svg'
import eye from '@/assets/icons/eye.svg'
import Modal from '@/components/modal'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'

interface TreeCardProps {
  period: string
  relation: string

  id: string
  senderName: string
  senderWikiId: string
}

const TreeCard = ({
  id,
  period,
  relation,
  senderName,
  senderWikiId,
}: TreeCardProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

  const bgColor = (() => {
    switch (relation) {
      case 'ELEMENTARY_SCHOOL':
        return 'bg-yellow-50'
      case 'MIDDLE_AND_HIGH_SCHOOL':
        return 'bg-orange-50'
      case 'UNIVERSITY':
        return 'bg-[#EEFFEF]'
      case 'WORK':
        return 'bg-blue-50'
      case 'SOCIAL':
        return 'bg-green-50'
      case 'ETC':
        return 'bg-black-50'
      default:
        return ''
    }
  })()

  const treeType = useRef(new TreeType(treeCardAsset)).current

  const handleCardClick = () => {
    setBottomSheetOpen(true)
  }

  const closeBottomSheet = () => {
    setBottomSheetOpen(false)
  }

  return (
    <motion.div
      id={id}
      variants={fadeInProps.variants}
      className={cn('relative aspect-[104/110] h-full cursor-pointer', {})}
      onClick={handleCardClick}
    >
      <div className={`card flex w-full justify-center `}>
        <div
          className={cn(
            `card-front m-auto flex w-full flex-col items-center justify-center rounded-md ${bgColor}`,
          )}
        >
          <div className="z-0 mt-3 flex items-center justify-center overflow-hidden  ">
            {treeType.render(period as Period, relation as Relation)}
          </div>
        </div>

        <div className="m-auto flex w-full flex-col items-center justify-center space-y-2">
          <BottomSheetButton
            id={id}
            senderWikiId={senderWikiId}
            bottomSheetOpen={bottomSheetOpen}
            closeBottomSheet={closeBottomSheet}
            senderName={senderName}
            period={period}
            relation={relation}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default TreeCard

interface BottomSheetButtonProps {
  id: string
  senderWikiId: string | null
  senderName: string
  bottomSheetOpen: boolean
  closeBottomSheet: () => void
  period: string
  relation: string
}

const BottomSheetButton = ({
  id,
  senderWikiId,
  senderName,
  bottomSheetOpen,
  period,
  relation,
  closeBottomSheet,
}: BottomSheetButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false)

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
      closeBottomSheet()
    }
  }

  return (
    <>
      <Drawer
        open={bottomSheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeBottomSheet()
          }
        }}
      >
        <DrawerContent>
          <DrawerHeader
            senderName={senderName}
            period={period}
            relation={relation}
          />
          <div className="flex flex-col p-4">
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
                  쓰러가기
                </button>
              </Link>
              <Link
                href={`/answers?surveyId=${id}`}
                onClick={handleDetailClick}
              >
                <button className="flex items-center gap-2">
                  <Image src={eye} alt="eye" />
                  상세 보기
                </button>
              </Link>
            </div>
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
      <Modal
        open={modalOpen}
        onOpenChange={(state) => {
          setModalOpen(state)
        }}
        title=""
        description={
          <span className=" text-b2-kr-b text-black">
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
