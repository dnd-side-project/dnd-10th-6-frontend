import { ReactNode } from 'react'
import BaseLayout from '@/layout/base-layout'
import withAuth from '@/layout/HOC/with-auth'
const Pages = () => {
  return (
    <>
      <BaseLayout showHeader={false}>
        {/* 카드 작업 하는중 플립 ~ */}
      </BaseLayout>
    </>
  )
}

Pages.getLayout = (page: ReactNode) => page

export default withAuth(Pages)
