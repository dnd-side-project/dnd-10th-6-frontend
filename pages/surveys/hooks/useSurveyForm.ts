import { useForm } from 'react-hook-form'

export interface FormValues {
  name: string
  knowingRoute: string
  knowingPeriod: string
}

const useSurveyForm = () => {
  return useForm<FormValues>({
    defaultValues: {
      name: '',
      knowingRoute: '',
      knowingPeriod: '',
    },
  })
}

export default useSurveyForm
