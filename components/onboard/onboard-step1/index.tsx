import React from 'react'
import As from '@/pages/assets/icons/onboard_1.svg'
import Image from 'next/image'
const OnboardStep1 = () => {
  return (
    <div
      key="step1"
      className="px-5 h-full flex flex-col items-center text-center space-y-[2vb] justify-center pb-[5vb]"
    >
      <h2 className="text-[2.3vb]">
        <b>남의위키 링크를 공유</b>해 친구에게
        <br />
        나에 대해 알려달라고 부탁해보세요
      </h2>
      <div className="relative grow w-full">
        <Image src={As} fill alt="onboard_1" />
      </div>
    </div>
  )
}

export default OnboardStep1
