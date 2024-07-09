import Image from 'next/image'
import landingTree from '@/assets/characters/landing-tree.svg'
import kakaoIcon from '@/assets/icons/kakao.svg'
const WriterLanding = () => {
  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <Image src={landingTree} alt="landingTree" />
        <h2 className="mb-5 mt-6 text-mainTitle2-bold">
          남의위키가 도착했어요
        </h2>
        <p className="text-subTitle2-medium text-text-sub-gray4f ">
          남의위키를 통해
          <br />
          내가 본 친구의 모습을 알려주세요
        </p>
      </section>
      <section className="flex flex-col items-center justify-center">
        <div className="relative mb-8 mt-10 text-center">
          <div className="relative h-full w-full flex-1 rounded-lg bg-white  px-4 py-5 shadow-chat-bubble">
            <p className="text-body3-medium text-black">
              <b>비회원</b>으로 시작하면 <br />
              내가 작성한 <b>남의위키를 볼 수 없어요!</b>
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2">
            <div className=" h-0 w-0 -translate-x-1/2 translate-y-full transform border-l-[18px] border-r-[15px] border-t-[15px] border-white border-l-transparent border-r-transparent"></div>
          </div>
        </div>
        <a className="h-13 bg-brand-sub1-yellow500 flex w-full items-center justify-center rounded-md p-2 px-4">
          <Image src={kakaoIcon} alt="kakaoIcon" height={24} width={24} />
          <p className="ml-3 p-2 text-center text-subTitle2-medium font-bold">
            카카오 로그인
          </p>
        </a>
        <button className="text-body3 text-medium mt-4 leading-body3 text-text-sub-gray76 underline">
          비회원으로 시작하기
        </button>
      </section>
    </>
  )
}

export default WriterLanding
