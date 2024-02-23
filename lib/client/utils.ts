import { type ClassValue, clsx } from 'clsx'
import { useLayoutEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMobile = () =>
  typeof window !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
export const useBrowserLayoutEffect = process.browser
  ? useLayoutEffect
  : () => {}

export const kakaoInit = () => {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized()) {
    window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
  }
  return !window.Kakao?.isInitialized()
}

export const shareToKaKaoLink = async () => {
  kakaoInit()
  window.Kakao?.Share.sendCustom({
    templateId: parseInt(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
    templateArgs: {},
  })
}
export const shareToCopyLink = async (url?: string) => {
  if (typeof window === 'undefined') return
  if (navigator?.share) {
    try {
      navigator.share({
        url: window.location.origin,
        title: '남의위키',
        text: '남의위키 공유하기 테스트',
      })
    } catch (err) {
      await navigator.clipboard?.writeText(url ?? window.location.origin)
    }
  } else {
    await navigator.clipboard?.writeText(url ?? window.location.origin)
  }
  return true
}
