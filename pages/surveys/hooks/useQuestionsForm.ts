import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const dashboardType = [
  'CHARACTER',
  'BEST_WORTH',
  'HAPPY',
  'SAD',
  'MONEY',
  'NONE',
] as const

export const questionType = [
  'OX',
  'MULTIPLE_CHOICE',
  'SHORT_ANSWER',
  'NUMERIC_CHOICE',
] as const

export interface QuestionFormValueOptionsProps {
  id: string
  value: string
  text: string
}

export interface QuestionFormValuesProps {
  data: {
    id: string
    title: string
    type: string
    dashboardType: string
    surveyOrder: number
    options: QuestionFormValueOptionsProps[]
  }[]
}

const QsSchema = z.object({
  owner: z.string(),
  senderName: z.string(),
  period: z.string(),
  relation: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      type: z.string(),
      answer: z.string(),
      reason: z.string(),
    }),
  ),
})

export type QsSchemaType = z.infer<typeof QsSchema>

const useQuestionForm = () => {
  return useForm<QsSchemaType>({
    defaultValues: {
      owner: '',
      senderName: '',
      period: '',
      relation: '',
      answers: [],
    },
    resolver: zodResolver(QsSchema),
  })
}

export default useQuestionForm
