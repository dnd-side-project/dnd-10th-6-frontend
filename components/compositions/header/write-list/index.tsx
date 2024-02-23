import Drawer from '@/components/ui/drawer'
import React, { useEffect, useRef, useState } from 'react'
import WriteListCard from '@/components/compositions/header/write-list/wirte-list-card'
import useFilter, { Filter } from '@/hooks/use-filter'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-observer'
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const WriteList = () => {
  const { selectedFilter } = useFilter()
  const [openAlert, setOpenAlert] = useState(false)
  const [length, setLength] = useState(10)
  const { ref } = useIntersectionObserver<HTMLDivElement>({
    hasNextPage: true,
    fetchNextPage: () => setLength((prev) => prev + 10),
  })

  return (
    <Drawer
      header={{
        center: <p className="text-body1-bold">작성목록</p>,
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
        <p className="py-[14px] text-body1-bold text-text-main-black11">
          작성 목록
        </p>
      }
    >
      <Filter />
      <div className="p-5 flex flex-col">
        <p className="text-body3-medium text-text-sub-gray76 mb-4">
          <b className="text-brand-main-green400">999명</b>의 친구가 이유를
          적었어요
        </p>

        <motion.ul initial="hidden" animate="show" variants={container}>
          {Array.from({ length }, (v, i) => i + 1).map((item) => (
            <WriteListCard key={item} />
          ))}
        </motion.ul>
        <div ref={ref} className="h-2 w-2" />
      </div>
    </Drawer>
  )
}

export default WriteList
