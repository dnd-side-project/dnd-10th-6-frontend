import { NamuiApi } from '@/lib/namui-api'
import { Question } from '@/model/question.entity'
import { UseQueryOptions } from '@tanstack/react-query'

export const getQuestionQuery: UseQueryOptions<
  { data: Question[] },
  Error,
  Question[]
> = {
  queryKey: ['Question'],
  queryFn: NamuiApi.getQs,
  select: (result) => result.data,
}
