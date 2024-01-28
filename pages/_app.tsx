import '@/styles/global.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import LocalFont from 'next/font/local'

const pretendard = LocalFont({
  src: './assets/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-base',
})
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={pretendard.variable}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
