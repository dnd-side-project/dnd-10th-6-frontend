import Loading from '@/components/loading'
import { AUTH } from '@/constants'
import BaseLayout from '@/layout/base-layout'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { useSession } from '@/provider/session-provider'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

const Csrf = () => {
  const router = useRouter()
  const { data } = useSession()
  useBrowserLayoutEffect(() => {
    const callbackURL = sessionStorage.getItem('callbackUrl')
    if (callbackURL) {
      sessionStorage.removeItem('callbackUrl')
    }

    router.replace(callbackURL ?? data?.user?.name ? '/' : '/signup')
  }, [])
  return (
    <section className="h-calc-h flex items-center">
      <Loading />
    </section>
  )
}

export default Csrf

Csrf.getLayout = (page: ReactNode) => (
  <BaseLayout showHeader={false}>{page}</BaseLayout>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const callbackUrl = ctx.query[AUTH.LOGIN_REDIRECT_URL]
  console.log(callbackUrl)
  return {
    props: {},
  }
}
