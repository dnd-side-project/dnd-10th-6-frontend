import { Option } from './option.entity'
export type QuestionType =
  | 'OX'
  | 'NUMERIC_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'SHORT_ANSWER'
  | 'RANK'

export interface Question {
  id: string
  title: string
  name: string
  type: QuestionType
  dashboardType: string
  surveyOrder: number
  options: Option[]
}

export type SHORT_TYPE_LIST =
  | 'MOST_USED_WORD'
  | 'FIRST_IMPRESSION'
  | 'FIVE_LETTER_WORD'
  | 'LEARNING_ASPIRATION'
  | 'SECRET_PLEASURE'
  | 'CHARACTER_CELEBRITY_ASSOCIATION'

export interface QuestionByType {
  data: Daum[]
}

export interface Daum {
  id: string
  title: string
  name: SHORT_TYPE_LIST
  type: string
  reasonRequired: boolean
  dashboardType: string
  surveyOrder: number
  options: unknown[]
}
