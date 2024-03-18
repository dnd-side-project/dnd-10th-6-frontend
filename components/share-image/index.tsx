import { toBlob } from 'html-to-image'
import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

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

interface ShareImageProps {}

const ShareImage = ({ children }: PropsWithChildren<ShareImageProps>) => {
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

  useEffect(() => {
    const handleShare = () => {
      if (ref.current === null) {
        return
      }
      toBlob(ref.current)
        .then((blob) => {
          if (typeof window === 'undefined' || !blob) return
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
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = url
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
      setIsRendered({ mounted: false })
    }
    handleShare()
  }, [ref.current, isRendered.mounted])
  return (
    <ShareImageContext.Provider value={{ shareImage: handleShareImage }}>
      {children}
      {isRendered.mounted && (
        <div className="sr-only">
          <div
            ref={ref}
            className="absolute flex justify-center items-center w-[750px] h-[1334px] bg-white"
          >
            <div className="flex flex-col px-[30px] py-12  items-center justify-center text-center space-y-12 shadow-chat-bubble rounded-md">
              <h1>
                하아얀님은
                <br />
                기쁠 때 취미생활을 즐겨요
              </h1>
              {isRendered.icon}
              {isRendered.type}
            </div>
          </div>
        </div>
      )}
    </ShareImageContext.Provider>
  )
}

export default ShareImage
