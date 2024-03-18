import { type ClassValue, clsx } from 'clsx'
import { useLayoutEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMobile = () =>
  typeof window !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
export const useBrowserLayoutEffect = process.browser
  ? useLayoutEffect
  : () => {}

export const kakaoInit = () => {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized()) {
    window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
  }
  return !window.Kakao?.isInitialized()
}

export const shareToKaKaoLink = async (url: string) => {
  kakaoInit()
  window.Kakao?.Share.sendCustom({
    templateId: parseInt(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
    templateArgs: {
      SURVEY_PATH: url,
    },
  })
}
export const shareToCopyLink = async (url?: string) => {
  if (typeof window === 'undefined') return
  if (navigator?.share) {
    try {
      navigator.share({
        // url: url ?? window.location.origin,
        title: 'namuiwiki | 남의위키',
        text: url ?? window.location.origin,
      })
    } catch (err) {
      await navigator.clipboard?.writeText(url ?? window.location.origin)
    }
  } else {
    await navigator.clipboard?.writeText(url ?? window.location.origin)
  }
  return true
}

const parseAnswer = () => {}

// 2지선다
const TWO_CHOICE = [
  'FRIENDLINESS_LEVEL',
  'PERSONALITY_TYPE',
  'MBTI_IMMERSION',
  'WEEKEND_COMMITMENTS',
]

// 다지선다
const MULTIPLE_CHOICE = [
  'CORE_VALUE',
  'HAPPY_BEHAVIOR',
  'SAD_ANGRY_BEHAVIOR',
  'BORROWING_LIMIT',
]
const SHORT_ANSWER = []
// 서술형
null
null
null
null
null
null

const a = {
  data: {
    senderName: '은성',
    period: 'INFINITE',
    relation: 'ELEMENTARY_SCHOOL',
    createdAt: '2024-03-16T22:55:18.954',
    questionAndAnswers: [
      {
        questionTitle:
          '{{userName}}님은<br/><b>사람들과 빨리 친해지는 편</b>인가요?',
        text: '🙆‍♂️ 네, 그러는 편이에요',
        value: true,
        reason: 'FRIENDLINESS_LEVEL',
      },
      {
        questionTitle: '{{userName}}님은<br/><b>어떤 성향</b>인가요?',
        text: '🙆‍♂️ 나와 비슷한 성향이에요',
        value: true,
        reason: 'PERSONALITY_TYPE',
      },
      {
        questionTitle:
          '{{userName}}님은<br/><b>MBTI에 과몰입하는 편</b>인가요?',
        text: '🙆‍♂️ 네, 그러는 편이에요',
        value: true,
        reason: 'MBTI_IMMERSION',
      },
      {
        questionTitle:
          '{{userName}}님은<br/><b>주말마다 약속이 있는 편</b>인가요?',
        text: '🙆‍♂️ 네, 그러는 편이에요',
        value: true,
        reason: 'WEEKEND_COMMITMENTS',
      },
      {
        questionTitle:
          '{{userName}}님에게<br/><b>가장 중요한 것</b>은 무엇일 것 같나요?',
        text: '💵  돈',
        value: '💵  돈',
        reason: 'CORE_VALUE',
      },
      {
        questionTitle:
          '{{userName}}님은<br/><b>기쁠 때 어떤 행동</b>을 할 것 같나요?',
        text: '65d8f7b7c934b525dd04754d',
        value: '65d8f7b7c934b525dd04754d',
        reason: 'HAPPY_BEHAVIOR',
      },
      {
        questionTitle:
          '{{userName}}님은<br/><b>슬프거나 화날 때 어떤 행동</b>을 할 것 같나요?',
        text: 'hello',
        value: 'hello',
        reason: 'SAD_ANGRY_BEHAVIOR',
      },
      {
        questionTitle:
          '{{userName}}님에게<br/><b>얼마까지</b> 빌려줄 수 있나요?',
        text: '0',
        value: 0,
        reason: 'BORROWING_LIMIT',
      },
      {
        questionTitle:
          '{{userName}}님을<br/><b>처음 만났을 때 어떤 사람</b>으로 보였나요?',
        text: 'FIRST_IMPRESSION',
        value: 'FIRST_IMPRESSION',
        reason: null,
      },
      {
        questionTitle: '{{userName}}님을<br/><b>5글자로 표현</b>한다면?',
        text: 'FIVE_LETTER_WORD',
        value: 'FIVE_LETTER_WORD',
        reason: null,
      },
      {
        questionTitle: '{{userName}}님의<br/><b>이런점은 꼭 배우고 싶어요!</b>',
        text: 'LEARNING_ASPIRATION',
        value: 'LEARNING_ASPIRATION',
        reason: null,
      },
      {
        questionTitle: '{{userName}}님이<br/><b>가장 많이 사용하는 단어는?</b>',
        text: 'MOST_USED_WORD',
        value: 'MOST_USED_WORD',
        reason: null,
      },
      {
        questionTitle:
          '{{userName}}님이<br/><b>혼자 몰래 좋아하고 있는 것</b>은 무엇일까요?',
        text: 'SECRET_PLEASURE',
        value: 'SECRET_PLEASURE',
        reason: null,
      },
      {
        questionTitle:
          '{{userName}}님을 보면<br/><b>어떤 캐릭터(연예인)</b>가 떠오르나요?',
        text: 'CHARACTER_CELEBRITY_ASSOCIATION',
        value: 'CHARACTER_CELEBRITY_ASSOCIATION',
        reason: null,
      },
    ],
  },
}
