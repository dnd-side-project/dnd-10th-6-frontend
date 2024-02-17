import { GetServerSideProps } from 'next'

const Page = () => {
  return <div></div>
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
  return {
    redirect: {
      destination: '/onboard',
      permanent: true,
    },
  }
}) satisfies GetServerSideProps
