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

const QuestionSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      type: z.enum([...questionType]),
      dashboardType: z.enum([...dashboardType]),
      surveyOrder: z.number(),
      options: z.array(
        z.object({
          id: z.string(),
          value: z.string(),
          text: z.string(),
        }),
      ),
    }),
  ),
})

export type QuestionValues = z.infer<typeof QuestionSchema>

const QsSchema = z.object({
  firstQuestion: z.string().min(1, { message: '필수임' }),
  firstReason: z.string().min(1, { message: '필수임' }),
  secondQuestion: z.string().min(1, { message: '필수임' }),
  secondReason: z.string().min(1, { message: '필수임' }),
})

export type QsSchemaType = z.infer<typeof QsSchema>

const useQuestionForm = () => {
  return useForm<QsSchemaType>({
    defaultValues: {
      firstQuestion: '',
      firstReason: '',
      secondQuestion: '',
      secondReason: '',
    },
    resolver: zodResolver(QsSchema),
  })
}

export default useQuestionForm
