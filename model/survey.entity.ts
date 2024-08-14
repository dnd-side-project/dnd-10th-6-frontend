import { Period, Relation } from './card.entity'

export interface GetSurveyResponse {
  data: GetSurveyData
}

export interface GetSurveyData {
  content: Survey[]
  page: number
  size: number
  totalPage: number
  totalCount: number
}

export interface Survey {
  surveyId: string
  relation: Relation
  period: Period
  senderName: string
  senderWikiId: string
}
