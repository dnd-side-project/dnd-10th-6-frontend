import { cn } from '@/lib/client/utils'

const periodLabels = {
  SIX_MONTHS: '6개월 미만',
  ONE_YEAR: '6개월-1년 미만',
  FOUR_YEARS: '1년-4년 미만',
  INFINITE: '4년 이상',
}

const PeriodBadge = ({ period }: { period: keyof typeof periodLabels }) => {
  const label = periodLabels[period]

  return (
    <div
      className={cn(
        'w-fit rounded text-body3-medium px-3 py-1 bg-gray-gray50 text-text-sub-gray4f',
      )}
    >
      {label}
    </div>
  )
}

export default PeriodBadge
