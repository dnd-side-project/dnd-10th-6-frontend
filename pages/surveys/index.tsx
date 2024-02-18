import { FormProvider } from 'react-hook-form'
import BaseLayout from '@/layout/base-layout'
import createFunnel from '@/components/funnel/createFunnel'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import InputName from '@/components/form-contents/InputName'
import InputKnowing from '@/components/form-contents/InputKnowing'
import useSurveyForm from './hooks/useSurveyForm'

const { Funnel, Step, useFunnel } = createFunnel([
  'inputName',
  'knowing',
] as const)

const Page = () => {
  const { step, toPrevStep, toNextStep } = useFunnel()

  const form = useSurveyForm()

  return (
    <>
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
    </>
  )
}

Page.getLayout = () => {
  //eslint-disable-next-line
  const { toPrevStep } = useFunnel()
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
      <Page />
    </BaseLayout>
  )
}
export default Page
