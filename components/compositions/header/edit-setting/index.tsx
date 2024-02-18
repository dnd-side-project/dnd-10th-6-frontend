import Drawer from '@/components/ui/drawer'
import React, { useState } from 'react'

const EditProfile = () => {
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <Drawer
      header={{
        center: <p className="text-body1-bold">프로필 수정</p>,
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
        <button className="py-[14px] text-body1-bold text-text-main-black11">
          프로필 편집
        </button>
      }
    >
      TODO: #26 머지 후 작업
    </Drawer>
  )
}

export default EditProfile
