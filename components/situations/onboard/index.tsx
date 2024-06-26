import { Button } from '@/components/ui'
import Carousel from '@/components/carousel'
import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import OnboardStep2 from './onboard-step2'
import OnboardStep3 from './onboard-step3'
import OnboardStep1 from './onboard-step1'

export const onBoardingItems = [
  <OnboardStep1 />,
  <OnboardStep2 />,
  <OnboardStep3 />,
]
interface OnBoardProps {
  onStartClick: () => void
}

const OnBoard = ({ onStartClick }: OnBoardProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [ref, emblaApi] = useEmblaCarousel({
    skipSnaps: false,
  })

  const changeSlideSelect = (emblaCb: EmblaCarouselType) =>
    setSelectedIndex(emblaCb.selectedScrollSnap())

  useBrowserLayoutEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', changeSlideSelect)
      return () => {
        emblaApi.off('select', changeSlideSelect)
      }
    }
  }, [emblaApi])
  return (
    <div className="h-calc-h flex flex-col pb-4 px-5">
      <Carousel
        emblaRef={[ref, emblaApi]}
        className="flex flex-col w-[calc(100%_+_40px)] overflow-hidden -ml-5 pt-[10vb] pb-8 h-full"
        slides={onBoardingItems}
        renderItem={(item) => item}
      />
      <Button
        onClick={
          selectedIndex !== onBoardingItems.length - 1
            ? () => emblaApi?.scrollNext()
            : onStartClick
        }
      >
        {selectedIndex !== onBoardingItems.length - 1 ? '다음' : '시작하기'}
      </Button>
    </div>
  )
}

export default OnBoard
