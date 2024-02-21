import OnBoard from '@/components/onboard'
import Cookie from 'js-cookie'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const Page = () => {
  const router = useRouter()
  return (
    <OnBoard
      onStartClick={() => {
        Cookie.set('namui-init', new Date().toLocaleString(), {
          secure: false,
          sameSite: 'None',
          expires: Infinity,
          path: '/',
        })
        router.replace('/')
      }}
    />
  )
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
