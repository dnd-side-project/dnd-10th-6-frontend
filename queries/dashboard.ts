import { NamuiApi } from '@/lib/namui-api'
import {
  DashboardData,
  DashboardResponse,
  Statistic,
} from '@/model/dashboard.entity'
import { Period, Relation } from '@/model/tree.entity'
import { UseQueryOptions } from '@tanstack/react-query'

export type DashboardFilter =
  | {
      type: 'period'
      value: Period
    }
  | { type: 'relation'; value: Relation }

export const getDashboardQuery = (
  filters?: DashboardFilter,
): UseQueryOptions<DashboardResponse, Error, Statistic[]> => {
  return {
    queryKey: ['Dashboard'],
    queryFn: NamuiApi.getDashboard,
    select: (result) => {
      return result.data?.statistics ?? []
    },
    throwOnError: false,
  }
}
