import { NamuiApi } from '@/lib/namui-api'
import { GetSurveyResponse } from '@/model/survey.entity'
import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query'

export const getSurveyQuery = (
  pageNo: number,
): UseInfiniteQueryOptions<GetSurveyResponse, Error> => ({
  initialPageParam: 0,
  getNextPageParam: (page) => {
    return page.data.totalPage <= page.data.page
      ? undefined
      : page.data.page + 1
  },
  queryKey: ['survey', pageNo],
  queryFn: ({ pageParam = 0 }) => NamuiApi.getSurveys(pageParam as number),
})

export interface SurveyByIdResponse {
  data: Data
}

export interface Data {
  senderName: any
  period: string
  relation: string
  createdAt: string
  questionAndAnswers: QuestionAndAnswer[]
}

export interface QuestionAndAnswer {
  questionTitle: string
  text: string
  value: string
  reason?: string
}

export const getSurveyByIdQuery = (
  id: string,
): UseQueryOptions<
  SurveyByIdResponse,
  Error,
  SurveyByIdResponse,
  [string, string]
> => ({
  queryKey: ['survey', id],
  queryFn: ({ queryKey }) => NamuiApi.getSurveyById(queryKey[1]),
})
