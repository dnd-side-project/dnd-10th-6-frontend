import As from '/assets/icons/onboard3.svg'
import Image from 'next/image'

const OnboardStep3 = () => {
  return (
    <div
      key="step3"
      className="px-5 h-full flex flex-col items-center text-center space-y- justify-center space-y-[2vb] pb-[5vb]"
    >
      <h2 className="text-[2.3vb]">
        내 결과 보기 페이지에서 그룹별로
        <br />
        <b>상세 데이터를 확인</b>할 수 있어요
      </h2>
      <div className="relative grow w-full">
        <Image src={As} fill alt="onboard_3" />
      </div>
    </div>
  )
}

export default OnboardStep3
