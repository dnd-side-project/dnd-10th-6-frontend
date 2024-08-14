import { useRef } from 'react'
import { UseInViewOptions, useInView } from 'framer-motion'

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
