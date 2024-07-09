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

const TreeInfo = ({}: { filter: FilterType }) => {
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
      <div className="bg-bg-gray1 flex flex-col gap-y-6 rounded-2xl px-6 pb-10 pt-[30px]">
        <div className="flex items-center justify-between">
          <p className="text-body1 text-text-sub-gray4f">
            내 정원에 심어진 나무는
            <br />
            <b className="mt-1 text-mainTitle1-bold text-black">
              총 {data?.user?.totalSurveyCnt ?? 0}그루
            </b>
          </p>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-text-main-whiteFF">
            <Image src={tree} alt="tree" />
          </div>
        </div>
        <ShareModal>
          <Button className="h-11">링크 공유하기</Button>
        </ShareModal>
      </div>
      <h3 className="mb-5 mt-8 text-mainTitle2-bold font-bold tracking-tighter">
        {data?.user?.name ?? ''}님에 대해 알아보세요!
      </h3>

      {/* !DELETE */}
      {short?.length ? (
        <>
          <div className="avoid-min-w relative -left-[1.5rem] flex w-[calc(100%_+_3rem)] space-x-2 overflow-x-scroll px-6 pl-6 scrollbar-hide">
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
          <div className="relative -left-[1.5rem] mt-3 flex w-[calc(100%_+_3rem)] space-x-2 overflow-y-hidden overflow-x-scroll px-6 scrollbar-hide">
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
