import React, { useState } from 'react'
import AlertCard from './alert-card'
import SideDrawer from '@/components/side-drawer'

const Alert = () => {
  const [openAlert, setOpenAlert] = useState(false)
  return (
    <SideDrawer
      header={{
        center: <p className="text-body1-bold">알림</p>,
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
            d="M22.862 20.4163L21.428 17.4859C20.9161 16.4395 20.6499 15.2901 20.6499 14.1252V10.733C20.6499 7.06032 17.6726 4.08301 13.9999 4.08301C10.3272 4.08301 7.34991 7.06032 7.34991 10.733V14.1252C7.34991 15.2901 7.08376 16.4395 6.57178 17.4858L5.13783 20.4163H22.862ZM13.9999 2.33301C9.36072 2.33301 5.59991 6.09382 5.59991 10.733V14.1252C5.59991 15.0235 5.39468 15.9098 4.99988 16.7167L3.49743 19.7872C2.96014 20.8852 3.75955 22.1663 4.98199 22.1663H23.0178C24.2403 22.1663 25.0397 20.8852 24.5024 19.7872L23 16.7167C22.6052 15.9098 22.3999 15.0235 22.3999 14.1252V10.733C22.3999 6.09382 18.6391 2.33301 13.9999 2.33301Z"
            fill="#111111"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5 20.417V22.167C17.5 24.1 15.933 25.667 14 25.667C12.067 25.667 10.5 24.1 10.5 22.167V20.417H17.5ZM12.25 22.167H15.75C15.75 23.1335 14.9665 23.917 14 23.917C13.0335 23.917 12.25 23.1335 12.25 22.167Z"
            fill="#111111"
          />
        </svg>
      }
    >
      <div className="flex flex-col">
        <div className="py-[15px] px-5 flex justify-end">
          <button className="text-[13px] text-brand-main-green400 leading-[18px] active:text-text-sub-gray76 duration-150">
            모두 읽기
          </button>
        </div>
        <AlertCard />
        <AlertCard isRead />
        <AlertCard isRead />
      </div>
    </SideDrawer>
  )
}

export default Alert
