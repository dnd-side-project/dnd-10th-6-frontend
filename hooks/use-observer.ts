import { RefObject, useEffect, useRef, useState } from 'react'
import { InfiniteQueryObserverResult } from '@tanstack/react-query'

interface IuseIntersectionObserverProps<T extends HTMLElement> {
  threshold?: number
  hasNextPage: boolean | undefined
  fetchNextPage: () => Promise<InfiniteQueryObserverResult> | void
  ref?: RefObject<T>
}

export const useIntersectionObserver = <T extends HTMLElement>({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
  ref,
}: IuseIntersectionObserverProps<T>) => {
  const targetRef = useRef<T>(ref?.current ?? null)

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
  }

  useEffect(() => {
    if (!targetRef.current) return

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    })

    observer.observe(targetRef.current)

    return () => {
      if (targetRef?.current) observer.unobserve(targetRef?.current)
    }
  }, [observerCallback, threshold, targetRef])

  return { ref: targetRef }
}
