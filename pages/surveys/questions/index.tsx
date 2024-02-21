import { ReactNode, useMemo, useState } from 'react'
import { Variants, motion, useAnimate } from 'framer-motion'
import { FormProvider, SubmitHandler, useFormContext } from 'react-hook-form'

import { FunnelProvider } from '@/contexts/useFunnelContext'
import createFunnel from '@/components/funnel/createFunnel'
import useQuestionForm from '../hooks/useQuestionsForm'

import { QUESTION_MAX } from '@/constants'
import ProgressBar from '@/components/progressbar'
import Button from '@/components/button'
import FormLayout from '@/layout/form-layout'
import OXQuestion from '@/components/compositions/question/OXQuestion'
import ManualQuestion from '@/components/compositions/question/\bManualQuestion'
import { TreeSvg } from '@/pages/assets/questionTrees'
import FinishQuestion from '@/components/compositions/question/FinishQuestion'

const { Funnel, Step, useFunnel } = createFunnel([
  '1번',
  '2번',
  '3번',
  '4번',
  '5번',
  '6번',
  '7번',
  '8번',
  '9번',
  '10번',
  '11번',
  '12번',
  '13번',
  '14번',
] as const)

const questionMockData = {
  data: [
    {
      id: '65d3156916f83528d804fadb',
      title: '{{userName}}님은<br/><b>사람들과 빨리 친해지는 편</b>인가요?',
      type: 'OX',
      dashboardType: 'CHARACTER',
      surveyOrder: 1,
      options: [
        {
          id: '65d3156916f83528d804fac7',
          value: '🙅‍♂️  아니요, 시간이 걸리는 편이에요',
          text: '🙅‍♂️  아니요, 시간이 걸리는 편이에요',
        },
        {
          id: '65d3156916f83528d804fac6',
          value: '🙆‍♂️ 네, 그러는 편이에요.',
          text: '🙆‍♂️ 네, 그러는 편이에요.',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fadc',
      title: '{{userName}}님은<br/><b>나와 비슷한 성향</b>인가요?',
      type: 'OX',
      dashboardType: 'CHARACTER',
      surveyOrder: 2,
      options: [
        {
          id: '65d3156916f83528d804fac8',
          value: '🙅‍♂️  아니요, 나와 달라요',
          text: '🙅‍♂️  아니요, 나와 달라요',
        },
        {
          id: '65d3156916f83528d804fac6',
          value: '🙆‍♂️ 네, 그러는 편이에요.',
          text: '🙆‍♂️ 네, 그러는 편이에요.',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fadd',
      title: '{{userName}}님은<br/><b>MBTI에 과몰입하는 편</b>인가요?',
      type: 'OX',
      dashboardType: 'CHARACTER',
      surveyOrder: 3,
      options: [
        {
          id: '65d3156916f83528d804fac9',
          value: '🙅‍♂️  아니요, 몰입하지 않아요',
          text: '🙅‍♂️  아니요, 몰입하지 않아요',
        },
        {
          id: '65d3156916f83528d804fac6',
          value: '🙆‍♂️ 네, 그러는 편이에요.',
          text: '🙆‍♂️ 네, 그러는 편이에요.',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fade',
      title: '{{userName}}님은<br/><b>주말마다 약속이 있는 편</b>인가요?',
      type: 'OX',
      dashboardType: 'CHARACTER',
      surveyOrder: 4,
      options: [
        {
          id: '65d3156916f83528d804faca',
          value: '🙅‍♂️  아니요, 안 그러는 편이에요',
          text: '🙅‍♂️  아니요, 안 그러는 편이에요',
        },
        {
          id: '65d3156916f83528d804fac6',
          value: '🙆‍♂️ 네, 그러는 편이에요.',
          text: '🙆‍♂️ 네, 그러는 편이에요.',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fadf',
      title: '{{userName}}님에게<br/><b>가장 중요한 것</b>은 무엇일 것 같나요?',
      type: 'MULTIPLE_CHOICE',
      dashboardType: 'BEST_WORTH',
      surveyOrder: 5,
      options: [
        {
          id: '65d3156916f83528d804facc',
          value: '❤️  사랑',
          text: '❤️  사랑',
        },
        {
          id: '65d3156916f83528d804facb',
          value: '💵  돈',
          text: '💵  돈',
        },
        {
          id: '65d3156916f83528d804face',
          value: '🧑‍🤝‍🧑  우정',
          text: '🧑‍🤝‍🧑  우정',
        },
        {
          id: '65d3156916f83528d804facd',
          value: '👨🏼‍⚖️  명예',
          text: '👨🏼‍⚖️  명예',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fae0',
      title: '{{userName}}님은<br/><b>기쁠 때 어떤 행동</b>을 할 것 같나요?',
      type: 'MULTIPLE_CHOICE',
      dashboardType: 'HAPPY',
      surveyOrder: 6,
      options: [
        {
          id: '65d3156916f83528d804fad2',
          value: '🍱  맛있는 음식을 먹는다',
          text: '🍱  맛있는 음식을 먹는다',
        },
        {
          id: '65d3156916f83528d804fad1',
          value: '🏄🏼  취미생활을 즐긴다',
          text: '🏄🏼  취미생활을 즐긴다',
        },
        {
          id: '65d3156916f83528d804fad0',
          value: '🎉  사람들에게 알리고 축하받는다',
          text: '🎉  사람들에게 알리고 축하받는다',
        },
        {
          id: '65d3156916f83528d804facf',
          value: '👏  혼자 조용히 즐긴다',
          text: '👏  혼자 조용히 즐긴다',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fae1',
      title:
        '{{userName}}님은<br/><b>슬프거나 화날 때 어떤 행동</b>을 할 것 같나요?',
      type: 'MULTIPLE_CHOICE',
      dashboardType: 'SAD',
      surveyOrder: 7,
      options: [
        {
          id: '65d3156916f83528d804fad4',
          value: '🙏  사람들에게 조언을 구한다',
          text: '🙏  사람들에게 조언을 구한다',
        },
        {
          id: '65d3156916f83528d804fad3',
          value: '😭  혼자 끙끙 앓는다',
          text: '😭  혼자 끙끙 앓는다',
        },
        {
          id: '65d3156916f83528d804fad6',
          value: '🚴🏼  스트레스를 풀기 위해 여가생활을 즐긴다',
          text: '🚴🏼  스트레스를 풀기 위해 여가생활을 즐긴다',
        },
        {
          id: '65d3156916f83528d804fad5',
          value: '🙌  사람들의 위로와 공감을 원한다',
          text: '🙌  사람들의 위로와 공감을 원한다',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fae2',
      title: '{{userName}}님에게<br/><b>얼마까지</b> 빌려줄 수 있나요?',
      type: 'NUMERIC_CHOICE',
      dashboardType: 'MONEY',
      surveyOrder: 8,
      options: [
        {
          id: '65d3156916f83528d804fada',
          value: 1000000,
          text: '💵  100만 원',
        },
        {
          id: '65d3156916f83528d804fad9',
          value: 100000,
          text: '💵  10만 원',
        },
        {
          id: '65d3156916f83528d804fad8',
          value: 1000,
          text: '💰  1,000원',
        },
        {
          id: '65d3156916f83528d804fad7',
          value: 0,
          text: '💸  0원',
        },
      ],
    },
    {
      id: '65d3156916f83528d804fae3',
      title:
        '{{userName}}님을<br/><b>처음 만났을 때 어떤 사람</b>으로 보였나요?',
      type: 'SHORT_ANSWER',
      dashboardType: 'NONE',
      surveyOrder: 9,
      options: [],
    },
    {
      id: '65d3156916f83528d804fae4',
      title: '{{userName}}님을<br/><b>5글자(떠오르는 단어)로 표현</b>한다면?',
      type: 'SHORT_ANSWER',
      dashboardType: 'NONE',
      surveyOrder: 10,
      options: [],
    },
    {
      id: '65d3156916f83528d804fae5',
      title: '{{userName}}님의<br/><b>이런점은 꼭 배우고 싶어요!</b>',
      type: 'SHORT_ANSWER',
      dashboardType: 'NONE',
      surveyOrder: 11,
      options: [],
    },
    {
      id: '65d3156916f83528d804fae6',
      title: '{{userName}}님이<br/><b>가장 많이 사용하는 단어는?</b>',
      type: 'SHORT_ANSWER',
      dashboardType: 'NONE',
      surveyOrder: 12,
      options: [],
    },
    {
      id: '65d3156916f83528d804fae7',
      title:
        '{{userName}}님이<br/><b>혼자 몰래 좋아하고 있는 것</b>은 무엇일까요?',
      type: 'SHORT_ANSWER',
      dashboardType: 'NONE',
      surveyOrder: 13,
      options: [],
    },
    {
      id: '65d3156916f83528d804fae8',
      title:
        '{{userName}}님을 보면<br/><b>어떤 캐릭터(연예인)</b>이 떠오르나요?',
      type: 'SHORT_ANSWER',
      dashboardType: 'NONE',
      surveyOrder: 14,
      options: [],
    },
  ],
}

export type QSMockDataType = (typeof questionMockData)['data'][number]

const stepTextVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
}

const Page = () => {
  const { step, toPrevStep, toNextStep } = useFunnel()

  const [stepRef, animate] = useAnimate()

  const goPrev = async () => {
    toPrevStep()
    await animate(stepRef.current, stepTextVariants.initial, {
      ease: 'easeInOut',
      type: 'tween',
    })
    await animate(stepRef.current, stepTextVariants.exit, { duration: 0 })
    await animate(stepRef.current, stepTextVariants.animate, {
      ease: 'easeInOut',
      type: 'tween',
    })
  }
  const goNext = async () => {
    toNextStep()
    await animate(stepRef.current, stepTextVariants.exit, {
      ease: 'easeInOut',
      type: 'tween',
    })
    await animate(stepRef.current, stepTextVariants.initial, { duration: 0 })
    await animate(stepRef.current, stepTextVariants.animate, {
      ease: 'easeInOut',
      type: 'tween',
    })
  }
  const [progress, setProgress] = useState<{ current: number; max: number }>({
    current: 0,
    max: QUESTION_MAX,
  })

  const questionForm = useQuestionForm()

  // const { handleSubmit } = useFormContext<QSMockDataType>()
  // const onSubmit: SubmitHandler<QSMockDataType> = (data) => {
  //   console.log(data)
  // }

  const stepText = useMemo(() => `${step.replace('번', '')}`, [step])

  return (
    <FormLayout
      header={{
        leftIcon: (
          <svg
            className="w-5 h-5"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.6187 23.6187C18.277 23.9604 17.723 23.9604 17.3813 23.6187L8.38128 14.6187C8.21719 14.4546 8.125 14.2321 8.125 14C8.125 13.7679 8.21719 13.5454 8.38128 13.3813L17.3813 4.38128C17.723 4.03957 18.277 4.03957 18.6187 4.38128C18.9604 4.72299 18.9604 5.27701 18.6187 5.61872L10.2374 14L18.6187 22.3813C18.9604 22.723 18.9604 23.277 18.6187 23.6187Z"
              fill="#111111"
            />
          </svg>
        ),
        options: {
          onBackClick() {
            goPrev()
          },
        },
      }}
      title={
        <div className="flex items-center overflow-hidden text-brand-main-green400 ">
          <motion.p
            className="w-4 flex justify-center items-center"
            ref={stepRef}
          >
            {stepText}
          </motion.p>
          <p className="px-1">/ {QUESTION_MAX}</p>
        </div>
      }
      button={
        <Button
          disabled={false}
          onClick={step === '14번' ? handleSubmit(onSubmit) : goNext}
          className="w-full"
        >
          {step === '14번' ? '제출하기' : '다음'}
        </Button>
      }
      content={
        <FunnelProvider
          value={{
            toPrevStep: goPrev,
            toNextStep: goNext,
          }}
        >
          <ProgressBar {...progress} />

          <FormProvider {...questionForm}>
            <Funnel step={step}>
              <Step
                name="1번"
                onEnter={() => {
                  setProgress({ current: 1, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[0]}
                  questionKey="firstQuestion"
                />
              </Step>

              <Step
                name="2번"
                onEnter={() => {
                  setProgress({ current: 2, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[1]}
                  questionKey="secondQuestion"
                />
              </Step>

              <Step
                name="3번"
                onEnter={() => {
                  setProgress({ current: 3, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[2]}
                  questionKey="thirdQuestion"
                />
              </Step>

              <Step
                name="4번"
                onEnter={() => {
                  setProgress({ current: 4, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[3]}
                  questionKey="fourthQuestion"
                />
              </Step>
              <Step
                name="5번"
                onEnter={() => {
                  setProgress({ current: 5, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[4]}
                  questionKey="fifthQuestion"
                />
              </Step>
              <Step
                name="6번"
                onEnter={() => {
                  setProgress({ current: 6, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[5]}
                  questionKey="sixthQuestion"
                />
              </Step>
              <Step
                name="7번"
                onEnter={() => {
                  setProgress({ current: 7, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[6]}
                  questionKey="seventhQuestion"
                />
              </Step>
              <Step
                name="8번"
                onEnter={() => {
                  setProgress({ current: 8, max: QUESTION_MAX })
                }}
              >
                <OXQuestion
                  data={questionMockData.data[7]}
                  questionKey="eighthQuestion"
                />
              </Step>
              <Step
                name="9번"
                onEnter={() => {
                  setProgress({ current: 9, max: QUESTION_MAX })
                }}
              >
                <ManualQuestion
                  data={questionMockData.data[8]}
                  questionKey="ninthQuestion"
                  img={TreeSvg.nine}
                />
              </Step>
              <Step
                name="10번"
                onEnter={() => {
                  setProgress({ current: 10, max: QUESTION_MAX })
                }}
              >
                <ManualQuestion
                  data={questionMockData.data[9]}
                  questionKey="tenthQuestion"
                  img={TreeSvg.ten}
                />
              </Step>
              <Step
                name="11번"
                onEnter={() => {
                  setProgress({ current: 11, max: QUESTION_MAX })
                }}
              >
                <ManualQuestion
                  data={questionMockData.data[10]}
                  questionKey="eleventhQuestion"
                  img={TreeSvg.eleven}
                />
              </Step>

              <Step
                name="12번"
                onEnter={() => {
                  setProgress({ current: 12, max: QUESTION_MAX })
                }}
              >
                <ManualQuestion
                  data={questionMockData.data[11]}
                  questionKey="twelfthQuestion"
                  img={TreeSvg.twelve}
                />
              </Step>
              <Step
                name="13번"
                onEnter={() => {
                  setProgress({ current: 13, max: QUESTION_MAX })
                }}
              >
                <ManualQuestion
                  data={questionMockData.data[12]}
                  questionKey="thirteenthQuestion"
                  img={TreeSvg.thirteen}
                />
              </Step>
              <Step
                name="14번"
                onEnter={() => {
                  setProgress({ current: 14, max: QUESTION_MAX })
                }}
              >
                <ManualQuestion
                  data={questionMockData.data[13]}
                  questionKey="fourteenthQuestion"
                  img={TreeSvg.fourteen}
                />
              </Step>
            </Funnel>
          </FormProvider>
        </FunnelProvider>
      }
    />
  )
}

Page.getLayout = (page: ReactNode) => page
export default Page
