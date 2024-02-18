import { FormProvider } from 'react-hook-form'
import BaseLayout from '@/layout/base-layout'
import createFunnel from '@/components/funnel/createFunnel'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import InputName from '@/components/form-contents/InputName'
import InputKnowing from '@/components/form-contents/InputKnowing'
import useSurveyForm from './hooks/useSurveyForm'
import { ReactNode } from 'react'

const { Funnel, Step, useFunnel } = createFunnel([
  'inputName',
  'knowing',
] as const)

const Page = () => {
  const { step, toPrevStep, toNextStep } = useFunnel()

  const form = useSurveyForm()

  return (
    <BaseLayout
      showHeader={true}
      header={{
        center: '정보입력',
        options: {
          showRight: false,
          onBackClick: () => toPrevStep(),
        },
      }}
    >
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
    </BaseLayout>
  )
}

Page.getLayout = (page: ReactNode) => page
export default Page
