import { Option } from './option.entity'
export type QuestionType =
  | 'OX'
  | 'NUMERIC_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'SHORT_ANSWER'
export interface Question {
  id: string
  title: string
  name: string
  type: QuestionType
  dashboardType: string
  surveyOrder: number
  options: Option[]
}
