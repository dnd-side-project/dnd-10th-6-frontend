import { QsSchemaType } from '@/hooks/use-questions-form'
import { NamuiApi } from '@/lib/namui-api'
import { Question, QuestionByType, QuestionType } from '@/model/question.entity'
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

export const getQuestionByTypeQuery = (
  type: QuestionType,
): UseQueryOptions<
  QuestionByType,
  Error,
  QuestionByType,
  [string, QuestionType]
> => ({
  queryKey: ['question', type],
  queryFn: ({ queryKey }) => NamuiApi.getQuestionByType(queryKey[1]),
})

export const submitQuestionMutaion = (
  option: UseMutationOptions<null, Error, QsSchemaType>,
): UseMutationOptions<null, Error, QsSchemaType> => ({
  mutationKey: ['submit', 'question'],
  mutationFn: NamuiApi.submitSurvey,
  gcTime: 1000 * 60 * 60 * 24,
  ...option,
})
