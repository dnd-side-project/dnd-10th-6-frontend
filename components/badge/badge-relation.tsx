import { cn } from '@/lib/client/utils'
import { CardType } from '@/model/card.entity'
import { PropswithWikiType } from '@/types'

//THINK!
export const relations: {
  [key: string]: string
} = {
  ELEMENTARY_SCHOOL: '초등학교',
  MIDDLE_AND_HIGH_SCHOOL: '중·고등학교',
  UNIVERSITY: '대학교',
  WORK: '직장',
  SOCIAL: '모임',
  ETC: '기타',
}

//TODO: 연애위키 대학교 뱃지 - pink 등록 필요

const textColor = (relation: string) => {
  switch (relation) {
    case 'ELEMENTARY_SCHOOL':
      return 'text-yellow-600'
    case 'MIDDLE_AND_HIGH_SCHOOL':
      return 'text-yellow-900'
    case 'UNIVERSITY':
      return 'text-green-900'
    case 'WORK':
      return 'text-blue-600'
    case 'SOCIAL':
      return 'text-green-600'
    case 'ETC':
      return 'text-black-900'
    default:
      return ''
  }
}

export const RelationBadge = ({
  relation,
  wikiType,
}: PropswithWikiType<{ relation: string }>) => {
  return (
    <div
      className={cn(
        'h-fit w-fit rounded-md px-2 py-1 !text-but4-m',
        CardType.getBgColorClassName(wikiType, relation),
        textColor(relation),
      )}
    >
      {relations[relation]}
    </div>
  )
}
