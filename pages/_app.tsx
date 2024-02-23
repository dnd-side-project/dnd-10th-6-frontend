import { AUTH } from '@/constants'
import { UnauthorizedError, getErrorMessage } from '@/error'
import CalcMobileHeight from '@/contexts/calc-mobile-height'
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
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import QueryProvider from '@/contexts/query-provider'
import { HydrationBoundary } from '@tanstack/react-query'
import MetaHead from '@/components/meta-head'
import Head from 'next/head'
import { toastError } from '@/lib/client/alert'

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
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const searchparams = useSearchParams()
  const errorCode = searchparams.get('err')
  const getLayout =
    Component.getLayout ??
    ((page: ReactNode) => <BaseLayout>{page}</BaseLayout>)
  useBrowserLayoutEffect(() => {
    const callbackURL = sessionStorage.getItem('callbackUrl')
    if (callbackURL) {
      sessionStorage.removeItem('callbackUrl')
      router.replace(callbackURL)
    }
    if (!mounted) {
      setMounted(true)
    }
  }, [errorCode, mounted, router, searchparams])

  useEffect(() => {
    if (mounted && errorCode) {
      toastError()
    }
  }, [errorCode, mounted, router, searchparams])
  return (
    <SessionProvider
      session={session}
      onExpired={NamuiApi.signOut}
      onSessionChange={(newSession) => {
        NamuiApi.setToken(newSession?.token?.accessToken)
      }}
    >
      <Head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          defer
        ></script>
        <meta
          name="viewport"
          content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
        />

        <meta name="HandheldFriendly" content="true" />
      </Head>
      <QueryProvider>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <MetaHead />
          {getLayout(<Component {...pageProps} />)}
        </HydrationBoundary>
      </QueryProvider>

      {mounted && (
        <Toaster
          position="top-center"
          gutter={10}
          toastOptions={{
            ariaProps: {
              'aria-live': 'polite',
              role: 'alert',
            },

            error: {
              ariaProps: {
                'aria-live': 'assertive',
                role: 'status',
              },
            },
          }}
        />
      )}
      <CalcMobileHeight />
    </SessionProvider>
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
      serverURL.pathname = '/api/v1/users/profile'
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
            serialize(AUTH.ACCESS_TOKEN_KEY, res.accessToken, {
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
