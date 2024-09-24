import { useInViewRef } from '@/hooks/use-in-view-ref'
import { useAnimation } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Writing } from '@/queries/surveys'
import { CardType } from '@/model/card.entity'
import { PeriodBadge, RelationBadge } from '@/components/badge'
import { PropswithWikiType } from '@/types'
const variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
}

const WriteListCard = ({
  item,
  wikiType,
}: PropswithWikiType<{ item: Writing }>) => {
  const controls = useAnimation()
  const { ref, inView } = useInViewRef<HTMLDivElement>()

  const createdAt = useMemo(() => {
    const parsedCreatedAt = new Date(item.sentAt)
    return `${parsedCreatedAt.getFullYear()}.${parsedCreatedAt.getMonth() + 1}.${parsedCreatedAt.getDate()}`
  }, [])
  const treeType = useRef(new CardType(wikiType)).current
  useEffect(() => {
    if (inView) {
      controls.start('show')
    }
  }, [controls, inView])
  return (
    <motion.div
      variants={variants}
      ref={ref}
      className="flex justify-between space-x-4 py-5"
    >
      <div
        className={`flex h-[48px] w-[48px] items-center justify-center rounded-full ${CardType.getBgColorClassName(wikiType, item.relation)}`}
      >
        {treeType.render(item.period, item.relation)}
      </div>

      <div className="flex grow flex-col space-y-2">
        <h3 className="text-body1-bold">{item.senderName}님</h3>
        <div className="flex space-x-1.5">
          <PeriodBadge period={item.period} />
          <RelationBadge wikiType={wikiType} relation={item.relation} />
        </div>
      </div>
      <div className="self-end text-body3-medium text-text-sub-gray76">
        {createdAt}
      </div>
    </motion.div>
  )
}

export default WriteListCard
