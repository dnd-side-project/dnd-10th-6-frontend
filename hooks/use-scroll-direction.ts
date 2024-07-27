import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export type Direction = 'UP' | 'DOWN'

interface useScrollDirectionOptions<T extends RefObject<HTMLElement>> {
  ref?: T | null
}

const useScrollDirection = <T extends RefObject<HTMLElement>>(
  options?: useScrollDirectionOptions<T>,
) => {
  const { ref } = options ?? {}
  const [direction, setDirection] = useState<Direction>('DOWN')
  const lastScrollTop = useRef(0)

  const handleScroll = useCallback(({ target }: Event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const scrollTop = target?.scrollTop ?? target?.scrollingElement?.scrollTop
    if (typeof scrollTop === 'number') {
      let newDirection: Direction = 'UP'
      if (lastScrollTop.current <= scrollTop) {
        newDirection = 'DOWN'
      }
      setDirection(newDirection)
      lastScrollTop.current = scrollTop
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = ref?.current ?? window
      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, ref])

  return { direction, scrollTop: lastScrollTop.current }
}

export default useScrollDirection
