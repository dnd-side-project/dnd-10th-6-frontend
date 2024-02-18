import { UseInViewOptions, useInView } from 'framer-motion'
import { useRef } from 'react'

export const useInViewRef = <T extends HTMLElement>(
  options?: UseInViewOptions,
) => {
  const htmlRef = useRef<T>(null)
  const inView = useInView(htmlRef, options)

  return {
    ref: htmlRef,
    inView,
  }
}
