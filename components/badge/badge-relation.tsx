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

const bgColor = (relation: string) => {
  switch (relation) {
    case 'ELEMENTARY_SCHOOL':
      return 'bg-relation-elementary_school'
    case 'MIDDLE_AND_HIGH_SCHOOL':
      return 'bg-relation-middle_and_high_school'
    case 'UNIVERSITY':
      return 'bg-relation-university'
    case 'WORK':
      return 'bg-relation-work'
    case 'SOCIAL':
      return 'bg-relation-social'
    case 'ETC':
      return 'bg-relation-etc'
    default:
      return ''
  }
}

const textColor = (relation: string) => {
  switch (relation) {
    case 'ELEMENTARY_SCHOOL':
      return 'text-[#BEA000]'
    case 'MIDDLE_AND_HIGH_SCHOOL':
      return 'text-[#EF7200]'
    case 'UNIVERSITY':
      return 'text-main-green800'
    case 'WORK':
      return 'text-main-sub2-blue-blue900'
    case 'SOCIAL':
      return 'text-brand-main-green400'
    case 'ETC':
      return 'text-text-sub-gray4f'
    default:
      return ''
  }
}

export const RelationBadge = ({ relation }: { relation: string }) => {
  return (
    <div
      className={cn(
        'h-fit w-fit rounded-md px-2 py-1 !text-caption2-medium',
        bgColor(relation),
        textColor(relation),
      )}
    >
      {relations[relation]}
    </div>
  )
}
