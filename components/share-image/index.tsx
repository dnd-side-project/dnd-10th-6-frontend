import { toBlob } from 'html-to-image'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Button from '../button'
import { useSession } from '@/provider/session-provider'
import { parseShareCardItems } from './constants'
import { Period, Relation, TreeType, treeCardAsset } from '@/model/tree.entity'
import { cn } from '@/lib/client/utils'
import Drawer from '../ui/drawer'

type TWO_CHOICE =
  | 'FRIENDLINESS_LEVEL'
  | 'PERSONALITY_TYPE'
  | 'MBTI_IMMERSION'
  | 'WEEKEND_COMMITMENTS'

type MULTIPLE_CHOICE =
  | 'CORE_VALUE'
  | 'HAPPY_BEHAVIOR'
  | 'SAD_ANGRY_BEHAVIOR'
  | 'BORROWING_LIMIT'

type QS_NAMES = MULTIPLE_CHOICE | TWO_CHOICE

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

interface ShareImageContextType {
  imageProps?: ShareImageProps | null
  showShareImage: (props: ShareImageProps | null) => void
}
interface ShareImageProps {
  questionName: QS_NAMES
  period: Period
  relation: Relation
  senderName: string
  reason: string
  value: any
}

export const ShareImageContext = createContext<ShareImageContextType>({
  imageProps: null,
  showShareImage(props) {},
})

type ShareType = 'COPY' | 'DOWNLOAD'

export const ShareImageProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ShareImageContextType>({
    showShareImage: (props) => {},
    imageProps: null,
  })

  return (
    <ShareImageContext.Provider
      value={{
        imageProps: state.imageProps,
        showShareImage: (props) =>
          setState((prev) => ({ ...prev, imageProps: props })),
      }}
    >
      {children}
    </ShareImageContext.Provider>
  )
}

export const ShareImage = ({
  questionName,
  senderName,
  period,
  relation,
  reason,
  value,
}: ShareImageProps) => {
  const { data } = useSession()

  const ref = useRef<HTMLDivElement>(null)

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
  }

  return (
    <>
      <div className="flex justify-center h-calc-h bg-gradient-to-b from-[#CEF9BA] to-[#58C594] px-10">
        <div className="rounded-3xl py-10 px-6 bg-white flex flex-col h-fit grow mt-20">
          <div className="flex flex-col text-center space-y-[6px]">
            <h1 className="text-subTitle2-medium text-text-main-black11">
              {data?.user?.name}님은
            </h1>
            {
              parseShareCardItems[
                questionName as keyof typeof parseShareCardItems
              ][+value].title
            }
            <div className="flex justify-center pt-8 pb-12">
              {
                parseShareCardItems[
                  questionName as keyof typeof parseShareCardItems
                ][+value].icon
              }
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
          className="flex items-center justify-center h-calc-h bg-gradient-to-b from-[#CEF9BA] to-[#58C594] w-[var(--section-width,100%)] px-10"
        >
          <div className="rounded-3xl py-10 px-6 bg-white flex flex-col h-fit grow">
            <div className="flex flex-col text-center space-y-[6px]">
              <h1 className="text-subTitle2-medium text-text-main-black11">
                {data?.user?.name}님은
              </h1>
              {
                parseShareCardItems[
                  questionName as keyof typeof parseShareCardItems
                ][+value].title
              }
              <div className="flex justify-center pt-8 pb-12">
                {
                  parseShareCardItems[
                    questionName as keyof typeof parseShareCardItems
                  ][+value].icon
                }
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

export const ShareImageDrawer = () => {
  const context = useContext(ShareImageContext)
  if (!context) throw new Error('ShareImageContext')
  const { showShareImage, imageProps } = context
  return (
    <Drawer
      header={{
        showHeader: false,
        options: {
          onBackClick() {},
          showRight: false,
        },
      }}
      open={!!imageProps}
      onChangeOpen={(state) => {
        if (!state && imageProps !== null) {
          showShareImage(null)
        }
      }}
      trigger={<></>}
    >
      <div className="absolute top-[14px] left-5 h-14">
        <button onClick={() => showShareImage(null)}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.6187 23.6187C18.277 23.9604 17.723 23.9604 17.3813 23.6187L8.38128 14.6187C8.21719 14.4546 8.125 14.2321 8.125 14C8.125 13.7679 8.21719 13.5454 8.38128 13.3813L17.3813 4.38128C17.723 4.03957 18.277 4.03957 18.6187 4.38128C18.9604 4.72299 18.9604 5.27701 18.6187 5.61872L10.2374 14L18.6187 22.3813C18.9604 22.723 18.9604 23.277 18.6187 23.6187Z"
              fill="#111111"
            />
          </svg>
        </button>
      </div>
      {imageProps && (
        <ShareImage
          questionName={imageProps.questionName}
          period={imageProps.period}
          relation={imageProps.relation}
          senderName={imageProps.senderName}
          reason={imageProps.reason}
          value={imageProps.value}
        />
      )}
    </Drawer>
  )
}
