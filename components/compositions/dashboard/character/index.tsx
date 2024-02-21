import Link from 'next/link'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { fadeInProps } from '@/variants'
import { useInViewRef } from '@/hooks/use-in-view-ref'
import { useSession } from '@/provider/session-provider'

const Character = () => {
  const { inView, ref } = useInViewRef<HTMLDivElement>({ once: true })
  const { data } = useSession()

  return (
    <LazyMotion features={domAnimation}>
      <div>
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
          <CharacterBlock
            emoji="🤗"
            topText="사람들과"
            bottomText="빨리 친해지는 편"
            href="/"
          />
          <CharacterBlock
            emoji="🙆‍♂️"
            topText="답변자들과"
            bottomText="비슷한 성향"
            href="/"
          />
          <CharacterBlock
            emoji="🧐"
            topText="MBTI에"
            bottomText="과몰입하는 편"
            href="/"
          />
          <CharacterBlock
            emoji="🕑"
            topText="주말마다"
            bottomText="약속이 있는 편"
            href="/"
          />
        </m.div>
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
