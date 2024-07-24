import Setting from '@/components/header/setting'
import Logo from '@/components/svgs/logo'
import BaseLayout from '@/layout/base-layout'
import Image from 'next/image'
import { ReactNode } from 'react'
import { cn } from '@/lib/client/utils'
import namuiCharacter from '@/assets/icons/namui-character.svg'
import romanceCharacter from '@/assets/icons/romance-character.svg'
import { useRouter } from 'next/router'

import { useQuery } from '@tanstack/react-query'
import { getWikis } from '@/queries/wiki'
import withAuth from '@/layout/HOC/with-auth'

import { motion } from 'framer-motion'

const Main = () => {
  // const [wikis, setWikis] = useState<Wiki[]>([])
  const { data: wikis } = useQuery(getWikis)

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
      <div className="flex flex-col space-y-8  px-[20px] pb-6 pt-8">
        <div className="flex flex-col space-y-8 px-[10px]">
          <h3 className="text-h1-kr-b text-font-gray-04">
            남이 보는 <br />
            <span className="text-h1-kr-b text-font-black">내 모습을 </span>
            알아보세요
          </h3>
        </div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="flex flex-col space-y-3"
        >
          {wikis?.data.wikiList.map((wiki) => (
            <TemplateButton
              key={wiki.wikiType + wiki.description}
              className={
                wiki.wikiType === 'NAMUI'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-pink-200 text-pink-600'
              }
              characterSvg={
                wiki.wikiType === 'NAMUI' ? namuiCharacter : romanceCharacter
              }
              wikiName={wiki.name}
              questionNumber={wiki.questionCount}
              wikiDescription={wiki.description}
              answerCount={wiki.answerCount === null ? 0 : wiki.answerCount}
              url={`/dashboard?wikiType=${wiki.wikiType}`}
            />
          ))}
        </motion.div>
      </div>
    </BaseLayout>
  )
}

const MainWithAuth = withAuth(Main)
MainWithAuth.getLayout = (page: ReactNode) => page
export default MainWithAuth

export interface TemplateButtonProps {
  className?: string
  characterSvg: string
  wikiName: string
  questionNumber: number
  wikiDescription: string
  answerCount: number
  url: string
}

const variant = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
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
    <motion.button
      variants={variant}
      onClick={() => {
        router.push(url)
      }}
      className="w-full"
    >
      <div
        className="flex w-full
        items-center justify-center gap-[10px] rounded-2xl bg-white px-4 py-5
        transition-all duration-200 hover:bg-line-regular active:bg-black-700
        "
      >
        <div className="flex w-full items-center justify-center gap-3">
          <Image src={characterSvg} alt="character" className="flex-shrink-0" />
          <div className="flex w-full flex-col space-y-3">
            <div className="flex flex-col justify-start space-y-2">
              <div className="flex space-x-2">
                <h3 className="text-t3-kr-b text-font-black">{wikiName}</h3>
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full px-[10px] py-[3px] text-left text-but5-m',
                    className,
                  )}
                >
                  질문 {questionNumber}개
                </div>
              </div>
              <p className="text-start text-b2-kr-m tracking-tighter text-font-gray-03">
                {wikiDescription}
              </p>
            </div>
            <p className=" w-full text-right text-b3-kr-m text-font-gray-04">
              {answerCount}명 답변
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
