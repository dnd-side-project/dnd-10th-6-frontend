import React, { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/provider/session-provider'
import { cn } from '@/lib/client/utils'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { getQuestionByTypeQuery } from '@/queries/question'
import { WikiType, PropswithWikiType } from '@/types'
import { SHORT_TYPE_LIST } from '@/model/question.entity'

function ShortFilter({ emoji, label }: { label: string; emoji: string }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-emoji text-d6-kr-m">{emoji}</span>
      <span className="text-b1-kr-m">{label}</span>
    </div>
  )
}

const SHORT_FILTER: {
  [wikiType in WikiType]: {
    [key in SHORT_TYPE_LIST[number]]: ReactNode
  }
} = {
  NAMUI: {
    FIRST_IMPRESSION: <ShortFilter label="첫인상은?" emoji="😀" />,
    FIVE_LETTER_WORD: <ShortFilter label="5글자로 표현한다면?" emoji="5️⃣" />,
    LEARNING_ASPIRATION: (
      <ShortFilter label="이런점은 꼭 배우고 싶어요!" emoji="📝" />
    ),
    MOST_USED_WORD: (
      <ShortFilter label="가장 많이 사용하는 단어는?" emoji="🔤" />
    ),
    SECRET_PLEASURE: (
      <ShortFilter label="혼자 몰래 좋아하고 있는 것은?" emoji="🤫" />
    ),
    CHARACTER_CELEBRITY_ASSOCIATION: (
      <ShortFilter label="닮은 캐릭터(연예인)은?" emoji="👥" />
    ),
  },
  ROMANCE: {
    IDEAL_TYPE: <ShortFilter emoji="💕" label="이상형은?" />,
    FLIRTING_METHOD: (
      <ShortFilter emoji="👩🏻‍❤️‍👨🏻" label="이성에게 하는 플러팅 방법은?" />
    ),
  },
}
export const KnowAbout = ({ wikiType }: PropswithWikiType) => {
  const { handle } = useDetailDrawer()
  const { data: user } = useSession()
  const { data: short } = useQuery({
    ...getQuestionByTypeQuery('SHORT_ANSWER', wikiType),
    select(data) {
      return data.data
    },
  })
  return (
    <div className="space-y-8 rounded-[20px] bg-bg-light p-5 py-10">
      <h2 className="mx-auto w-fit text-t1-kr-b">
        {user?.user?.name}님에 대해 알아보세요!
      </h2>
      <ul className="flex flex-col space-y-3 ">
        {short?.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handle(item.id, 'SHORT_ANSWER')}
              className={cn(
                'flex items-center justify-between rounded-2xl bg-white px-6 py-5',
                'origin-center duration-300 enabled:hover:scale-[1.01] enabled:active:scale-[0.985]',
                'enabled:hover:bg-gray-300  enabled:active:bg-gray-200',
                'w-full',
              )}
            >
              <span className="text-black-02 ml-3 text-b1-kr-m">
                {SHORT_FILTER[wikiType][item.name]}
              </span>
              {/* <svg
                width={20}
                height={20}
                viewBox="0 0 28 28"
                className="text-font aspect-square rotate-180 fill-font-gray-disabled"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.6187 23.6187C18.277 23.9604 17.723 23.9604 17.3813 23.6187L8.38128 14.6187C8.21719 14.4546 8.125 14.2321 8.125 14C8.125 13.7679 8.21719 13.5454 8.38128 13.3813L17.3813 4.38128C17.723 4.03957 18.277 4.03957 18.6187 4.38128C18.9604 4.72299 18.9604 5.27701 18.6187 5.61872L10.2374 14L18.6187 22.3813C18.9604 22.723 18.9604 23.277 18.6187 23.6187Z"
                />
              </svg> */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
