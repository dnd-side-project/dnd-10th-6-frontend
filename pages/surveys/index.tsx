import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import BaseLayout from '@/layout/base-layout'
import createFunnel from '@/components/funnel/createFunnel'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import InputName from '@/components/form-contents/InputName'
import InputKnowing from '@/components/form-contents/InputKnowing'

const { Funnel, Step, useFunnel } = createFunnel(['inputName', 'knowing'])

interface FormValues {
  name: string
  knowingPath: string
  knowingPeriod: string
}

const Page = () => {
  const { step, toPrevStep, toNextStep } = useFunnel()

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      knowingPath: '',
      knowingPeriod: '',
    },
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data.name)
    console.log(data.knowingPath)
    console.log(data.knowingPeriod)
  }

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.log(errors)
  }

  return (
    <>
      <FunnelProvider
        value={{
          toPrevStep,
          toNextStep,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormProvider {...form}>
            <Funnel step={step}>
              <Step
                name="inputName"
                onEnter={() => {
                  console.log('inputName')
                }}
              >
                <InputName />
              </Step>
              <Step
                name="knowing"
                onEnter={() => {
                  console.log('knowing')
                }}
              >
                <InputKnowing />
              </Step>
            </Funnel>
          </FormProvider>
        </form>
      </FunnelProvider>
    </>
  )
}

Page.getLayout = () => {
  return (
    <BaseLayout showHeader={true}>
      <Page />
    </BaseLayout>
  )
}
export default Page
