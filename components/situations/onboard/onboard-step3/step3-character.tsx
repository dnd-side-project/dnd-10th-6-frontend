import { m, LazyMotion, domAnimation } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { FilterType } from '@/hooks/use-filter'
import { CHARACTER_NAMES, CHARACTER_TYPE } from '@/model/dashboard.entity'
import { useMemo } from 'react'

const characterMap = {
  busy: [
    {
      emoji: '🛌',
      top: '주말마다',
      bottom: '집에서 쉬는 편',
    },
    {
      emoji: '🕐',
      top: '주말마다',
      bottom: '약속이 있는 편',
    },
  ],
  friendly: [
    { emoji: '🫢', top: '친해지는데', bottom: '시간이 걸리는 편' },
    { emoji: '🤗', top: '사람들과', bottom: '빨리 친해지는 편' },
  ],
  mbti: [
    {
      emoji: '🙅‍♂️',
      top: 'MBTI에',
      bottom: '몰입하지 않는 편',
    },
    {
      emoji: '🧐',
      top: 'MBTI에 ',
      bottom: '과몰입하는 편',
    },
  ],
  similar: [
    {
      emoji: '🙅‍♂️',
      top: '답변자들과',
      bottom: '다른 성향',
    },
    {
      emoji: '🙆‍♂️',
      top: '답변자들과',
      bottom: '비슷한 성향',
    },
  ],
}

const statistics: CHARACTER_TYPE = {
  dashboardType: 'CHARACTER',
  characters: [
    {
      name: 'PERSONALITY_TYPE',
      value: false,
      questionId: '65d8f7b8c934b525dd04755a',
    },
    {
      name: 'MBTI_IMMERSION',
      value: false,
      questionId: '65d8f7b8c934b525dd04755b',
    },
    {
      name: 'WEEKEND_COMMITMENTS',
      value: false,
      questionId: '65d8f7b8c934b525dd04755c',
    },
    {
      name: 'FRIENDLINESS_LEVEL',
      value: false,
      questionId: '65d8f7b8c934b525dd047559',
    },
  ],
}
const Step3Character = ({}: { filter: FilterType }) => {
  return (
    <LazyMotion features={domAnimation}>
      <div>
        <CharacterInfo statisics={statistics} />
      </div>
    </LazyMotion>
  )
}

export default Step3Character

const cardPickingVariants = {
  initial: {
    rotateX: '40deg',
    scale: 0.3,
  },
  picking: {
    rotateX: '0deg',
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
    },
  },
}

function CharacterInfo({ statisics }: { statisics: CHARACTER_TYPE }) {
  const { inView, ref } = useInViewRef<HTMLDivElement>({ once: true })
  const parsedStatistics = useMemo(() => {
    if (!statisics?.characters?.length) return null
    return Object.fromEntries(
      statisics.characters.map((item) => {
        return [item.name, { value: item.value, questionId: item.questionId }]
      }),
    ) as {
      [key in CHARACTER_NAMES]: {
        value: boolean
        questionId: string
      }
    }
  }, [statisics])
  return (
    <>
      <h2 className="mb-[1.5vb] text-start text-[1.6vb] font-bold">
        김디엔님은 이런사람이에요
      </h2>
      <m.div
        ref={ref}
        {...fadeInProps}
        animate={inView ? fadeInProps.animate : {}}
        variants={{
          ...fadeInProps.variants,
          animate: {
            ...fadeInProps.variants?.animate,
            perspective: '1000px',
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="mt-[0.5vb] grid grid-cols-2 gap-[0.4vb]"
      >
        <CharacterBlock
          emoji={
            characterMap.friendly[
              +Boolean(parsedStatistics?.FRIENDLINESS_LEVEL.value)
            ]?.emoji
          }
          topText={
            characterMap.friendly[
              +Boolean(parsedStatistics?.FRIENDLINESS_LEVEL.value)
            ]?.top
          }
          bottomText={
            characterMap.friendly[
              +Boolean(parsedStatistics?.FRIENDLINESS_LEVEL.value)
            ]?.bottom
          }
          href="/"
        />
        <CharacterBlock
          emoji={
            characterMap.similar[
              +Boolean(parsedStatistics?.PERSONALITY_TYPE.value)
            ]?.emoji
          }
          topText={
            characterMap.similar[
              +Boolean(parsedStatistics?.PERSONALITY_TYPE.value)
            ]?.top
          }
          bottomText={
            characterMap.similar[
              +Boolean(parsedStatistics?.PERSONALITY_TYPE.value)
            ]?.bottom
          }
          href="/"
        />
        <CharacterBlock
          emoji={
            characterMap.mbti[+Boolean(parsedStatistics?.MBTI_IMMERSION.value)]
              ?.emoji
          }
          topText={
            characterMap.mbti[+Boolean(parsedStatistics?.MBTI_IMMERSION.value)]
              ?.top
          }
          bottomText={
            characterMap.mbti[+Boolean(parsedStatistics?.MBTI_IMMERSION.value)]
              ?.bottom
          }
          href="/"
        />
        <CharacterBlock
          emoji={
            characterMap.busy[
              +Boolean(parsedStatistics?.WEEKEND_COMMITMENTS.value)
            ]?.emoji
          }
          topText={
            characterMap.busy[
              +Boolean(parsedStatistics?.WEEKEND_COMMITMENTS.value)
            ]?.top
          }
          bottomText={
            characterMap.busy[
              +Boolean(parsedStatistics?.WEEKEND_COMMITMENTS.value)
            ]?.bottom
          }
          href="/"
        />
      </m.div>
    </>
  )
}

function CharacterBlock({
  emoji,
  bottomText,
  topText,
}: {
  emoji: string
  topText: string
  bottomText: string
  href: string
}) {
  const { inView, ref } = useInViewRef<HTMLDivElement>({ once: true })

  return (
    <m.div
      ref={ref}
      variants={cardPickingVariants}
      animate={inView ? cardPickingVariants.picking : {}}
      className="bg-bg-gray1 flex aspect-[160/210] flex-col rounded-[1.2vb] px-[1vb] py-[1.2vb] text-text-main-black11"
    >
      <h3 className="flex-[0.8] text-start text-[1.8vb]">{emoji}</h3>
      <div className="flex flex-1 flex-col gap-y-[0.4vb] text-start">
        <p className="flex-1 text-[1.2vb]">
          {topText}
          <br />
          <b className="text-[1.2vb] font-bold">{bottomText}</b>
        </p>
      </div>
    </m.div>
  )
}
