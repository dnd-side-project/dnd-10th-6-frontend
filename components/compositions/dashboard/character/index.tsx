import Link from 'next/link'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { useSession } from '@/provider/session-provider'
import { FilterType } from '@/hooks/use-filter'
import { useQuery } from '@tanstack/react-query'
import { getDashboardQuery } from '@/queries/dashboard'
import { Statistic } from '@/model/dashboard.entity'

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
      )
    },
  })
  return (
    <LazyMotion features={domAnimation}>
      <div>
        {isLoading || !statisics ? (
          <>
            <div className="text-mainTitle2-bold font-bold h-8 skeleton w-3/4" />
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="px-5 py-6 rounded-2xl text-text-main-black11 flex flex-col aspect-[160/210] !skeleton" />
              <div className="px-5 py-6 rounded-2xl text-text-main-black11 flex flex-col aspect-[160/210] !skeleton" />
              <div className="px-5 py-6 rounded-2xl text-text-main-black11 flex flex-col aspect-[160/210] !skeleton" />
              <div className="px-5 py-6 rounded-2xl text-text-main-black11 flex flex-col aspect-[160/210] !skeleton" />
            </div>
          </>
        ) : (
          <CharacterInfo statisics={statisics} />
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

function CharacterInfo({ statisics }: { statisics: Statistic }) {
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
        className="grid grid-cols-2 gap-4 mt-5"
      >
        {statisics.busy}
        <CharacterBlock
          emoji={characterMap.friendly[+Boolean(statisics.friendly)]?.emoji}
          topText={characterMap.friendly[+Boolean(statisics.friendly)]?.top}
          bottomText={
            characterMap.friendly[+Boolean(statisics.friendly)]?.bottom
          }
          href="/"
        />
        <CharacterBlock
          emoji={characterMap.similar[+Boolean(statisics.similar)]?.emoji}
          topText={characterMap.similar[+Boolean(statisics.similar)]?.top}
          bottomText={characterMap.similar[+Boolean(statisics.similar)]?.bottom}
          href="/"
        />
        <CharacterBlock
          emoji={characterMap.mbti[+Boolean(statisics.mbti)]?.emoji}
          topText={characterMap.mbti[+Boolean(statisics.mbti)]?.top}
          bottomText={characterMap.mbti[+Boolean(statisics.mbti)]?.bottom}
          href="/"
        />
        <CharacterBlock
          emoji={characterMap.busy[+Boolean(statisics.busy)]?.emoji}
          topText={characterMap.busy[+Boolean(statisics.busy)]?.top}
          bottomText={characterMap.busy[+Boolean(statisics.busy)]?.bottom}
          href="/"
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
      className="px-5 py-6 bg-bg-gray1 rounded-2xl text-text-main-black11 flex flex-col aspect-[160/210]"
    >
      <h3 className="text-3xl flex-1">{emoji}</h3>
      <div className="flex flex-col gap-y-4 flex-1">
        <p className="text-body1-medium flex-1">
          {topText}
          <br />
          <b className="text-body1-bold">{bottomText}</b>
        </p>
        <Link
          className="text-xs underline underline-offset-2 leading-4 text-text-main-black11"
          href={href}
        >
          자세히 보기
        </Link>
      </div>
    </m.div>
  )
}
