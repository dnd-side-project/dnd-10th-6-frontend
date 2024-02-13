import OnBoard from '@/components/onboard'
import Cookie from 'js-cookie'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  return (
    <OnBoard
      onStartClick={() => {
        Cookie.set('namui-init', new Date().toLocaleString())
        router.replace('/')
      }}
    />
  )
}

export default Page

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  if (isViewOnboard) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }
  return { props: {} }
}) satisfies GetServerSideProps
