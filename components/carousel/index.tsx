import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react'
import { AnimatedOpacity, DotButton } from './carousel.components'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import { LazyMotion, domAnimation, useScroll, m } from 'framer-motion'
import { cn } from '@/lib/client/utils'
import { fadeInProps } from '@/variants'

interface CarouselProps<T> {
  className?: string
  itemClass?: string
  slides: T[]
  renderItem: (item: T, index: number) => ReactNode
  onSlideSelect?: (index: number) => void
}

const Carousel = <T,>({
  slides,
  renderItem,
  className,
  itemClass,
  onSlideSelect,
}: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
  })

  const scrollX = useScroll({ axis: 'x', container: containerRef })

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla],
  )

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollX.scrollXProgress.set(emblaApi.scrollProgress())
    },
    [scrollX.scrollXProgress],
  )
  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      onSlideSelect && onSlideSelect(emblaApi.selectedScrollSnap())
    },
    [onSlideSelect],
  )

  useEffect(() => {
    if (!embla) return
    const snap = embla?.scrollSnapList()
    setScrollSnaps(snap)
    embla.on('scroll', onScroll)
    embla.on('select', onSelect)

    return () => {
      embla.off('select', onSelect)
      embla.off('scroll', onScroll)
    }
  }, [embla, setScrollSnaps, onScroll, onSelect])

  return (
    <LazyMotion features={domAnimation}>
      <m.div className={cn(className)} {...fadeInProps}>
        <div className="overflow-hidden grow flex flex-col" ref={viewportRef}>
          <div
            className="disabled-select flex grow relative"
            ref={containerRef}
          >
            {slides.map((item, index) => (
              <AnimatedOpacity
                className={itemClass}
                index={index}
                maxLength={slides.length}
                scrollX={scrollX.scrollXProgress}
                key={index}
              >
                {renderItem(item, index)}
              </AnimatedOpacity>
            ))}
          </div>
        </div>
        <div className="flex list-none justify-center">
          {scrollSnaps.map((_, index) => {
            return (
              <DotButton
                index={index}
                maxLength={scrollSnaps.length}
                scrollX={scrollX.scrollXProgress}
                key={index}
                onClick={() => scrollTo(index)}
              />
            )
          })}
        </div>
      </m.div>
    </LazyMotion>
  )
}

export default Carousel
