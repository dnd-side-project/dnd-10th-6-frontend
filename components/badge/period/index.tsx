import { cn } from '@/lib/client/utils'

export const periods: { [key: string]: string } = {
  SIX_MONTHS: '6개월 미만',
  ONE_YEAR: '6개월-1년 미만',
  FOUR_YEARS: '1년-4년 미만',
  INFINITE: '4년 이상',
}

const PeriodBadge = ({ period }: { period: string }) => {
  return (
    <div
      className={cn(
        'w-fit rounded-md text-body3-medium px-3 py-1 bg-gray-gray50 text-text-sub-gray4f',
      )}
    >
      {periods[period]}
    </div>
  )
}

export default PeriodBadge
