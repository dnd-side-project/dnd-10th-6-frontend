import KnowingFilterGroup from '@/components/knowing-filter-group'
import Drawer from '@/components/ui/drawer'
import React, { useState } from 'react'
import WriteListCard from '@/components/compositions/header/write-list/wirte-list-card'

const WriteList = () => {
  const [openAlert, setOpenAlert] = useState(false)
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
      <KnowingFilterGroup />
      <div className="p-5 flex flex-col">
        <p className="text-body3-medium text-text-sub-gray76 mb-4">
          <b className="text-brand-main-green400">999명</b>의 친구가 이유를
          적었어요
        </p>
        <WriteListCard />
        <WriteListCard />
        <WriteListCard />
        <WriteListCard />
        <WriteListCard />
        <WriteListCard />
        <WriteListCard />
      </div>
    </Drawer>
  )
}

export default WriteList
