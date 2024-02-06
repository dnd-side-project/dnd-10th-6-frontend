import { Typography } from '@/components/typography'
import BaseLayout from '@/layout/base-layout'
import {
  SessionProvider,
  SessionContextType,
} from '@/provider/session-provider'
import '@/styles/global.css'
import { NextPage } from 'next'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import LocalFont from 'next/font/local'
import { ReactElement, ReactNode } from 'react'

const pretendard = LocalFont({
  src: './assets/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-base',
})

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type InitialProps = SessionContextType

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
} & InitialProps

export default function NamuiWikiApp({
  Component,
  pageProps,
  session,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  return getLayout(
    <main className={pretendard.variable}>
      <BaseLayout>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        <Typography hierarchy="mainTitle1" as="h1">
          Main Title 1
        </Typography>
        <Typography hierarchy="subTitle1" as="h2">
          Sub Title 1
        </Typography>
        <Typography hierarchy="body1" as="div">
          Body 1
        </Typography>
      </BaseLayout>
    </main>,
  )
}

NamuiWikiApp.getInitialProps = async (
  context: AppContext,
): Promise<AppInitialProps & InitialProps> => {
  const ctx = await App.getInitialProps(context)
  return {
    ...ctx,
    session: null,
  }
}
