import { FormProvider } from 'react-hook-form'
import createFunnel from '@/components/funnel/createFunnel'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import InputName from '@/components/compositions/signup-input/InputName'
import InputKnowing from '@/components/compositions/signup-input/InputKnowing'
import useSurveyForm from '../../hooks/useSurveyForm'
import { ReactNode } from 'react'

const { Funnel, Step, useFunnel } = createFunnel([
  'inputName',
  'knowing',
] as const)

const Page = () => {
  const { step, toPrevStep, toNextStep } = useFunnel()

  const form = useSurveyForm()

  return (
    <FunnelProvider
      value={{
        toPrevStep,
        toNextStep,
      }}
    >
      <FormProvider {...form}>
        <Funnel step={step}>
          <Step
            name="inputName"
            onEnter={() => {
              //프로그래스바 진척도
            }}
          >
            <InputName />
          </Step>
          <Step name="knowing" onEnter={() => {}}>
            <InputKnowing />
          </Step>
        </Funnel>
      </FormProvider>
    </FunnelProvider>
  )
}

Page.getLayout = (page: ReactNode) => page
export default Page
