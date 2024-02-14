import { type ClassValue, clsx } from 'clsx'
import { useLayoutEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useBrowserLayoutEffect = process.browser
  ? useLayoutEffect
  : () => {}
