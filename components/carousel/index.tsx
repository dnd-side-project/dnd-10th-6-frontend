import type { ReactNode, PropsWithChildren } from 'react'
import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react'
import { UseEmblaCarouselType } from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import {
  MotionValue,
  useTransform,
  m,
  circOut,
  LazyMotion,
  domAnimation,
  useScroll,
} from 'framer-motion'
import { fadeInProps } from '@/variants'
import { cn } from '@/lib/client/utils'

interface CarouselProps<T> {
  className?: string
  itemClass?: string
  emblaRef: UseEmblaCarouselType
  slides: T[]
  renderItem: (item: T, index: number) => ReactNode
  onSlideSelect?: (index: number) => void
}

const Carousel = <T,>({
  slides,
  renderItem,
  className,
  itemClass,
  emblaRef,
  onSlideSelect,
}: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportRef, embla] = emblaRef

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
        <div className="flex grow flex-col overflow-hidden" ref={viewportRef}>
          <div
            className="disabled-select relative flex h-full grow"
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

export const DotButton = ({
  index,
  scrollX,
  maxLength,
  onClick,
}: {
  index: number
  maxLength: number
  scrollX: MotionValue<number>
  onClick: () => void
}) => {
  const inputRange = useMemo(
    () => [
      (index - 1) / (maxLength - 1),
      index / (maxLength - 1),
      (index + 1) / (maxLength - 1),
    ],
    [index, maxLength],
  )

  const x = useTransform(scrollX, inputRange, [6, 20, 6], {
    clamp: true,
    ease: circOut,
  })
  const backgroundColor = useTransform(scrollX, inputRange, [
    'rgba(17,17,17,0.2)',
    'rgba(0,188,104,1)',
    'rgba(17,17,17,0.2)',
  ])

  return (
    <m.button
      style={{ width: x, backgroundColor }}
      className="mx-[3px] flex h-[6px] origin-center items-center rounded-full"
      type="button"
      onClick={onClick}
    />
  )
}

export const PrevButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean
  onClick: () => void
}) => (
  <button onClick={onClick} disabled={!enabled}>
    <svg viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
)

export const NextButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean
  onClick: () => void
}) => (
  <button onClick={onClick} disabled={!enabled}>
    <svg viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
)

interface AnimatedOpacityProps {
  className?: string
  index: number
  maxLength: number
  scrollX: MotionValue<number>
}

export const AnimatedOpacity = ({
  children,
  index,
  maxLength,
  scrollX,
  className,
}: PropsWithChildren<AnimatedOpacityProps>) => {
  const inputRange = useMemo(
    () => [
      (index - 1) / (maxLength - 1),
      index / (maxLength - 1),
      (index + 1) / (maxLength - 1),
    ],
    [index, maxLength],
  )

  const opacity = useTransform(scrollX, inputRange, [0, 1, 0], {
    ease: circOut,
  })

  return (
    <m.div style={{ opacity }} className={cn('flex-[0_0_100%]', className)}>
      {children}
    </m.div>
  )
}
