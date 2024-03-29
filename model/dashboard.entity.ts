export interface DashboardResponse {
  data?: DashboardData
}

export interface DashboardData {
  statistics: Statistic[]
}

export type MONEY = {
  dashboardType: 'MONEY'
  peopleCount: number
  average: number
  entireAverage: number
  questionId: string
}

export type CHARACTER_NAMES =
  | 'PERSONALITY_TYPE'
  | 'MBTI_IMMERSION'
  | 'WEEKEND_COMMITMENTS'
  | 'FRIENDLINESS_LEVEL'

export type CHARACTER_ITEMS = {
  name: CHARACTER_NAMES
  value: boolean
  questionId: string
}

export type CHARACTER_TYPE = {
  dashboardType: 'CHARACTER'
  characters: CHARACTER_ITEMS[]
}

export type BEST_WORTH = {
  dashboardType: 'BEST_WORTH'
  questionId: string
  rank: Rank[]
}
export type HAPPY_OR_SAD = {
  dashboardType: 'HAPPY' | 'SAD'
  questionId: string
  rank: Rank[]
}

export type Statistic =
  | {
      dashboardType: 'HAPPY' | 'SAD' | 'MONEY'
      rank?: Rank[]
      friendly?: boolean
      similar?: boolean
      mbti?: boolean
      busy?: boolean
      peopleCount?: number
      moneySum?: number
      entireAverage?: number
      average?: number
      characters?: CHARACTER_ITEMS[]
      questionId: string
    }
  | CHARACTER_TYPE
  | BEST_WORTH
  | HAPPY_OR_SAD

export interface Rank {
  legend: string
  percentage: number

  color?: string
}
