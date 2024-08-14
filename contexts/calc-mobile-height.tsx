import { useCallback } from 'react'
import { useBrowserLayoutEffect } from '@/lib/client/utils'

const CalcMobileHeight = () => {
  const handleResize = useCallback(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  useBrowserLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return <></>
}

export default CalcMobileHeight
