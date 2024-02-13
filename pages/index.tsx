import { GetServerSideProps } from 'next'

const Page = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col pb-[50px] px-5">INDEX</div>
  )
}

export default Page

export const getServerSideProps = (async (context) => {
  const isViewOnboard = context.req.cookies['namui-init'] ?? null
  if (!isViewOnboard) {
    return {
      redirect: {
        destination: '/onboard',
        permanent: true,
      },
    }
  }
  return { props: {} }
}) satisfies GetServerSideProps
