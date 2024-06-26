import Image from 'next/image'
import landingTree from '@/assets/characters/landing-tree.svg'
import kakaoIcon from '@/assets/icons/kakao.svg'
const WriterLanding = () => {
  return (
    <>
      <section className="flex-1 flex flex-col justify-center items-center text-center">
        <Image src={landingTree} alt="landingTree" />
        <h2 className="text-mainTitle2-bold mt-6 mb-5">
          남의위키가 도착했어요
        </h2>
        <p className="text-subTitle2-medium text-text-sub-gray4f ">
          남의위키를 통해
          <br />
          내가 본 친구의 모습을 알려주세요
        </p>
      </section>
      <section className="flex flex-col items-center justify-center">
        <div className="relative mt-10 mb-8 text-center">
          <div className="w-full h-full bg-white shadow-chat-bubble py-5 px-4  rounded-lg flex-1 relative">
            <p className="text-body3-medium text-black">
              <b>비회원</b>으로 시작하면 <br />
              내가 작성한 <b>남의위키를 볼 수 없어요!</b>
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2">
            <div className=" w-0 h-0 border-l-[18px] border-l-transparent border-t-[15px] border-white border-r-[15px] border-r-transparent transform -translate-x-1/2 translate-y-full"></div>
          </div>
        </div>
        <a className="w-full h-13 p-2 px-4 flex items-center justify-center bg-brand-sub1-yellow500 rounded-md">
          <Image src={kakaoIcon} alt="kakaoIcon" height={24} width={24} />
          <p className="ml-3 p-2 text-center font-bold text-subTitle2-medium">
            카카오 로그인
          </p>
        </a>
        <button className="mt-4 text-text-sub-gray76 text-body3 leading-body3 text-medium underline">
          비회원으로 시작하기
        </button>
      </section>
    </>
  )
}

export default WriterLanding
