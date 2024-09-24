import { UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query'
import { NamuiApi } from '@/lib/namui-api'
import { WikiType } from '@/types'
import { GetSurveyResponse } from '@/model/survey.entity'
import { Period, Relation } from '@/model/card.entity'

export const getSurveyQuery = (
  pageNo: number,
  wikitype: WikiType,
): UseInfiniteQueryOptions<GetSurveyResponse, Error> => ({
  initialPageParam: 0,
  getNextPageParam: (page) => {
    return page.data.totalPage - 1 <= page.data.page
      ? undefined
      : page.data.page + 1
  },
  queryKey: ['survey', pageNo],
  queryFn: ({ pageParam = 0 }) =>
    NamuiApi.getSurveys(pageParam as number, wikitype),
})

export interface SurveyByIdResponse {
  data: Survey
}

export interface Survey {
  senderName: string
  period: Period
  relation: Relation
  createdAt: string
  questionAndAnswers: QuestionAndAnswer[]
}

export interface QuestionAndAnswer {
  questionName: string
  answer: Answer
  questionTitle: string
  reason?: string
}

export interface Answer {
  text: string
  value: string | unknown | boolean
  optionName: string
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

export interface WritingListResponse {
  data: WritingList
}

export interface WritingList {
  content: Writing[]
  page: number
  size: number
  totalPage: number
  totalCount: number
}

export interface Writing {
  surveyId: string
  relation: Relation
  period: Period
  senderName: string
  sentAt: string
  wikiType: WikiType
}
