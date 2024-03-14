import As from '@/icons/onboard_2.svg'
import Image from 'next/image'

const OnboardStep2 = () => {
  return (
    <div
      key="step2"
      className="px-5 h-full flex flex-col items-center text-center space-y-[2vb] justify-center pb-[5vb]"
    >
      <h2 className="text-[2.3vb]">
        친구와 <b>알게 된 기간, 경로</b>에 따라
        <br />
        <b>나무 카드의 모양과 색</b>이 달라져요
      </h2>
      <div className="relative grow w-full">
        <Image src={As} fill alt="onboard_2" />
      </div>
    </div>
  )
}

export default OnboardStep2
