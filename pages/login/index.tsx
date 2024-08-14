import { ReactNode } from 'react'
import WriterLanding from '@/components/situations/landing'

const Page = () => {
  return (
    <div className="flex h-calc-h flex-col px-5 py-4">
      <WriterLanding />
    </div>
  )
}

export default Page

Page.getLayout = (page: ReactNode) => page
