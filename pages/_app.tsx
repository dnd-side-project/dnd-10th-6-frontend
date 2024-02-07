import { Typography } from '@/components/typography'
import { AUTH } from '@/constants'
import BaseLayout from '@/layout/base-layout'
import { Token } from '@/lib/auth'
import { NamuiApi } from '@/lib/namui-api'
import {
  SessionProvider,
  SessionContextType,
} from '@/provider/session-provider'
import '@/styles/global.css'
import { parse } from 'cookie'
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
        <SessionProvider
          session={session}
          onSessionChange={() => {
            NamuiApi.getInstance().defaults.headers.common[
              AUTH.AUTH_HEADER_KEY
            ] = session?.token?.accessToken
          }}
        >
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
  const { accessToken, refreshToken } = parse(
    context.ctx.req?.headers.cookie ?? '',
  ) as Partial<Token>
  try {
    if (accessToken || refreshToken) {
      if (accessToken) {
        const headers = new Headers()
        headers.set('Cookie', context.ctx.req?.headers.cookie ?? '')
        headers.set(AUTH.AUTH_HEADER_KEY, accessToken)
        const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
        serverURL.pathname = '/api/v1/auth/test'
        const res = await fetch(serverURL, {
          method: 'GET',
          headers: headers,
        })
        const user = await res.json()
        return {
          ...ctx,
          session: {
            user: user.data,
            token: { accessToken, refreshToken },
          },
        }
      } else {
        // TODO: 엑세스 재발급 로직 추가
      }
    }
  } catch (err) {
    console.log(err)
  }

  return {
    ...ctx,
    session: null,
  }
}
