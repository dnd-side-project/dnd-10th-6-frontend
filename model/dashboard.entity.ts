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

export type Statistic = {
  dashboardType: 'BEST_WORTH' | 'HAPPY' | 'SAD' | 'CHARACTER' | 'MONEY'
  rank?: Rank[]
  friendly?: boolean
  similar?: boolean
  mbti?: boolean
  busy?: boolean
  peopleCount?: number
  moneySum?: number
  entireAverage?: number
  average?: number
  questionId: string
}

export interface Rank {
  legend: string
  percentage: number

  color?: string
}
