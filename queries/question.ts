import { QsSchemaType } from '@/hooks/use-questions-form'
import { NamuiApi } from '@/lib/namui-api'
import { Question, QuestionByType, QuestionType } from '@/model/question.entity'
import { WikiType } from '@/types'
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export const getQuestionQuery = (
  nickname: string,
  wikiType: WikiType,
): UseQueryOptions<{ data: Question[] }, Error, Question[]> => ({
  queryKey: ['Question'],
  queryFn: () => NamuiApi.getQs(wikiType),
  select: (result) => {
    return result.data.map((item) => ({
      ...item,
      title: item.title.replace('{{userName}}', nickname),
    }))
  },
})

export const getQuestionByTypeQuery = (
  type: QuestionType,
  wikiType: WikiType,
): UseQueryOptions<
  QuestionByType,
  Error,
  QuestionByType,
  [string, QuestionType, WikiType]
> => ({
  queryKey: ['question', type, wikiType],
  queryFn: ({ queryKey }) =>
    NamuiApi.getQuestionByType(queryKey[1], queryKey[2]),
})

export const submitQuestionMutaion = (
  option: UseMutationOptions<null, Error, QsSchemaType>,
): UseMutationOptions<null, Error, QsSchemaType> => ({
  mutationKey: ['submit', 'question'],
  mutationFn: NamuiApi.submitSurvey,
  gcTime: 1000 * 60 * 60 * 24,
  ...option,
})
