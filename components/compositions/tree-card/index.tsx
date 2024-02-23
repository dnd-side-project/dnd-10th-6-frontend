import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'

import { useEffect, useState } from 'react'
interface TreeCardProps {
  period: string
  relation: string
  isFlipped: boolean 
  onClick: () => void 
}


const TreeCard = ({ period, relation, isFlipped, onClick }: TreeCardProps) => {
  const userName = '이친구'

  const treeType = new TreeType(treeCardAsset)
  const handleCardClick = () => {
    onClick() 
  }
  return (
    <>
      <div
        className={cn('w-[70px] h-[80px] cursor-pointer relative')}
        onClick={handleCardClick}
      >
        <div
          className={`card flex justify-center border rounded-md w-full bg-relation-${relation.toLowerCase()} ${isFlipped ? 'flipped' : ''}`}
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
              <span className="">{userName}</span>
              <Link className="pointer-events-none z-10" href="/garden">
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
