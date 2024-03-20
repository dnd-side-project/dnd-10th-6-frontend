import { useState } from 'react'
import Link from 'next/link'
import { Drawer, DrawerContent } from '../ui/drawer'
import Image from 'next/image'
import pen from '@/assets/pen.svg'
import eye from '@/assets/eye.svg'
import menu from '@/assets/menu.svg'

interface BottomSheetButtonProps {
  id: string
  senderWikiId: string
}

const BottomSheetButton = ({ id, senderWikiId }: BottomSheetButtonProps) => {
  const [bottomSheet, setBottomSheet] = useState({
    isOpen: false,
  })

  const toggleBottomSheet = (e) => {
    setBottomSheet((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }))
    e.stopPropagation()
  }

  const handleLinkClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <>
      <button
        className="absolute z-20 top-3 right-3
       "
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
          <div className=" p-4 flex flex-col text-body3-medium">
            <div className="ml-2 flex flex-col my-auto space-y-4 justify-start items-start">
              <Link
                href={`/surveys/questions?wikiId=${senderWikiId}`}
                onClick={handleLinkClick}
              >
                <button
                  className="flex gap-2 items-center
            
              "
                >
                  <Image src={pen} alt="pen" />
                  친구 소개 쓰러가기
                </button>
              </Link>
              <Link href={`/answers?surveyId=${id}`} onClick={handleLinkClick}>
                <button className="flex gap-2 items-center ">
                  <Image src={eye} alt="eye" />
                  소개서 자세히 보기
                </button>
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default BottomSheetButton
