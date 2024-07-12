import Setting from '@/components/header/setting'
import Logo from '@/components/svgs/logo'
import BaseLayout from '@/layout/base-layout'
import Image from 'next/image'
import { ReactNode } from 'react'
import { cn } from '@/lib/client/utils'
import namuiCharacter from '@/assets/icons/namui-character.svg'
import romanceCharacter from '@/assets/icons/romance-character.svg'
import { useRouter } from 'next/router'

const Main = () => {
  return (
    <BaseLayout
      className=" flex h-calc-h flex-col bg-bg-light "
      header={{
        className: 'bg-bg-light',
        leftIcon: null,
        rightIcon: <Setting />,
        center: <Logo />,
      }}
    >
      <div className="flex flex-col space-y-5 px-[30px] pb-6 pt-8">
        <div className="flex flex-col space-y-8">
          <h3 className=" text-h1-kr-b text-font-gray-04">
            남이 보는 <br />
            <span className="text-h1-kr-b text-font-black">내 모습을 </span>
            알아보세요
          </h3>
        </div>
        <div className="flex flex-col space-y-3">
          <TemplateButton
            className=" bg-green-50 text-green-600"
            characterSvg={namuiCharacter}
            wikiName="남의위키"
            questionNumber={14}
            wikiDescription="다른 사람이보는 내 모습은 어떨까요?"
            answerCount={0}
            url="/dashboard"
          />
          <TemplateButton
            className="bg-pink-200 text-pink-600"
            characterSvg={romanceCharacter}
            wikiName="연애위키"
            questionNumber={9}
            wikiDescription="연애할 때 나는 어떤 사람일까요?"
            answerCount={0}
            url="/dashboard2"
          />
        </div>
      </div>
    </BaseLayout>
  )
}

export default Main
Main.getLayout = (page: ReactNode) => page

export interface TemplateButtonProps {
  className?: string
  characterSvg: string
  wikiName: string
  questionNumber: number
  wikiDescription: string
  answerCount: number
  url: string
}

const TemplateButton = ({
  className,
  characterSvg,
  wikiName,
  questionNumber,
  wikiDescription,
  answerCount,
  url,
}: TemplateButtonProps) => {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        router.push(url)
      }}
      className="w-full"
    >
      <div
        className="flex w-full items-center justify-center gap-[10px] rounded-2xl bg-white px-4 py-5
        "
      >
        <div className="flex w-full items-center justify-center gap-3">
          <Image src={characterSvg} alt="character" />
          <div className="flex w-full flex-col space-y-2">
            <div className="flex items-center justify-start space-x-2">
              <h3 className="text-t3-kr-b text-font-black">{wikiName}</h3>
              <div
                className={cn(
                  'text-body3-kr-m flex items-center justify-center rounded-full px-[10px] py-[3px] text-left',
                  className,
                )}
              >
                질문 {questionNumber}개
              </div>
            </div>
            <p className="text-body2-kr-m w-full text-left text-font-gray-04">
              {wikiDescription}
            </p>
            <p className=" w-full text-right text-b3-kr-m text-font-gray-04">
              {answerCount}명 답변
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}
