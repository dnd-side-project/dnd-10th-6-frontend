import Setting from '@/components/header/setting'
import Logo from '@/components/svgs/logo'
import BaseLayout from '@/layout/base-layout'
import Image from 'next/image'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/client/utils'
import namuiCharacter from '@/assets/icons/namui-character.svg'
import romanceCharacter from '@/assets/icons/romance-character.svg'
import { useRouter } from 'next/router'
import { useSession } from '@/provider/session-provider'

import { NamuiApi } from '@/lib/namui-api'
import { Wiki } from '@/model/wikis.entity'

const Main = () => {
  const { data } = useSession()
  const [wikis, setWikis] = useState<Wiki[]>([])

  const getWikis = useCallback(async () => {
    try {
      if (data?.token?.accessToken || NamuiApi.hasToken()) {
        const response = await NamuiApi.getWikis()
        console.log(response.data)
        setWikis(response.wikiList)
      }
    } catch (error) {
      console.error(error)
    }
  }, [data?.token?.accessToken])

  useEffect(() => {
    getWikis()
  }, [getWikis])

  return (
    <BaseLayout
      className=" flex h-calc-h flex-col bg-bg-light "
      header={{
        className: 'bg-bg-light',
        leftIcon: null,
        rightIcon: (
          <button>
            <Setting />
          </button>
        ),

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
          {/* {wikis.map((wiki) => (
            <TemplateButton
              key={wiki.id}
              className={
                wiki.id === 'NAMUI'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-pink-200 text-pink-600'
              }
              characterSvg={
                wiki.id === 'NAMUI' ? namuiCharacter : romanceCharacter
              }
              wikiName={wiki.name}
              questionNumber={wiki.questionCount}
              wikiDescription={wiki.description}
              answerCount={wiki.answerCount === null ? 0 : wiki.answerCount}
              url={`/dashboard/${wiki}`}
            />
          ))} */}
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
        className="hover:bg-line-regular flex
        w-full items-center justify-center gap-[10px] rounded-2xl bg-white px-4
        py-5 transition-all duration-200 active:bg-black-700
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
