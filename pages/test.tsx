import Button from '@/components/button'
import BaseLayout from '@/layout/base-layout'
import { cn } from '@/lib/client/utils'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/situations/loading'
import OnboardStep1 from '@/components/situations/onboard/onboard-step1'

const Pages = () => {
  const router = useRouter()
  return (
    <>
      <OnboardStep1 />
    </>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default Pages
