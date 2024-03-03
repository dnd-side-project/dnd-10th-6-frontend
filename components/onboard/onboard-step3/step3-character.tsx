import { m, LazyMotion, domAnimation } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { useSession } from '@/provider/session-provider'
import { FilterType } from '@/hooks/use-filter'
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

const statistics: Statistic = {
  dashboardType: 'CHARACTER',
  questionId: '65d8f7b8c934b525dd047566',
  friendly: true,
  similar: true,
  mbti: false,
  busy: true,
}

const Step3Character = ({ filter }: { filter: FilterType }) => {
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

function CharacterInfo({ statisics }: { statisics: Statistic }) {
  const { data } = useSession()
  const { inView, ref } = useInViewRef<HTMLDivElement>({ once: true })

  return (
    <>
      <h2 className="text-start text-[1.6vb] font-bold mb-[1.5vb]">
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
        className="grid grid-cols-2 gap-[0.4vb] mt-[0.5vb]"
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
      className="px-[1vb] py-[1.2vb] bg-bg-gray1 rounded-[1.2vb] text-text-main-black11 flex flex-col aspect-[160/210]"
    >
      <h3 className="text-start text-[1.8vb] flex-[0.8]">{emoji}</h3>
      <div className="text-start flex flex-col gap-y-[0.4vb] flex-1">
        <p className="text-[1.2vb] flex-1">
          {topText}
          <br />
          <b className="text-[1.2vb] font-bold">{bottomText}</b>
        </p>
      </div>
    </m.div>
  )
}
