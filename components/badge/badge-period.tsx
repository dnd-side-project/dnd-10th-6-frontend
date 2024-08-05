import { cn } from '@/lib/client/utils'

export const periods: { [key: string]: string } = {
  SIX_MONTHS: '6개월 미만',
  ONE_YEAR: '6개월-1년 미만',
  FOUR_YEARS: '1년-4년 미만',
  INFINITE: '4년 이상',
}

export const PeriodBadge = ({ period }: { period: string }) => {
  return (
    <div
      className={cn(
        ' h-fit w-fit rounded-md bg-black-50 px-2 py-1 !text-but4-m text-black-700',
      )}
    >
      {periods[period]}
    </div>
  )
}
