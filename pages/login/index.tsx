import WriterLanding from '@/components/landing/WriterLanding'
import BaseLayout from '@/layout/base-layout'

const Page = () => {
  return <></>
}

Page.getLayout = () => {
  return (
    <BaseLayout showHeader={false}>
      <WriterLanding />
    </BaseLayout>
  )
}

export default Page
