import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface TreeCardProps {
  period: string
  relation: string
}

const TreeCard = ({ period, relation }: TreeCardProps) => {
  const router = useRouter()
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
        className={cn(
          'z-10 w-[70px] h-[80px] cursor-pointer relative border rounded-md ',
          `bg-period-${period.toLowerCase()}`,
        )}
        onClick={handleCardClick}
      >
        <div className={`card relative ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front z-10 ">
            <div className="max-w-[50px] flex flex-col justify-center items-center">
              {treeType.render(period as Period, relation as Relation)}
            </div>
          </div>
          <div className="card-back">
            <div className="w-full flex flex-col justify-center items-center m-auto">
              <span className="">{userName}</span>
              <span className="underline">
                <button onClick={() => {}}>자세히보기</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TreeCard
