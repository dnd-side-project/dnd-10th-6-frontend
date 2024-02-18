import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  name: z.string().min(2).max(6),
  knowingRoute: z.string(),
  knowingPeriod: z.string(),
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
