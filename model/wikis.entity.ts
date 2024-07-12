export interface Wiki {
  wikiType: string
  name: string
  description: string
  questionCount: number
  answerCount: number | null
}

export interface NamuiResponse {
  wikiList: Wiki[]
}
