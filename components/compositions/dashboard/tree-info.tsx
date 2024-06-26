import { Button, Badge } from '@/components/ui'
import ShareModal from '@/components/share-modal'
import useDetailDrawer from '@/hooks/use-detail-drawer'
import { FilterType } from '@/hooks/use-filter'
import { SHORT_TYPE_LIST } from '@/model/question.entity'
import { useSession } from '@/provider/session-provider'
import { getQuestionByTypeQuery } from '@/queries/question'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import tree from '@/assets/icons/tree-icon.svg'

const SHORT_FILTER: { [key in SHORT_TYPE_LIST[number]]: string } = {
  FIRST_IMPRESSION: '👀 나의 첫인상은?',
  CHARACTER_CELEBRITY_ASSOCIATION: '🤔 나는 누구와 닮았나요?',
  FIVE_LETTER_WORD: '🧐 나를 5글자로 표현한다면?',
  LEARNING_ASPIRATION: '📚 나의 이런점은 꼭 배우고 싶어요!',
  SECRET_PLEASURE: '😍 내가 혼자 몰래 좋아하고 있는 것은?',
  MOST_USED_WORD: '💬 내가 가장 많이 사용하는 단어는?',
}

const TreeInfo = ({ filter }: { filter: FilterType }) => {
  const { handle } = useDetailDrawer()
  const { data } = useSession()
  const { data: short } = useQuery({
    ...getQuestionByTypeQuery('SHORT_ANSWER'),
    select(data) {
      return data.data
    },
  })

  return (
    <>
      <div className="bg-bg-gray1 pt-[30px] pb-10 px-6 rounded-2xl gap-y-6 flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-body1 text-text-sub-gray4f">
            내 정원에 심어진 나무는
            <br />
            <b className="text-mainTitle1-bold mt-1 text-black">
              총 {data?.user?.totalSurveyCnt ?? 0}그루
            </b>
          </p>
          <div className="w-20 h-20 bg-text-main-whiteFF flex justify-center items-center rounded-full">
            <Image src={tree} alt="tree" />
          </div>
        </div>
        <ShareModal>
          <Button className="h-11">링크 공유하기</Button>
        </ShareModal>
      </div>
      <h3 className="text-mainTitle2-bold tracking-tighter font-bold mt-8 mb-5">
        {data?.user?.name ?? ''}님에 대해 알아보세요!
      </h3>

      {/* !DELETE */}
      {short?.length ? (
        <>
          <div className="flex overflow-x-scroll space-x-2 w-[calc(100%_+_3rem)] px-6 pl-6 scrollbar-hide avoid-min-w relative -left-[1.5rem]">
            {short.slice(0, short.length / 2).map((item) => (
              <Badge
                key={item.id}
                onClick={() => {
                  handle(item.id, 'SHORT_ANSWER')
                }}
                title={SHORT_FILTER[item.name]}
              />
            ))}
          </div>
          <div className="mt-3 flex overflow-x-scroll overflow-y-hidden relative -left-[1.5rem] px-6 space-x-2 w-[calc(100%_+_3rem)] scrollbar-hide">
            {short.slice(short.length / 2, short.length).map((item) => (
              <Badge
                key={item.id}
                onClick={() => handle(item.id, 'SHORT_ANSWER')}
                title={SHORT_FILTER[item.name]}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

export default TreeInfo
