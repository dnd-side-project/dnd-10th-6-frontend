import { UseQueryOptions } from '@tanstack/react-query'
import { NamuiApi } from '@/lib/namui-api'
import { WikiType } from '@/types'
import { DashboardResponse, Statistic } from '@/model/dashboard.entity'

export type DashboardFilter = {
  type: string
  value: string
}

export const getDashboardQuery = (
  wikiType: WikiType,
  filters?: DashboardFilter,
): UseQueryOptions<
  DashboardResponse,
  Error,
  Statistic[],
  [string, WikiType, string, string]
> => {
  return {
    queryKey: [
      'Dashboard',
      wikiType,
      filters?.type ?? 'period',
      filters?.value ?? 'ALL',
    ],
    queryFn: ({ queryKey }) =>
      NamuiApi.getDashboard([queryKey[2], queryKey[3]], wikiType),
    select: (result) => {
      return result.data?.statistics ?? []
    },
    throwOnError: false,
  }
}
