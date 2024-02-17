import React, { PropsWithChildren } from 'react'
import LocalFont from 'next/font/local'
import { cn } from '@/lib/client/utils'
import Header, { HeaderProps } from '@/components/header'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'

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

interface BaseLayoutProps {
  showHeader?: boolean
  header?: HeaderProps
  className?: string
}

const BaseLayout = ({
  className,
  children,
  showHeader = true,
  header,
}: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <motion.main
      {...fadeInProps}
      className={cn(
        pretendard.variable,
        pretendard.className,
        'flex flex-col',
        className,
      )}
    >
      {showHeader && <Header {...header} />}
      {children}
    </motion.main>
  )
}

export default BaseLayout
