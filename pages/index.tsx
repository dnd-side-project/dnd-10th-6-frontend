import { GetServerSideProps } from 'next'
import { motion } from 'framer-motion'
import { fadeInProps } from '@/variants'
const Page = () => {
  return (
    <motion.div {...fadeInProps} className="flex flex-col pb-[50px] px-5 grow">
      INDEX
    </motion.div>
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
