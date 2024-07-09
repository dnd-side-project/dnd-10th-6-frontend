import { ReactNode } from 'react'
import { QS_NAMES } from '.'
import Image from 'next/image'
import noTakesTime from '@/assets/instagram/no-takes-time.svg'
import yesTakesTime from '@/assets/instagram/yes-takes-time.svg'
import noOpposite from '@/assets/instagram/no-opposite.svg'
import yesOpposite from '@/assets/instagram/yes-opposite.svg'
import noMBTI from '@/assets/instagram/no-mbti.svg'
import yesMBTI from '@/assets/instagram/yes-mbti.svg'
import noBusy from '@/assets/instagram/no-busy.svg'
import yesBusy from '@/assets/instagram/yes-busy.svg'
import honor from '@/assets/instagram/honor.svg'
import money from '@/assets/instagram/money.svg'
import friendship from '@/assets/instagram/friendship.svg'
import love from '@/assets/instagram/love.svg'
import manual from '@/assets/instagram/manual.svg'
import together from '@/assets/instagram/celebrate-with-others.svg'
import hobby from '@/assets/instagram/enjoy-hobbies.svg'
import food from '@/assets/instagram/enjoy-food.svg'
import enjoyManual from '@/assets/instagram/enjoy-manual.svg'
import sufferAlone from '@/assets/instagram/suffer-alone.svg'
import advice from '@/assets/instagram/seek-advice.svg'
import comfort from '@/assets/instagram/seek-comfort.svg'
import leisure from '@/assets/instagram/enjoy-leisure.svg'
import sadManual from '@/assets/instagram/sad-manual.svg'
import borrowingLimit from '@/assets/instagram/borrowing-limit.svg'

export const parseShareCardItems: {
  [key in QS_NAMES]: {
    [key: string]: {
      title: ((answer: string) => ReactNode) | (() => ReactNode)
      icon: ReactNode
    }
  }
} = {
  FRIENDLINESS_LEVEL: {
    NO_TAKES_TIME: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          친해지는데 <b>시간이 걸리는 편</b>
        </h3>
      ),
      icon: <Image src={noTakesTime} alt="noTakesTime" />,
    },
    YES: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          사람들과 <b>빨리 친해지는 편</b>
        </h3>
      ),
      icon: <Image src={yesTakesTime} alt="yesTakesTime" />,
    },
  },
  PERSONALITY_TYPE: {
    NO_OPPOSITE: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          답변자들과 <b>다른 성향</b>
        </h3>
      ),
      icon: <Image src={noOpposite} alt="no-oppo" />,
    },
    SIMILAR_TRAIT: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          사람들과 <b>비슷한 성향</b>
        </h3>
      ),
      icon: <Image src={yesOpposite} alt="yes-oppo" />,
    },
  },
  MBTI_IMMERSION: {
    NO_NOT_FOCUSED: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          MBTI에 <b>몰입하지 않는 편</b>
        </h3>
      ),
      icon: <Image src={noMBTI} alt="noMBTI" />,
    },
    YES: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          MBTI에 <b>과몰입하는 편</b>
        </h3>
      ),
      icon: <Image src={yesMBTI} alt="yesMbti" />,
    },
  },
  WEEKEND_COMMITMENTS: {
    NO_NOT_INCLINED: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          주말마다 <b>집에서 쉬는 편</b>
        </h3>
      ),
      icon: <Image src={noBusy} alt="noBusy" />,
    },
    YES: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          주말마다 <b>약속이 있는 편</b>
        </h3>
      ),
      icon: <Image src={yesBusy} alt="yesBusy" />,
    },
  },
  CORE_VALUE: {
    HONOR: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          가장 중요한 것은 <b>명예</b>이네요
        </h3>
      ),
      icon: <Image src={honor} alt="honor" />,
    },
    MONEY: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          가장 중요한 것은 <b>돈</b>이네요
        </h3>
      ),
      icon: <Image src={money} alt="money" />,
    },
    FRIENDSHIP: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          가장 중요한 것은 <b>우정</b>이네요
        </h3>
      ),
      icon: <Image src={friendship} alt="friendship" />,
    },
    LOVE: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          가장 중요한 것은 <b>사랑</b>이네요
        </h3>
      ),
      icon: <Image src={love} alt="love" />,
    },
    MANUAL: {
      title: (answer: string) => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          가장 중요한 것은 <b>{answer}</b>이네요
        </h3>
      ),
      icon: <Image src={manual} alt="manual" />,
    },
  },
  HAPPY_BEHAVIOR: {
    ENJOY_ALONE: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          기쁠 때 <b>혼자 조용히 즐겨요</b>
        </h3>
      ),
      icon: <Image src={sufferAlone} alt="alone" />,
    },
    CELEBRATE_WITH_OTHERS: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          기쁠 때 <b>사람들에게 알리고 축하받아요</b>
        </h3>
      ),
      icon: <Image src={together} alt="together" />,
    },
    ENJOY_HOBBIES: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          기쁠 때 <b>취미생활을 즐겨요</b>
        </h3>
      ),
      icon: <Image src={hobby} alt="hobby" />,
    },
    ENJOY_FOOD: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          기쁠 때 <b>맛있는 음식을 먹어요</b>
        </h3>
      ),
      icon: <Image src={food} alt="food" />,
    },

    MANUAL: {
      title: (answer: string) => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          기쁠 때 <b>{answer}</b>
        </h3>
      ),
      icon: <Image src={enjoyManual} alt="enjoy-manual" />,
    },
  },
  SAD_ANGRY_BEHAVIOR: {
    SUFFER_ALONE: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          슬프거나 화날 때<br />
          <b>혼자 끙끙 앓아요</b>
        </h3>
      ),
      icon: <Image src={sufferAlone} alt="suffer-alone" />,
    },
    SEEK_ADVICE: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          슬프거나 화날 때 <b>사람들에게 조언을 구해요</b>
        </h3>
      ),
      icon: <Image src={advice} alt="advice" />,
    },
    SEEK_COMFORT: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          슬프거나 화날 때 <b>사람들에게 위로와 공감을 원해요</b>
        </h3>
      ),
      icon: <Image src={comfort} alt="comfort" />,
    },
    ENJOY_LEISURE: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          슬프거나 화날 때 <b>스트레스를 풀기 위해 여가생활을 즐겨요</b>
        </h3>
      ),
      icon: <Image src={leisure} alt="leisure" />,
    },
    MANUAL: {
      title: (answer: string) => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          슬프거나 화날 때 <b>{answer}</b>
        </h3>
      ),
      icon: <Image src={sadManual} alt="sad-manual" />,
    },
  },
  BORROWING_LIMIT: {
    MONEY_1K: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          <b>1,000원</b> 빌려줄 수 있어요
        </h3>
      ),
      icon: <Image src={borrowingLimit} alt="borrowingLimit" />,
    },
    MONEY_0: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          <b>0원</b> 빌려줄 수 있어요
        </h3>
      ),
      icon: <Image src={borrowingLimit} alt="borrowingLimit" />,
    },
    MONEY_1M: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          <b>1,000,000원</b> 빌려줄 수 있어요
        </h3>
      ),
      icon: <Image src={borrowingLimit} alt="borrowingLimit" />,
    },
    MONEY_100K: {
      title: () => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          <b>100,000원</b> 빌려줄 수 있어요
        </h3>
      ),
      icon: <Image src={borrowingLimit} alt="borrowingLimit" />,
    },
    MANUAL_NUMERIC: {
      title: (answer: string) => (
        <h3 className="[&>b]:text-brand-main-green400 text-[22px] leading-[30px]">
          <b>{answer}원</b> 빌려줄 수 있어요
        </h3>
      ),
      icon: <Image src={borrowingLimit} alt="borrowingLimit" />,
    },
  },
}
