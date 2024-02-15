import WriterLanding from '@/components/writer-landing'
import { ReactNode } from 'react'

const Page = () => {
  return (
    <div>
      <h1>Surveys</h1>
      <WriterLanding onNonMemberClick={() => {}} />
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return page
}

export default Page
