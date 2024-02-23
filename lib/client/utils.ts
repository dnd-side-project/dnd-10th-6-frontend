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
    templateArgs: {
      title: '나무로 보는, 남이 써주는 나의 소개서',
      description: '남의위키를 통해 내가 본 친구의 모습을 친구에게 알려주세요.',
    },
  })
}
export const shareToCopyLink = async (url?: string) => {
  if (typeof window === 'undefined') return
  if (navigator?.share) {
    try {
      navigator.share({
        url: window.location.origin,
        title: 'namuiwiki | 남의위키',
        text: '남이 써주는 나의 소개서',
      })
    } catch (err) {
      await navigator.clipboard?.writeText(url ?? window.location.origin)
    }
  } else {
    await navigator.clipboard?.writeText(url ?? window.location.origin)
  }
  return true
}
