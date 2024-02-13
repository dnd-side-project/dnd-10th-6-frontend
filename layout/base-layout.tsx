import React, { PropsWithChildren } from 'react'
import LocalFont from 'next/font/local'
import { cn } from '@/lib/client/utils'
import Header from '@/components/header'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'

const pretendard = LocalFont({
  src: '../pages/assets/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-base',
})

interface BaseLayoutProps {
  showHeader?: boolean
}

const BaseLayout = ({
  children,
  showHeader = true,
}: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <motion.main
      {...fadeInProps}
      className={cn(pretendard.variable, pretendard.className, 'flex flex-col')}
    >
      {showHeader && <Header />}
      {children}
    </motion.main>
  )
}

export default BaseLayout
