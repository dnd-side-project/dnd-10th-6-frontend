import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'

import { useEffect, useState } from 'react'

interface TreeCardProps {
  period: string
  relation: string
}

const TreeCard = ({ period, relation }: TreeCardProps) => {
  const userName = '이친구'

  const [isFlipped, setIsFlipped] = useState(false)
  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  useEffect(() => {
    const resetRestCards = () => {
      setIsFlipped(false)
    }
    resetRestCards()
  }, [period, relation])

  const treeType = new TreeType(treeCardAsset)

  return (
    <>
      <div
        className={cn('z-10 w-[70px] h-[80px] cursor-pointer relative')}
        onClick={handleCardClick}
      >
        <div
          className={`card flex justify-center  border rounded-md w-full bg-period-${relation.toLowerCase()} ${isFlipped ? 'flipped' : ''} `}
        >
          <div
            className={cn(
              'card-front m-auto w-full flex flex-col justify-center items-center z-10 ',
            )}
          >
            <div className="max-w-[50px] flex flex-col justify-center items-center mt-3">
              {treeType.render(period as Period, relation as Relation)}
            </div>
          </div>
          <div className="card-back px-y w-full flex flex-col justify-center items-center ">
            <div className="w-full flex flex-col space-y-2 justify-center items-center m-auto">
              <span className="">{userName}</span>
              <Link className='pointer-events-none z-10'
               href="/garden">
                <button className="underline text-caption2 " onClick={() => {}}>
                  자세히보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TreeCard
