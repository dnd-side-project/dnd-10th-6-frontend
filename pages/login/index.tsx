import WriterLanding from '@/components/situations/landing'
import { ReactNode } from 'react'

const Page = () => {
  return (
    <div className="flex h-calc-h flex-col px-5 py-4">
      <WriterLanding />
    </div>
  )
}

export default Page

Page.getLayout = (page: ReactNode) => page
