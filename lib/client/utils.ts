import { WikiType } from './../../types'
import * as React from 'react'
import { useLayoutEffect } from 'react'
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
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

function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent

  // 일반적인 모바일 기기들의 userAgent에 포함되는 문자열 패턴
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

  return mobileRegex.test(userAgent)
}

const TEMPLATE_ID: { [key in WikiType]: number } = {
  NAMUI: 104587,
  ROMANCE: 112542,
}

export const shareToKaKaoLink = async (url: string, wikiType: WikiType) => {
  kakaoInit()
  window.Kakao?.Share.sendCustom({
    templateId: TEMPLATE_ID[wikiType],
    templateArgs: {
      SURVEY_PATH: url,
    },
  })
}
export const shareToCopyLink = async (url?: string) => {
  if (typeof window === 'undefined') return
  if (isMobileDevice() && navigator?.share) {
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

type PossibleRef<T> = React.Ref<T> | undefined

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
// ref 설정 함수
// value가 주어졌을 때 ref의 값에 value를 할당
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null && ref !== undefined) {
    ;(ref as React.MutableRefObject<T>).current = value
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
//
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node))
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}

export { composeRefs, useComposedRefs }
