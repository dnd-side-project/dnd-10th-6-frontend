import useDetailDrawer from '@/hooks/use-detail-drawer'
import { cn } from '@/lib/client/utils'
import { SHORT_TYPE_LIST } from '@/model/question.entity'
import { useSession } from '@/provider/session-provider'
import { getQuestionByTypeQuery } from '@/queries/question'
import { WikiType, PropswithWikiType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const SHORT_FILTER: {
  [wikiType in WikiType]: {
    [key in SHORT_TYPE_LIST[number]]: string
  }
} = {
  NAMUI: {
    FIRST_IMPRESSION: '첫인상은?',
    FIVE_LETTER_WORD: '5글자로 표현한다면?',
    LEARNING_ASPIRATION: '이런점은 꼭 배우고 싶어요!',
    MOST_USED_WORD: '가장 많이 사용하는 단어는?',
    SECRET_PLEASURE: '혼자 몰래 좋아하고 있는 것은?',
    CHARACTER_CELEBRITY_ASSOCIATION: '닮은 캐릭터(연예인)은?',
  },
  ROMANCE: {
    FIRST_IMPRESSION: '👀 나의 첫인상은?',
    CHARACTER_CELEBRITY_ASSOCIATION: '🤔 나는 누구와 닮았나요?',
    FIVE_LETTER_WORD: '🧐 나를 5글자로 표현한다면?',
    LEARNING_ASPIRATION: '📚 나의 이런점은 꼭 배우고 싶어요!',
    SECRET_PLEASURE: '😍 내가 혼자 몰래 좋아하고 있는 것은?',
    MOST_USED_WORD: '💬 내가 가장 많이 사용하는 단어는?',
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
                'flex items-center justify-between rounded-2xl bg-white p-5',
                'origin-center duration-300 enabled:hover:scale-[1.01] enabled:active:scale-[0.985]',
                'enabled:hover:bg-gray-300  enabled:active:bg-gray-200',
                'w-full',
              )}
            >
              <span className="text-black-02 ml-3 text-b1-kr-m">
                {SHORT_FILTER[wikiType][item.name]}
              </span>
              <svg
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
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
