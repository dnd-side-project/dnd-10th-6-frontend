import { m, LazyMotion, domAnimation } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { useSession } from '@/provider/session-provider'
import { FilterType } from '@/hooks/use-filter'
import { useQuery } from '@tanstack/react-query'
import { getDashboardQuery } from '@/queries/dashboard'
import { CHARACTER_NAMES, CHARACTER_TYPE } from '@/model/dashboard.entity'
import { useMemo } from 'react'
import Link from 'next/link'

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

const Character = ({ filter }: { filter: FilterType }) => {
  const { data: statisics, isLoading } = useQuery({
    ...getDashboardQuery(filter),
    select(data) {
      return data.data?.statistics.find(
        (item) => item.dashboardType === 'CHARACTER',
      ) as CHARACTER_TYPE
    },
  })

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
    <LazyMotion features={domAnimation}>
      <div>
        {isLoading || !parsedStatistics ? (
          <>
            <div className="skeleton h-8 w-3/4 text-mainTitle2-bold font-bold" />
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="!skeleton flex aspect-[160/210] flex-col rounded-2xl px-5 py-6 text-text-main-black11" />
              <div className="!skeleton flex aspect-[160/210] flex-col rounded-2xl px-5 py-6 text-text-main-black11" />
              <div className="!skeleton flex aspect-[160/210] flex-col rounded-2xl px-5 py-6 text-text-main-black11" />
              <div className="!skeleton flex aspect-[160/210] flex-col rounded-2xl px-5 py-6 text-text-main-black11" />
            </div>
          </>
        ) : (
          <CharacterInfo statisics={parsedStatistics} />
        )}
      </div>
    </LazyMotion>
  )
}

export default Character

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
type ParsedStatistics = {
  [key in CHARACTER_NAMES]: {
    value: boolean
    questionId: string
  }
}

function CharacterInfo({ statisics }: { statisics: ParsedStatistics }) {
  const { data } = useSession()
  const { inView, ref } = useInViewRef<HTMLDivElement>({ once: true })

  return (
    <>
      <h2 className="text-mainTitle2-bold">
        {data?.user?.name ?? ''}님은 이런사람이에요
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
        className="mt-5 grid grid-cols-2 gap-4"
      >
        <CharacterBlock
          emoji={
            characterMap.friendly[+Boolean(statisics.FRIENDLINESS_LEVEL.value)]
              ?.emoji
          }
          topText={
            characterMap.friendly[+Boolean(statisics.FRIENDLINESS_LEVEL.value)]
              ?.top
          }
          bottomText={
            characterMap.friendly[+Boolean(statisics.FRIENDLINESS_LEVEL.value)]
              ?.bottom
          }
          href={`?id=${statisics.FRIENDLINESS_LEVEL.questionId}&type=TWO_CHOICE`}
        />
        <CharacterBlock
          emoji={
            characterMap.similar[+Boolean(statisics.PERSONALITY_TYPE.value)]
              ?.emoji
          }
          topText={
            characterMap.similar[+Boolean(statisics.PERSONALITY_TYPE.value)]
              ?.top
          }
          bottomText={
            characterMap.similar[+Boolean(statisics.PERSONALITY_TYPE.value)]
              ?.bottom
          }
          href={`?id=${statisics.PERSONALITY_TYPE.questionId}&type=TWO_CHOICE`}
        />
        <CharacterBlock
          emoji={
            characterMap.mbti[+Boolean(statisics.MBTI_IMMERSION.value)]?.emoji
          }
          topText={
            characterMap.mbti[+Boolean(statisics.MBTI_IMMERSION.value)]?.top
          }
          bottomText={
            characterMap.mbti[+Boolean(statisics.MBTI_IMMERSION.value)]?.bottom
          }
          href={`?id=${statisics.MBTI_IMMERSION.questionId}&type=TWO_CHOICE`}
        />
        <CharacterBlock
          emoji={
            characterMap.busy[+Boolean(statisics.WEEKEND_COMMITMENTS.value)]
              ?.emoji
          }
          topText={
            characterMap.busy[+Boolean(statisics.WEEKEND_COMMITMENTS.value)]
              ?.top
          }
          bottomText={
            characterMap.busy[+Boolean(statisics.WEEKEND_COMMITMENTS.value)]
              ?.bottom
          }
          href={`?id=${statisics.WEEKEND_COMMITMENTS.questionId}&type=TWO_CHOICE`}
        />
      </m.div>
    </>
  )
}

function CharacterBlock({
  emoji,
  bottomText,
  href,
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
      className="bg-bg-gray1 flex aspect-[160/210] flex-col rounded-2xl px-5 py-6 text-text-main-black11"
    >
      <h3 className="flex-1 text-3xl">{emoji}</h3>
      <div className="flex flex-1 flex-col gap-y-4">
        <p className="flex-1 text-body1-medium">
          {topText}
          <br />
          <b className="text-body1-bold">{bottomText}</b>
        </p>
        <Link
          className="text-xs leading-4 text-text-main-black11 underline underline-offset-2"
          href={href}
        >
          자세히 보기
        </Link>
      </div>
    </m.div>
  )
}
