import { QsSchemaType } from '@/hooks/useQuestionsForm'
import { NamuiApi } from '@/lib/namui-api'
import { Question } from '@/model/question.entity'
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

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

export const submitQuestionMutaion = (
  option: UseMutationOptions<null, Error, QsSchemaType>,
): UseMutationOptions<null, Error, QsSchemaType> => ({
  mutationKey: ['submit', 'question'],
  mutationFn: NamuiApi.submitSurvey,
  gcTime: 1000 * 60 * 60 * 24,
  ...option,
})
