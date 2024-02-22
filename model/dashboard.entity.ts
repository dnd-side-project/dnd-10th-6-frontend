export interface DashboardResponse {
  data?: DashboardData
}

export interface DashboardData {
  statistics: Statistic[]
}

export interface Statistic {
  dashboardType: string
  rank?: Rank[]
  friendly?: boolean
  similar?: boolean
  mbti?: boolean
  busy?: boolean
  peopleCount?: number
  moneySum?: number
  average?: number
}

export interface Rank {
  legend: string
  percentage: number
}
