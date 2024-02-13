import React, { PropsWithChildren } from 'react'
import LocalFont from 'next/font/local'
import { cn } from '@/lib/client/utils'
import Header from '@/components/header'

const pretendard = LocalFont({
  src: '../pages/assets/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-base',
})

const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className={cn(pretendard.variable)}>
      <Header />
      {children}
    </main>
  )
}

export default BaseLayout
