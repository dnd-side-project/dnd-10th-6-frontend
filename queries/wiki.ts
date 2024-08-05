import { UseQueryOptions } from '@tanstack/react-query'
import { NamuiApi, NamuiResponse } from '@/lib/namui-api'
import { Wikis } from '@/model/wikis.entity'

export const getWikis: UseQueryOptions<
  NamuiResponse<Wikis>,
  Error,
  NamuiResponse<Wikis>,
  ['wikis']
> = {
  queryKey: ['wikis'],
  queryFn: NamuiApi.getWikis,
}
