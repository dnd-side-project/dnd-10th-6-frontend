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

export type DashboardType =
  | 'BAR_CHART'
  | 'BINARY'
  | 'BUBBLE_CHART'
  | 'MONEY'
  | 'RANK'

export type BEST_WORTH = {
  // TODO: 대시보드타입 변경예정
  dashboardType: 'BUBBLE_CHART'
  questionId: string
  rank: Rank[]
}
export type HAPPY_OR_SAD = {
  dashboardType: BarChartType
  questionId: string
  rank: Rank[]
  questionTitle: string
}

// export type Statistic =
//   | {
//       dashboardType: BarChartType | 'MONEY'
//       rank?: Rank[]
//       friendly?: boolean
//       similar?: boolean
//       mbti?: boolean
//       busy?: boolean
//       peopleCount?: number
//       moneySum?: number
//       entireAverage?: number
//       average?: number
//       characters?: CHARACTER_ITEMS[]
//       questionId: string
//     }
//   | CHARACTER_TYPE
//   | BEST_WORTH
//   | HAPPY_OR_SAD
// Rank 타입 정의
export interface Rank {
  legend: string
  percentage: number
}

// 개별 타입 정의
export interface BinaryChartType {
  dashboardType: 'BINARY'
  questionId: string
  questionTitle: string
  questionName: string
  percentage: number
}

export interface MoneyChartType {
  dashboardType: 'MONEY'
  questionId: string
  questionTitle: string
  questionName: string
  peopleCount: number
  average: number
  entireAverage: number
}

export interface BubbleChartType {
  dashboardType: 'BUBBLE_CHART'
  questionId: string
  questionTitle: string
  questionName: string
  rank: Rank[]
}

export interface BarChartType {
  dashboardType: 'BAR_CHART'
  questionId: string
  questionTitle: string
  questionName: string
  rank: Rank[]
}

export interface RankChart {
  dashboardType: 'RANK'
  questionId: string
  questionTitle: string
  questionName: string
  rank: RankChartRank[]
}

export interface RankChartRank {
  text: string
  point: number
  percentage: number
}

// 다형성 타입 Statistic 정의
export type Statistic =
  | BinaryChartType
  | MoneyChartType
  | BubbleChartType
  | BarChartType
  | RankChart

// <Section>
// <KnowAbout wikiType={wikiType} />
// </Section>
// {/* 가장 중요한 것 - 파이차트 */}
// <Section>
// <BubbleChart wikiType={wikiType} filter={selectedFilter} />
// </Section>
// {/* 이런사람이에요 - 박스 */}
// <Section>
// <Character filter={selectedFilter} wikiType={wikiType} />
// </Section>
// <Section>
// <Money filter={selectedFilter} wikiType={wikiType} />
// </Section>
// {/* 기쁠 떄 */}
// <Section>
// <BarChart
//   filter={selectedFilter}
//   wikiType={wikiType}
//   chartType="HAPPY"
// />
// </Section>
// <Section>
// <BarChart
//   filter={selectedFilter}
//   wikiType={wikiType}
//   chartType="SAD"
// />
// </Section>
