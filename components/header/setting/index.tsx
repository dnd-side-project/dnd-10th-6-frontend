import React, { useState } from 'react'
import { Close } from '@radix-ui/react-dialog'
import { useSession } from '@/provider/session-provider'
import { NamuiApi } from '@/lib/namui-api'
import { toastError } from '@/lib/client/alert'

import Modal from '@/components/modal'
import SideDrawer from '@/components/side-drawer'
import { DeveloperInfo } from '@/components/header/developer-info'
import { EditProfile } from '@/components/header/edit-setting'
// import WriteList from '../write-list'
// import { FilterProvider } from '@/hooks/use-filter'

export const Setting = () => {
  const [openSetting, setOpenSetting] = useState(false)
  const [openWithdraw, setOpenWithdraw] = useState(false)
  const { signout } = useSession()
  const handleWithdrawClick = async () => {
    try {
      await NamuiApi.withdraw()
      window.location.reload()
    } catch (_) {
      toastError()
      setOpenWithdraw(false)
    }
  }
  return (
    <SideDrawer
      header={{
        center: <p className="text-body1-bold">설정</p>,
        options: {
          onBackClick() {
            setOpenSetting(false)
          },
          showRight: false,
        },
      }}
      open={openSetting}
      onChangeOpen={setOpenSetting}
      trigger={
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.8274 4.08301L12.4093 6.31315C12.2312 7.26267 11.6143 7.98325 10.8912 8.38471C10.8137 8.42772 10.7372 8.47229 10.6617 8.5184C9.94929 8.95348 9.00829 9.13331 8.08875 8.80984L6.18523 8.14024L5.0126 10.1713L6.55066 11.4905C7.28734 12.1223 7.60323 13.0228 7.58495 13.8554C7.5839 13.9033 7.58337 13.9514 7.58337 13.9997C7.58337 14.0988 7.5856 14.1972 7.59001 14.295C7.62851 15.1489 7.31639 16.0811 6.55885 16.7308L5.0126 18.0571L6.18523 20.0881L8.33045 19.3335C9.21743 19.0215 10.1256 19.1783 10.8259 19.5779C10.8476 19.5903 10.8693 19.6025 10.8912 19.6146C11.6143 20.0161 12.2312 20.7367 12.4093 21.6862L12.8274 23.9163H15.1727L15.5908 21.6862C15.7689 20.7367 16.3858 20.0161 17.1089 19.6146C17.1307 19.6025 17.1525 19.5903 17.1742 19.5779C17.8745 19.1783 18.7826 19.0215 19.6696 19.3335L21.8148 20.0881L22.9875 18.0571L21.4412 16.7308C20.6837 16.0811 20.3716 15.1489 20.4101 14.295C20.4145 14.1972 20.4167 14.0988 20.4167 13.9997C20.4167 13.9514 20.4162 13.9033 20.4151 13.8554C20.3968 13.0228 20.7127 12.1223 21.4494 11.4905L22.9875 10.1713L21.8148 8.14024L19.9113 8.80984C18.9918 9.13331 18.0508 8.95348 17.3383 8.5184C17.2629 8.47229 17.1864 8.42772 17.1089 8.38471C16.3858 7.98325 15.7689 7.26266 15.5908 6.31315L15.1727 4.08301H12.8274ZM18.0834 13.9997C18.0834 16.2548 16.2552 18.083 14 18.083C11.7449 18.083 9.9167 16.2548 9.9167 13.9997C9.9167 11.7445 11.7449 9.91634 14 9.91634C16.2552 9.91634 18.0834 11.7445 18.0834 13.9997ZM15.6568 2.33301C16.2182 2.33301 16.7 2.73287 16.8035 3.28467L17.3108 5.99065C17.3804 6.3618 17.6282 6.6714 17.9583 6.85469C18.057 6.90945 18.1544 6.9662 18.2504 7.02488C18.5756 7.22346 18.9712 7.28543 19.3306 7.159L21.6908 6.32875C22.2204 6.14245 22.8076 6.35977 23.0883 6.84597L24.7451 9.71555C25.0258 10.2018 24.9204 10.8189 24.4943 11.1844L22.5887 12.8188C22.3007 13.0659 22.1564 13.4376 22.1647 13.817C22.166 13.8777 22.1667 13.9386 22.1667 13.9997C22.1667 14.1251 22.1639 14.2498 22.1583 14.3738C22.1407 14.7635 22.2844 15.1485 22.5805 15.4025L24.4943 17.0439C24.9204 17.4094 25.0258 18.0266 24.7451 18.5128L23.0883 21.3824C22.8076 21.8686 22.2204 22.0859 21.6908 21.8996L19.0889 20.9843C18.7421 20.8623 18.3608 20.9157 18.0415 21.0979C18.0139 21.1136 17.9861 21.1292 17.9583 21.1447C17.6282 21.328 17.3804 21.6376 17.3108 22.0087L16.8035 24.7147C16.7 25.2665 16.2182 25.6663 15.6568 25.6663H12.3433C11.7819 25.6663 11.3001 25.2665 11.1966 24.7147L10.6892 22.0087C10.6196 21.6376 10.3719 21.328 10.0418 21.1447C10.0139 21.1292 9.98621 21.1136 9.9586 21.0979C9.6393 20.9157 9.25795 20.8623 8.91116 20.9843L6.30925 21.8996C5.77964 22.0859 5.19245 21.8686 4.91174 21.3824L3.25499 18.5128C2.97428 18.0266 3.07967 17.4094 3.50581 17.0439L5.41954 15.4025C5.71566 15.1485 5.85936 14.7635 5.84179 14.3738C5.83619 14.2498 5.83337 14.1251 5.83337 13.9997C5.83337 13.9386 5.83404 13.8777 5.83537 13.817C5.8437 13.4376 5.69941 13.0659 5.41135 12.8188L3.50581 11.1844C3.07967 10.8189 2.97428 10.2018 3.25499 9.71555L4.91174 6.84597C5.19245 6.35977 5.77965 6.14245 6.30925 6.32875L8.66946 7.159C9.02889 7.28543 9.42446 7.22346 9.74964 7.02488C9.84572 6.9662 9.94311 6.90945 10.0417 6.85469C10.3719 6.6714 10.6196 6.3618 10.6892 5.99065L11.1966 3.28467C11.3001 2.73287 11.7819 2.33301 12.3433 2.33301H15.6568ZM16.3334 13.9997C16.3334 15.2883 15.2887 16.333 14 16.333C12.7114 16.333 11.6667 15.2883 11.6667 13.9997C11.6667 12.711 12.7114 11.6663 14 11.6663C15.2887 11.6663 16.3334 12.711 16.3334 13.9997Z"
            fill="black"
          />
        </svg>
      }
    >
      <div className="flex flex-col divide-y-[1px] divide-line-regular">
        <section className="flex flex-col items-start px-5 py-4">
          <h4 className="py-2 text-but4-m text-font-gray-03">계정 관리</h4>
          <EditProfile />

          <Modal
            trigger={
              <p className="cursor-pointer py-[14px] text-but2-sb text-black">
                로그아웃
              </p>
            }
            title="로그아웃"
            description="정말 로그아웃 하시겠어요?"
            footer={{
              item: [
                <Close
                  key="cancel"
                  className="flex-1 rounded-none bg-bg-regular px-4 py-[14px] text-but2-sb text-black duration-150 active:bg-black-200"
                >
                  취소
                  <span className="sr-only">Close</span>
                </Close>,
                <button
                  onClick={signout}
                  key="confirm"
                  className="flex-1 rounded-none  bg-brand-main px-4 py-[14px] text-but2-sb text-white duration-150 active:bg-green-500"
                >
                  확인
                </button>,
              ],
            }}
          />
          <Modal
            open={openWithdraw}
            onOpenChange={setOpenWithdraw}
            footer={{
              item: [
                <Close
                  key="cancel"
                  className="flex-1 rounded-none bg-bg-regular px-4 py-[14px] text-but2-sb text-black duration-150 active:bg-black-200"
                >
                  취소
                </Close>,
                <button
                  onClick={handleWithdrawClick}
                  key="confirm"
                  className="flex-1 rounded-none bg-brand-main px-4 py-[14px] text-but2-sb text-white duration-150 active:bg-green-500"
                >
                  탈퇴
                </button>,
              ],
            }}
            trigger={
              <p className="py-[14px] text-but2-sb text-black">회원 탈퇴</p>
            }
            title="회원 탈퇴"
            description={`탈퇴 시 모든 정보가 사라져요.
            정말 탈퇴하시겠어요?`}
          />
        </section>
        {/* <section className="flex flex-col items-start px-5 py-4">
          <h4 className="py-2 text-but4-m text-font-gray-03">작성 목록</h4>
          <FilterProvider>
            <WriteList />
          </FilterProvider>
        </section> */}
        <section className="flex flex-col items-start px-5 py-4">
          <h4 className="py-2 text-but4-m text-font-gray-03 ">남의 위키</h4>
          <DeveloperInfo />
        </section>
      </div>
    </SideDrawer>
  )
}

export default Setting
