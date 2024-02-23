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
          'w-[100px] h-[100px] border rounded-md relative',
          `bg-period-${period}`,
        )}
        onClick={handleCardClick}
      >
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front">
         
              {treeType.render(period as Period, relation as Relation)}
            
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
