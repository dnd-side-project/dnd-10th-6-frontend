import { Option } from './option.entity'

export interface Question {
  id: string
  title: string
  name: string
  type: string
  dashboardType: string
  surveyOrder: number
  options: Option[]
}
