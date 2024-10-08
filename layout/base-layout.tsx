import React, { PropsWithChildren, forwardRef } from 'react'
import LocalFont from 'next/font/local'
import { cn } from '@/lib/client/utils'
import { HTMLMotionProps, motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
import Header, { HeaderProps } from '@/components/header'

const pretendard = LocalFont({
  adjustFontFallback: 'Arial',
  src: [
    {
      path: '../pages/assets/fonts/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../pages/assets/fonts/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../pages/assets/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../pages/assets/fonts/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--font-base',
})

const tossFace = LocalFont({
  adjustFontFallback: 'Arial',
  src: [
    {
      path: '../pages/assets/fonts/TossFaceFontMac.ttf',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--font-toss',
})

interface BaseLayoutProps {
  showHeader?: boolean
  header?: HeaderProps
  className?: string
  framer?: HTMLMotionProps<'main'>
}

const BaseLayout = forwardRef<HTMLElement, PropsWithChildren<BaseLayoutProps>>(
  ({ className, children, header, showHeader = true, framer }, ref) => {
    return (
      <motion.main
        ref={ref}
        {...fadeInProps}
        {...framer}
        className={cn(
          tossFace.variable,
          tossFace.className,
          pretendard.variable,
          pretendard.className,
          'flex w-full flex-col scrollbar-hide',
          className,
        )}
      >
        {showHeader && <Header {...header} bodyRef={ref} />}
        {children}
      </motion.main>
    )
  },
)
BaseLayout.displayName = 'BaseLayout'

export default BaseLayout
