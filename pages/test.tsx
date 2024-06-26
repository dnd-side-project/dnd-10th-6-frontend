import React, { ReactNode } from 'react'
import OnboardStep1 from '@/components/situations/onboard/onboard-step1'

const Pages = () => {
  return (
    <>
      <OnboardStep1 />
    </>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default Pages
