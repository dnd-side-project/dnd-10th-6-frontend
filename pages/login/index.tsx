import { ReactNode } from 'react'

const Page = () => {
  return <div className="h-calc-h flex flex-col px-5 py-4"></div>
}

export default Page

Page.getLayout = (page: ReactNode) => page
