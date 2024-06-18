import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const period = ['SIX_MONTHS', 'ONE_YEAR', 'FOUR_YEARS', 'INFINITE'] as const

const relation = [
  'ELEMENTARY_SCHOOL',
  'MIDDLE_AND_HIGH_SCHOOL',
  'UNIVERSITY',
  'WORK',
  'SOCIAL',
  'ETC',
] as const

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
  owner: z.string().uuid(),
  senderName: z.string().min(2).max(6),
  period: z.enum(period),
  relation: z.enum(relation),
  answers: z.array(
    z.object({
      id: z.string(),
      questionId: z.string(),
      type: z.enum(['OPTION', 'MANUAL']),
      answer: z.string().min(1).or(z.number()),
      reason: z.string().optional(),
    }),
  ),
})

export type QsSchemaType = z.infer<typeof QsSchema>

const useQuestionForm = (
  options?: Parameters<typeof useForm<QsSchemaType>>[0],
) => {
  return useForm<QsSchemaType>({
    defaultValues: { answers: [] },
    resolver: zodResolver(QsSchema),
    ...options,
  })
}

export default useQuestionForm
