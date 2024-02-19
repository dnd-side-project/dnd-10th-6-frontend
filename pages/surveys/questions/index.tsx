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

  const fetchQuestionMockData = {
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
        title:
          '{{userName}}님에게<br/><b>가장 중요한 것</b>은 무엇일 것 같나요?',
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
