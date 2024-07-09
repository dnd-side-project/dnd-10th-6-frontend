import React, { ReactNode } from 'react'
import { Inputbox } from '@/components/ui'

const Pages = () => {
  return (
    <div className="flex h-screen items-center px-3">
      <Inputbox placeholder="디폴트" />
    </div>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default Pages
