import { useInViewRef } from '@/hooks/use-in-view-ref'
import { useAnimation, useInView } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Writing } from '@/queries/surveys'
import PeriodBadge from '@/components/badge/period'
import RelationBadge from '@/components/badge/relation'
import { TreeType, treeCardAsset } from '@/model/tree.entity'
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

const bgColor = (cardItem: Writing) => {
  switch (cardItem.relation) {
    case 'ELEMENTARY_SCHOOL':
      return 'bg-relation-elementary_school'
    case 'MIDDLE_AND_HIGH_SCHOOL':
      return 'bg-relation-middle_and_high_school'
    case 'UNIVERSITY':
      return 'bg-relation-university'
    case 'WORK':
      return 'bg-relation-work'
    case 'SOCIAL':
      return 'bg-relation-social'
    case 'ETC':
      return 'bg-relation-etc'
    default:
      return ''
  }
}

const WriteListCard = ({ item }: { item: Writing }) => {
  const controls = useAnimation()
  const { ref, inView } = useInViewRef<HTMLDivElement>()

  const createdAt = useMemo(() => {
    const parsedCreatedAt = new Date(item.sentAt)
    return `${parsedCreatedAt.getFullYear()}.${parsedCreatedAt.getMonth() + 1}.${parsedCreatedAt.getDate()}`
  }, [])
  const treeType = useRef(new TreeType(treeCardAsset)).current
  useEffect(() => {
    if (inView) {
      controls.start('show')
    }
  }, [controls, inView])
  return (
    <motion.div
      variants={variants}
      ref={ref}
      className="py-5 flex justify-between space-x-4"
    >
      <div
        className={`w-[48px] h-[48px] rounded-full flex justify-center items-center ${bgColor(
          item,
        )}`}
      >
        {treeType.render(item.period, item.relation)}
      </div>

      <div className="flex flex-col grow space-y-2">
        <h3 className="text-body1-bold">{item.senderName}님</h3>
        <div className="flex space-x-1.5">
          <PeriodBadge period={item.period} />
          <RelationBadge relation={item.relation} />
        </div>
      </div>
      <div className="self-end text-body3-medium text-text-sub-gray76">
        {createdAt}
      </div>
    </motion.div>
  )
}

export default WriteListCard
