import '@/styles/global.css'
import { NextPage } from 'next'
import type { AppContext, AppProps } from 'next/app'
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

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <main className={pretendard.variable}>
      <Component {...pageProps} />
    </main>,
  )
}

App.getInitialProps = ({}: AppContext) => {
  return {}
}
