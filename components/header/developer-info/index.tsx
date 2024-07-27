import React, { useState } from 'react'
import Ch from '@/components/svgs/mimoticons/ch'
import Yk from '@/components/svgs/mimoticons/yk'
import Yh from '@/components/svgs/mimoticons/yh'
import Es from '@/components/svgs/mimoticons/es'
import Aa from '@/components/svgs/mimoticons/aa'
import Logo from '@/components/svgs/logo'
import SideDrawer from '@/components/side-drawer'

export const DeveloperInfo = () => {
  const [openAlert, setOpenAlert] = useState(false)

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
        <p className="cursor-pointer py-[14px] text-t4-kr-b text-black">
          제작 정보
        </p>
      }
    >
      <div className="flex flex-col space-y-8 p-5">
        <h1 className="text-t1-kr-b text-black">GRRREW Team</h1>
        <div className="space-y-6 divide-y">
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="flex space-x-2">
              <Ch />
              <div className="flex flex-col justify-start">
                <p className="text-b2-kr-b text-black">김찬현</p>
                <p className="text-b4-kr-m text-font-gray-04">BE Developer</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Yk />
              <div className="flex flex-col justify-start">
                <p className="text-b2-kr-b text-black">송여경</p>
                <p className="text-b4-kr-m text-font-gray-04">FE Developer</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Yh />
              <div className="flex flex-col justify-start">
                <p className="text-b2-kr-b text-black">엽용현</p>
                <p className="text-b4-kr-m text-font-gray-04">FE Developer</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Es />
              <div className="flex flex-col justify-start">
                <p className="text-b2-kr-b text-black">이은성</p>
                <p className="text-b4-kr-m text-font-gray-04">BE Developer</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Aa />
              <div className="flex flex-col justify-start">
                <p className="text-b2-kr-b text-black">하아얀</p>
                <p className="text-b4-kr-m text-font-gray-04">
                  Product Designer
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="py-4">
              <Logo />
            </div>
            <p className="text-b3-kr-m text-text-sub-gray4f">
              Copyright {new Date().getFullYear()}. GRRREW. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </SideDrawer>
  )
}
