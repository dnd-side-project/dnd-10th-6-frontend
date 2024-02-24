import { NamuiApi } from '@/lib/namui-api'
import { DashboardResponse, Statistic } from '@/model/dashboard.entity'
import { UseQueryOptions } from '@tanstack/react-query'

export type DashboardFilter = {
  type: string
  value: string
}

export const getDashboardQuery = (
  filters?: DashboardFilter,
): UseQueryOptions<
  DashboardResponse,
  Error,
  Statistic[],
  [string, string, string]
> => {
  return {
    queryKey: ['Dashboard', filters?.type ?? 'period', filters?.value ?? 'ALL'],
    queryFn: ({ queryKey }) =>
      NamuiApi.getDashboard([queryKey[1], queryKey[2]]),
    select: (result) => {
      return result.data?.statistics ?? []
    },
    throwOnError: false,
  }
}
