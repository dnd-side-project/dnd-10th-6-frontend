import { toBlob } from 'html-to-image'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Button from '../button'
import { useSession } from '@/provider/session-provider'
import { parseCardItems } from './constants'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import { cn } from '@/lib/client/utils'

const periods: { [key: string]: string } = {
  SIX_MONTHS: '6개월',
  ONE_YEAR: '6개월-1년',
  FOUR_YEARS: '1년-4년',
  INFINITE: '4년 이상',
}

const relations: {
  [key: string]: string
} = {
  ELEMENTARY_SCHOOL: '초등학교',
  MIDDLE_AND_HIGH_SCHOOL: '중·고등학교',
  UNIVERSITY: '대학교',
  WORK: '직장',
  SOCIAL: '모임',
  ETC: '기타',
}

interface ShareCardProps {
  icon: ReactNode
  type: string
}

interface ShareImageContextType extends Partial<ShareCardProps> {
  shareImage: (cardProps: ShareCardProps) => void
}

export const ShareImageContext = createContext<ShareImageContextType>({
  shareImage: () => {},
})

interface ShareImageProps {
  period: Period
  relation: Relation
  senderName: string
  reason: string
}

type ShareType = 'COPY' | 'DOWNLOAD'

const ShareImage = ({
  senderName,
  period,
  relation,
  reason,
}: ShareImageProps) => {
  const { data } = useSession()
  const [isRendered, setIsRendered] = useState<
    Partial<ShareCardProps> & { mounted: boolean }
  >({
    mounted: false,
  })
  const ref = useRef<HTMLDivElement>(null)

  const handleShareImage = useCallback(
    (cardProps: ShareCardProps) => {
      setIsRendered({ mounted: true, ...cardProps })
    },
    [ref],
  )

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

  const handleShare = (type: ShareType) => () => {
    if (ref.current === null) {
      return
    }
    toBlob(ref.current)
      .then((blob) => {
        if (typeof window === 'undefined' || !blob) return
        switch (type) {
          case 'COPY':
            if (navigator?.share) {
              try {
                navigator.share({
                  files: [
                    new File([blob], 'image.png', {
                      type: blob.type,
                    }),
                  ],
                })
              } catch (err) {
                console.log(err)
              }
            }
            break
          case 'DOWNLOAD':
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.download = `${senderName}_${periods[period]}_${relations[relation]}`
            link.href = url
            link.click()
        }
      })
      .catch((err) => {
        console.log(err)
      })
    setIsRendered({ mounted: false })
  }
  useEffect(() => {}, [ref.current, isRendered.mounted])
  return (
    <>
      <div className="flex justify-center h-calc-h bg-gradient-to-b from-[#CEF9BA] to-[#58C594]">
        <div className="rounded-3xl py-10 px-6 bg-white flex flex-col h-fit mt-20">
          <div className="flex flex-col text-center space-y-[6px]">
            <h1 className="text-subTitle2-medium text-text-main-black11">
              하아얀님은
            </h1>
            {parseCardItems.FRIENDLINESS_LEVEL[0].title}
            <div className="flex justify-center pt-8 pb-12">
              {parseCardItems.FRIENDLINESS_LEVEL[0].icon}
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <div className={cn('w-[34px] h-[34px] rounded-full', bgColor)}>
                  {treeType.render(period as Period, relation as Relation)}
                </div>
                <div>
                  <span className="text-caption1-bold">{senderName}</span>
                  <span className="text-caption1-medium text-text-sub-gray99">
                    &nbsp;/&nbsp;{periods[period]}&nbsp;/&nbsp;
                  </span>
                  <span className="text-caption1-medium text-text-sub-gray99">
                    {relations[relation]}
                  </span>
                </div>
              </div>
              <div className="text-body3-medium px-4 py-3 rounded-lg bg-gray-gray50 text-start text-text-main-black11">
                {reason}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sr-only">
        <div
          ref={ref}
          className="flex items-center justify-center h-calc-h bg-gradient-to-b from-[#CEF9BA] to-[#58C594] w-[var(--section-width,100%)]"
        >
          <div className="rounded-3xl py-10 px-6 bg-white flex flex-col h-fit">
            <div className="flex flex-col text-center space-y-[6px]">
              <h1 className="text-subTitle2-medium text-text-main-black11">
                하아얀님은
              </h1>
              {parseCardItems.FRIENDLINESS_LEVEL[0].title}
              <div className="flex justify-center pt-8 pb-12">
                {parseCardItems.FRIENDLINESS_LEVEL[0].icon}
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={cn('w-[34px] h-[34px] rounded-full', bgColor)}
                  >
                    {treeType.render(period as Period, relation as Relation)}
                  </div>
                  <div>
                    <span className="text-caption1-bold">{senderName}</span>
                    <span className="text-caption1-medium text-text-sub-gray99">
                      &nbsp;/&nbsp;{periods[period]}&nbsp;/&nbsp;
                    </span>
                    <span className="text-caption1-medium text-text-sub-gray99">
                      {relations[relation]}
                    </span>
                  </div>
                </div>
                <div className="text-body3-medium px-4 py-3 rounded-lg bg-gray-gray50 text-start text-text-main-black11">
                  {reason}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-9 flex px-5 w-full space-x-2">
        <Button onClick={handleShare('DOWNLOAD')} className="h-14">
          사진 저장하기
        </Button>
        <Button
          onClick={handleShare('COPY')}
          variant={'muted'}
          className="h-14"
        >
          공유하기
        </Button>
      </div>
    </>
  )
}

export default ShareImage
