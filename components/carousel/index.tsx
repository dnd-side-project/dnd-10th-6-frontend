import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react'
import { DotButton } from './carousel.components'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import { useScroll } from 'framer-motion'

interface CarouselProps<T> {
  slides: T[]
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: T, index: number) => ReactNode
}

const Carousel = <T,>({ slides, renderItem }: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
  })

  const scrollX = useScroll({ axis: 'x', container: containerRef })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla],
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollX.scrollXProgress.set(emblaApi.scrollProgress())
    },
    [scrollX.scrollXProgress],
  )

  useEffect(() => {
    if (!embla) return
    onSelect()
    const snap = embla?.scrollSnapList()
    setScrollSnaps(snap)
    embla.on('select', onSelect)
    embla.on('scroll', onScroll)

    return () => {
      embla.off('select', onSelect)
      embla.off('scroll', onScroll)
    }
  }, [embla, setScrollSnaps, onSelect, onScroll])

  return (
    <>
      <div className="relative mx-auto">
        <div className="overflow-hidden" ref={viewportRef}>
          <div className="disabled-select flex" ref={containerRef}>
            {slides.map((item, index) => (
              <div className="flex-[0_0_100%]" key={index}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
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
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          )
        })}
      </div>
    </>
  )
}

export default Carousel
