import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { fadeInProps } from '@/variants'

interface TreeCardProps {
  period: string
  relation: string
  isFlipped: boolean
  onClick: () => void
  id: string
  senderName: string
}

const TreeCard = ({
  id,
  period,
  relation,
  isFlipped,
  senderName,
  onClick,
}: TreeCardProps) => {
  const bgColor = (() => {
    switch (relation) {
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
    }
  })()

  const treeType = useRef(new TreeType(treeCardAsset)).current
  const handleCardClick = () => {
    onClick()
  }

  return (
    <motion.div
      id={id}
      variants={fadeInProps.variants}
      className={cn('w-full aspect-[80/90] cursor-pointer relative')}
      onClick={handleCardClick}
    >
      <div
        className={`card flex justify-center rounded-md w-full ${bgColor} ${isFlipped ? 'flipped' : ''}`}
      >
        <div
          className={cn(
            'card-front m-auto w-full flex flex-col justify-center items-center',
          )}
        >
          <div className="overflow-hidden flex justify-center items-center mt-3 z-0">
            {treeType.render(period as Period, relation as Relation)}
          </div>
        </div>
        <div className="card-back px-y w-full flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col space-y-2 justify-center items-center m-auto">
            <span className="text-body1-bold">{senderName}</span>
            <Link className="z-20" href={`/answers?surveyId=${id}`}>
              <button className="underline text-caption1-medium">
                자세히보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TreeCard
