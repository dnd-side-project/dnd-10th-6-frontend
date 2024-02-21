import { NamuiApi } from '@/lib/namui-api'
import { Question } from '@/model/question.entity'
import { UseQueryOptions } from '@tanstack/react-query'

export const getQuestionQuery = (
  nickname: string,
): UseQueryOptions<{ data: Question[] }, Error, Question[]> => ({
  queryKey: ['Question'],
  queryFn: NamuiApi.getQs,
  select: (result) => {
    return result.data.map((item) => ({
      ...item,
      title: item.title.replace('{{userName}}', nickname),
    }))
  },
})
