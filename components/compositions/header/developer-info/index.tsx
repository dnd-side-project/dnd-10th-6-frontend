import React, { useEffect, useRef, useState } from 'react'
import WriteListCard from '@/components/compositions/header/write-list/wirte-list-card'
import useFilter, { Filter } from '@/hooks/use-filter'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-observer'
import Ch from '@/components/svgs/mimoticons/ch'
import Yk from '@/components/svgs/mimoticons/yk'
import Yh from '@/components/svgs/mimoticons/yh'
import Es from '@/components/svgs/mimoticons/es'
import Aa from '@/components/svgs/mimoticons/aa'
import Logo from '@/components/svgs/logo'
import SideDrawer from '@/components/side-drawer'
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const DeveloperInfo = () => {
  const { selectedFilter } = useFilter()
  const [openAlert, setOpenAlert] = useState(false)
  const [length, setLength] = useState(10)
  const { ref } = useIntersectionObserver<HTMLDivElement>({
    hasNextPage: true,
    fetchNextPage: () => setLength((prev) => prev + 10),
  })

  return (
    <SideDrawer
      header={{
        center: <p className="text-body1-bold">제작 정보</p>,
        options: {
          onBackClick() {
            setOpenAlert(false)
          },
          showRight: false,
        },
      }}
      open={openAlert}
      onChangeOpen={setOpenAlert}
      trigger={
        <p className="py-[14px] text-body1-bold text-text-main-black11 cursor-pointer">
          제작 정보
        </p>
      }
    >
      <div className="p-5 flex flex-col space-y-8">
        <h1 className="text-mainTitle2-bold text-text-main-black11">
          GRRREW Team
        </h1>
        <div className="divide-y space-y-6">
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="flex space-x-2">
              <Ch />
              <div className="flex flex-col justify-start">
                <p className="text-body3-bold text-text-main-black11">김찬현</p>
                <p className="text-body3-medium text-text-sub-gray76">
                  BE Developer
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Yk />
              <div className="flex flex-col justify-start">
                <p className="text-body3-bold text-text-main-black11">송여경</p>
                <p className="text-body3-medium text-text-sub-gray76">
                  FE Developer
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Yh />
              <div className="flex flex-col justify-start">
                <p className="text-body3-bold text-text-main-black11">엽용현</p>
                <p className="text-body3-medium text-text-sub-gray76">
                  FE Developer
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Es />
              <div className="flex flex-col justify-start">
                <p className="text-body3-bold text-text-main-black11">이은성</p>
                <p className="text-body3-medium text-text-sub-gray76">
                  BE Developer
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Aa />
              <div className="flex flex-col justify-start">
                <p className="text-body3-bold text-text-main-black11">하아얀</p>
                <p className="text-body3-medium text-text-sub-gray76">
                  Product Designer
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-body-medium gap-1">
            <div className="py-4">
              <Logo />
            </div>

            {/* <b> Front-end github :</b>
            <p className="text-body3-medium text-text-sub-gray4f">
              https://github.com/dnd-side-project/dnd-10th-6-frontend
            </p>
            <b> Back-end github :</b>
            <p className="text-body3-medium text-text-sub-gray4f">
              https://github.com/dnd-side-project/dnd-10th-6-backend
            </p> */}
            <p className="text-body3-medium text-text-sub-gray4f">
              Copyright 2024. GRRREW. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </SideDrawer>
  )
}

export default DeveloperInfo
