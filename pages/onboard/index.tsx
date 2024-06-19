import OnBoard from '@/components/situations/onboard'
import { NamuiApi } from '@/lib/namui-api'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const Page = () => {
  const router = useRouter()
  const checkInit = async () => {
    await NamuiApi.initOnBoard()
    router.replace('/')
  }
  return <OnBoard onStartClick={checkInit} />
}

Page.getLayout = (page: ReactNode) => {
  return page
}
export default Page

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  if (isViewOnboard) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true,
      },
    }
  }
  return { props: {} }
}) satisfies GetServerSideProps
