import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { useLayoutEffect } from 'react'
import { fontSize } from '@/constants'

export const twm = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': Object.keys(fontSize).map((item) => 'text-' + item),
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twm(clsx(inputs))
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

export const shareToKaKaoLink = async (url: string) => {
  kakaoInit()
  window.Kakao?.Share.sendCustom({
    templateId: parseInt(process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID),
    templateArgs: {
      SURVEY_PATH: url,
    },
  })
}
export const shareToCopyLink = async (url?: string) => {
  if (typeof window === 'undefined') return
  if (navigator?.share) {
    try {
      navigator.share({
        // url: url ?? window.location.origin,
        title: 'namuiwiki | 남의위키',
        text: url ?? window.location.origin,
      })
    } catch (_) {
      await navigator.clipboard?.writeText(url ?? window.location.origin)
    }
  } else {
    await navigator.clipboard?.writeText(url ?? window.location.origin)
  }
  return true
}
