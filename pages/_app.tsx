import { Typography } from '@/components/typography'
import { AUTH } from '@/constants'
import { UnauthorizedError } from '@/error'
import BaseLayout from '@/layout/base-layout'
import { Session, Token } from '@/lib/auth'
import { NamuiApi } from '@/lib/namui-api'
import {
  SessionProvider,
  SessionContextType,
} from '@/provider/session-provider'
import '@/styles/global.css'
import { parse, serialize } from 'cookie'
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
            NamuiApi.setToken(session?.token?.accessToken)
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
  let session: Session = {}
  try {
    const headers = new Headers()
    headers.set('Cookie', context.ctx.req?.headers.cookie ?? '')
    const getUser = async (token: string) => {
      headers.set(AUTH.AUTH_HEADER_KEY, token)
      const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
      serverURL.pathname = '/api/v1/auth/test'
      const res = await fetch(serverURL, {
        method: 'GET',
        headers: headers,
      })
      const user = await res.json()
      return user
    }
    if (accessToken || refreshToken) {
      if (accessToken) {
        const user = await getUser(accessToken)
        session = {
          user: user.data,
          token: { accessToken, refreshToken },
        }
      } else {
        if (refreshToken) {
          const serverURL = new URL(process.env.HOST)
          serverURL.pathname = '/api/auth/refresh'
          const res = await fetch(serverURL, {
            method: 'POST',
            headers,
          }).then((res) => {
            if (res.status !== 200) {
              throw new UnauthorizedError()
            }
            return res.json() as Promise<{ accessToken: string }>
          })
          context.ctx.res?.setHeader('Set-Cookie', [
            serialize('accessToken', res.accessToken, {
              path: '/',
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: AUTH.ACCESS_EXPIRED_TIME,
            }),
          ])
          const user = await getUser(res.accessToken)
          session = {
            user: user.data,
            token: { accessToken: res.accessToken, refreshToken },
          }
        }
      }
    }
  } catch (err) {}

  return {
    ...ctx,
    session,
  }
}
