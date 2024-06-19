import Loading from '@/components/situations/loading'
import { AUTH } from '@/constants'
import BaseLayout from '@/layout/base-layout'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
/**
 *
 * @param {csrfCallbackUrl} 요청 화면으로 되돌아 가기 전 선행되어야 하는 화면 주소
 * @returns
 */
const Csrf = ({ csrfCallbackUrl }: { csrfCallbackUrl: string }) => {
  const router = useRouter()
  useBrowserLayoutEffect(() => {
    if (csrfCallbackUrl) {
      router.replace(decodeURIComponent(csrfCallbackUrl))
    } else {
      const callbackURL = sessionStorage.getItem('callbackUrl')
      let endpoint = '/'
      if (callbackURL) {
        sessionStorage.removeItem('callbackUrl')
        endpoint = decodeURIComponent(callbackURL)
      }
      router.replace(endpoint)
    }
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
  const callbackUrl = ctx.query?.[AUTH.LOGIN_REDIRECT_URL] ?? ''
  return {
    props: {
      csrfCallbackUrl: callbackUrl,
    },
  }
}
