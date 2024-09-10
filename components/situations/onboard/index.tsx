import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { Button } from '@/components/ui'
import Carousel from '@/components/carousel'
import OnboardStep2 from './onboard-step2'
import OnboardStep3 from './onboard-step3'
import OnboardStep1 from './onboard-step1'
import OnboardStep4 from './onobard-step4'
import OnboardStep5 from './onboard-step5'

export const onBoardingItems = [
  <OnboardStep1 key="onboarding-step1" />,
  <OnboardStep2 key="onboarding-step2" />,
  <OnboardStep3 key="onboarding-step3" />,
  <OnboardStep4 key="onboarding-step4" />,
  <OnboardStep5 key="onboarding-step5" />,
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
    <div className="flex h-calc-h flex-col px-5 pb-4">
      <Carousel
        emblaRef={[ref, emblaApi]}
        className="-ml-5 flex h-full w-[calc(100%_+_40px)] flex-col overflow-hidden pb-8 pt-[10vb]"
        slides={onBoardingItems}
        renderItem={(item) => item}
      />
      <Button
        variant="BG-brand"
        className="bg-pink-600"
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
