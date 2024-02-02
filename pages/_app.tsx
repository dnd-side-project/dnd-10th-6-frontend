import { Typography } from '@/components/typography'
import '@/styles/global.css'

import type { AppProps } from 'next/app'
import LocalFont from 'next/font/local'

const pretendard = LocalFont({
  src: './assets/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-base',
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pretendard.variable}>
      <Component {...pageProps} />
      <Typography hierarchy="mainTitle1" as="h1">
        Main Title 1
      </Typography>
      <Typography hierarchy="subTitle1" as="h2">
        Sub Title 1
      </Typography>
      <Typography hierarchy="body1" as="div">
        Body 1
      </Typography>
    </main>
  )
}
