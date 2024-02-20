import First from '@/components/compositions/question/First'
import createFunnel from '@/components/funnel/createFunnel'
import { FunnelProvider } from '@/contexts/useFunnelContext'
import { ReactNode } from 'react'
import useQuestionForm from '../hooks/useQuestionsForm'
import { FormProvider } from 'react-hook-form'
import Second from '@/components/compositions/question/Second'
import Third from '@/components/compositions/question/Third'

const { Funnel, Step, useFunnel } = createFunnel(['1번', '2번', '3번'] as const)

const Page = () => {
  const { step, toPrevStep, toNextStep } = useFunnel()

  const questionForm = useQuestionForm()

  return (
    <>
      <FunnelProvider
        value={{
          toPrevStep,
          toNextStep,
        }}
      >
        <FormProvider {...questionForm}>
          <Funnel step={step}>
            <Step
              name="1번"
              onEnter={() => {
                //프로그래스바 진척도
              }}
            >
              <First />
            </Step>

            <Step
              name="2번"
              onEnter={() => {
                //프로그래스바 진척도
              }}
            >
              <Second />
            </Step>

            <Step
              name="3번"
              onEnter={() => {
                //프로그래스바 진척도
              }}
            >
              <Third />
            </Step>
          </Funnel>
        </FormProvider>
      </FunnelProvider>
    </>
  )
}

Page.getLayout = (page: ReactNode) => page
export default Page
