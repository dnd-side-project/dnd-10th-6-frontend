import { cn } from '@/lib/client/utils'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import Link from 'next/link'
import { useSession } from '@/provider/session-provider'

interface TreeCardProps {
  period: string
  relation: string
  isFlipped: boolean
  onClick: () => void
}

const TreeCard = ({ period, relation, isFlipped, onClick }: TreeCardProps) => {
  const { data } = useSession()
  const userName = data?.user?.name

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

  const treeType = new TreeType(treeCardAsset)
  const handleCardClick = () => {
    onClick()
  }

  return (
    <>
      <div
        className={cn('w-[80px] h-[90px] cursor-pointer relative')}
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
              <span className="text-body1-bold">{userName}</span>
              <Link className="z-20" href="/answers">
                <button
                  className="underline text-caption1-medium"
                >
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
