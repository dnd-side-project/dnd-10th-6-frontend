import { cn } from '@/lib/client/utils'

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

const bgColor = (relation: string) => {
  switch (relation) {
    case 'ELEMENTARY_SCHOOL':
      return 'bg-yellow-50'
    case 'MIDDLE_AND_HIGH_SCHOOL':
      return 'bg-orange-50'
    case 'UNIVERSITY':
      return 'bg-[#EEFFEF]'
    case 'WORK':
      return 'bg-blue-50'
    case 'SOCIAL':
      return 'bg-green-50'
    case 'ETC':
      return 'bg-black-50'
    default:
      return ''
  }
}

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

export const RelationBadge = ({ relation }: { relation: string }) => {
  return (
    <div
      className={cn(
        'h-fit w-fit rounded-md px-2 py-1 !text-but4-m',
        bgColor(relation),
        textColor(relation),
      )}
    >
      {relations[relation]}
    </div>
  )
}
