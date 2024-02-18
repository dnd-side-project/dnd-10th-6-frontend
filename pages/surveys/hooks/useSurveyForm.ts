import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const period = [
  '',
  'ALL',
  'SIX_MONTHS',
  'ONE_YEAR',
  'FOUR_YEARS',
  'INFINITE',
] as const

export const route = [
  '',
  'ALL',
  'ELEMENTARY_SCHOOL',
  'MIDDLE_AND_HIGH_SCHOOL',
  'UNIVERSITY',
  'WORK',
  'SOCIAL',
  'ETC',
] as const

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: '2-6자로 입력해주세요' })
    .max(6, { message: '2-6자로 입력해주세요' }),
  knowingRoute: z.enum(route),
  knowingPeriod: z.enum(period),
})

export type FormValues = z.infer<typeof FormSchema>

const useSurveyForm = () => {
  return useForm<FormValues>({
    defaultValues: {
      name: '',
      knowingRoute: '',
      knowingPeriod: '',
    },
    resolver: zodResolver(FormSchema),
  })
}

export default useSurveyForm
