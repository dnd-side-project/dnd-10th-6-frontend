import { AUTH } from '@/constants'
import { UnauthorizedError } from '@/error'
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
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { useBrowserLayoutEffect } from '@/lib/client/utils'
import QueryProvider from '@/contexts/query-provider'
import { HydrationBoundary } from '@tanstack/react-query'
import MetaHead from '@/components/meta-head'
import { toastError } from '@/lib/client/alert'
import ErrorBoundary from '@/components/error-boundary'
import Logo from '@/components/ui/logo'

import icons from '@/icons'
import Image from 'next/image'
import Link from 'next/link'

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
      <MetaHead />
      <ErrorBoundary>
        <QueryProvider>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <div className="grow hidden lg:flex flex-col pb-8">
              <div className="grow flex flex-col justify-center">
                <h3 className="text-[32px] leading-[42px] text-text-main-black11">
                  남이 쓰는 나의 소개서
                </h3>
                <div className="max-w-xs max-h-24 flex items-center flex-col grow mt-3">
                  <Logo />
                </div>
                <div className="flex items-center justify-center w-24 aspect-square rounded-2xl shadow-onboard mt-16">
                  <svg
                    width="59"
                    height="78"
                    viewBox="0 0 59 78"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.8226 1.29183C26.0789 2.69272 24.0593 17.2853 23.7675 24.4065C23.631 26.6828 21.8413 27.0332 13.7862 32.4616C7.34208 36.8044 10.5174 42.2095 12.9106 44.3692C8.29934 45.5366 -0.572951 49.4824 0.827936 55.9265C2.22882 62.3706 8.76629 63.5146 11.8599 63.2812C11.6264 63.6314 12.1401 65.5576 16.0626 70.4607C19.9851 75.3638 26.8027 72.5037 29.7212 70.4607C43.0297 82.9286 46.8237 74.2548 47.0572 68.3594C49.9174 69.5852 56.0229 69.9004 57.5639 61.3549C59.1048 52.8095 49.4504 43.2018 44.4305 39.4661C57.9141 42.9683 48.283 28.9594 43.3799 23.5309C38.4768 18.1025 39.0021 -0.459278 31.8226 1.29183Z"
                      fill="#00BC68"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33.9802 1.89194C33.3954 1.59146 32.7235 1.49981 31.9171 1.69649C30.6431 2.00723 29.5176 3.06661 28.5395 4.70365C27.5663 6.3324 26.7785 8.46823 26.1537 10.8068C24.9048 15.4811 24.3297 20.8768 24.1846 24.4173L24.1842 24.4253C24.1462 25.0589 23.9888 25.5879 23.6217 26.1016C23.2666 26.5984 22.731 27.0583 21.9865 27.59C21.2875 28.0891 20.3714 28.6739 19.1933 29.4259C19.1124 29.4775 19.0302 29.53 18.9468 29.5832C17.645 30.4145 16.0263 31.452 14.0169 32.8061C12.4528 33.8602 11.4994 34.9603 10.9676 36.0322C10.4372 37.1013 10.3145 38.1657 10.4482 39.1718C10.718 41.2028 12.0366 43.0091 13.1884 44.0485C13.3043 44.1531 13.3532 44.313 13.3156 44.4646C13.278 44.6161 13.1601 44.7346 13.0087 44.773C10.7372 45.348 7.42224 46.6077 4.86069 48.5028C2.29168 50.4035 0.588447 52.8525 1.23576 55.8301C1.9038 58.9031 3.78676 60.7042 5.88771 61.7204C8.00401 62.7441 10.3344 62.9649 11.8223 62.8527C11.9837 62.8405 12.1379 62.9214 12.2195 63.0611C12.2931 63.1868 12.2962 63.3405 12.2306 63.4681C12.2303 63.4727 12.2301 63.4784 12.23 63.4854C12.2297 63.5345 12.2384 63.6205 12.2713 63.7521C12.337 64.0148 12.4863 64.4093 12.7728 64.9625C13.3446 66.0664 14.435 67.7495 16.3873 70.1898C18.2274 72.49 20.7422 72.9837 23.2041 72.6398C25.6801 72.294 28.052 71.1021 29.4728 70.1075C29.6368 69.9927 29.8588 70.0085 30.0048 70.1454C33.3117 73.2433 35.9975 74.9986 38.1563 75.8192C40.3063 76.6365 41.9064 76.5185 43.0943 75.9128C44.2937 75.3011 45.1505 74.153 45.7244 72.7604C46.2975 71.3698 46.5717 69.7737 46.6286 68.3361C46.6341 68.1969 46.7077 68.0694 46.8255 67.995C46.9433 67.9207 47.0901 67.909 47.2182 67.9639C48.5792 68.5472 50.6996 68.9042 52.6414 68.1223C54.5506 67.3535 56.3901 65.4409 57.1416 61.2733C57.8807 57.1747 55.9377 52.7583 53.1089 48.8484C50.2906 44.953 46.6549 41.6468 44.1721 39.7991C44.0097 39.6782 43.9557 39.4592 44.0432 39.2767C44.1307 39.0941 44.3352 38.9991 44.5312 39.05C46.1943 39.4819 47.4711 39.6355 48.4277 39.5805C49.3839 39.5256 49.9809 39.2653 50.341 38.9095C50.6971 38.5577 50.8803 38.054 50.8874 37.3835C50.8945 36.7077 50.721 35.8946 50.3959 34.9832C49.0892 31.3203 45.5015 26.5111 43.0601 23.8081C41.7659 22.3752 40.858 20.1159 40.1045 17.6362C39.635 16.0913 39.2139 14.4169 38.7984 12.7648C38.5469 11.7649 38.2975 10.7731 38.0406 9.82301C37.3504 7.27051 36.6038 5.00604 35.6083 3.49041C35.1136 2.73729 34.5755 2.19776 33.9802 1.89194ZM12.2322 63.4537C12.2323 63.4537 12.2321 63.4545 12.2318 63.456C12.232 63.4545 12.2322 63.4537 12.2322 63.4537ZM40.9144 17.3901C41.6657 19.8628 42.5309 21.9594 43.6882 23.2407C46.1499 25.9662 49.8293 30.8756 51.1931 34.6988C51.5356 35.6589 51.7424 36.5778 51.7338 37.3925C51.7251 38.2124 51.4965 38.9578 50.936 39.5116C50.3795 40.0615 49.5551 40.3635 48.4763 40.4256C47.8093 40.4639 47.0302 40.4117 46.1287 40.2613C48.5037 42.2232 51.4274 45.0804 53.7947 48.3523C56.6628 52.3166 58.7765 56.9768 57.9746 61.4235C57.1852 65.8014 55.2015 68.0039 52.9576 68.9074C51.0031 69.6945 48.9304 69.4628 47.4402 68.9547C47.3359 70.3091 47.048 71.7701 46.507 73.0829C45.888 74.5851 44.9207 75.9315 43.4788 76.6668C42.0255 77.4079 40.1672 77.4892 37.8555 76.6104C35.6097 75.7567 32.9112 73.9896 29.6743 70.9941C28.1566 71.9991 25.8037 73.1314 23.3212 73.4781C20.664 73.8493 17.8088 73.3216 15.7264 70.7186C13.7562 68.2559 12.6285 66.5243 12.0212 65.3518C11.7182 64.7667 11.5377 64.3075 11.4502 63.9574C11.4297 63.8753 11.4135 63.7965 11.4023 63.7212C9.80701 63.7651 7.57758 63.4781 5.51913 62.4824C3.22772 61.374 1.1415 59.381 0.408651 56.0099C-0.344921 52.5435 1.68754 49.7975 4.35727 47.8224C6.77125 46.0364 9.79468 44.8064 12.0811 44.1475C10.9859 42.9871 9.87083 41.2533 9.60914 39.2833C9.45533 38.1254 9.59755 36.8892 10.2094 35.656C10.8198 34.4255 11.886 33.2215 13.5439 32.1042C15.5621 30.7441 17.1878 29.7021 18.4913 28.8698C18.5711 28.8188 18.6497 28.7687 18.7271 28.7193C19.9166 27.9599 20.8144 27.3868 21.4946 26.9011C22.2215 26.3821 22.6623 25.9883 22.933 25.6095C23.1909 25.2486 23.3084 24.8812 23.339 24.3785C23.4861 20.7978 24.0667 15.339 25.336 10.5883C25.9705 8.21345 26.7828 5.9934 27.8129 4.26951C28.8379 2.5539 30.1187 1.26388 31.7165 0.87417C32.705 0.633079 33.5872 0.738424 34.367 1.13907C35.1364 1.53438 35.7735 2.20011 36.3158 3.02572C37.3942 4.66756 38.1688 7.05447 38.8577 9.60208C39.1234 10.5847 39.376 11.5898 39.6285 12.5943C40.0391 14.2276 40.4492 15.8593 40.9144 17.3901Z"
                      fill="#111111"
                    />
                    <path
                      d="M32.0803 28.3207C32.0579 31.1303 33.71 33.4212 35.7704 33.4376C37.8307 33.454 39.5191 31.1897 39.5415 28.3802C39.5639 25.5706 37.9118 23.2797 35.8514 23.2633C33.7911 23.2468 32.1027 25.5112 32.0803 28.3207Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33.8092 31.4472C33.2536 30.6768 32.89 29.5761 32.9 28.3273C32.9099 27.0784 33.291 25.9836 33.8587 25.2222C34.4268 24.4603 35.1386 24.0773 35.8449 24.0829C36.5512 24.0885 37.2568 24.4829 37.8127 25.2537C38.3682 26.0241 38.7318 27.1248 38.7219 28.3736C38.7119 29.6225 38.3308 30.7173 37.7631 31.4787C37.195 32.2406 36.4832 32.6236 35.7769 32.618C35.0706 32.6123 34.3651 32.218 33.8092 31.4472ZM35.7704 33.4376C33.71 33.4212 32.0579 31.1303 32.0803 28.3207C32.1027 25.5112 33.7911 23.2468 35.8514 23.2633C37.9118 23.2797 39.5639 25.5706 39.5415 28.3802C39.5191 31.1897 37.8307 33.454 35.7704 33.4376Z"
                      fill="#111111"
                    />
                    <path
                      d="M32.8389 29.1371C32.5883 31.0878 33.7406 32.8434 35.4127 33.0581C37.0847 33.2729 38.6433 31.8657 38.8939 29.9149C39.1445 27.9642 37.9922 26.2087 36.3201 25.9939C34.6481 25.7791 33.0894 27.1864 32.8389 29.1371Z"
                      fill="#111111"
                    />
                    <path
                      d="M25.0822 28.6173C25.2776 31.4201 27.1022 33.5762 29.1576 33.4329C31.2131 33.2897 32.721 30.9013 32.5256 28.0985C32.3302 25.2956 30.5056 23.1396 28.4502 23.2828C26.3947 23.4261 24.8868 25.8144 25.0822 28.6173Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.0481 31.6004C26.4345 30.8754 25.9867 29.8061 25.8999 28.5603C25.8131 27.3144 26.1082 26.1934 26.6152 25.3903C27.1226 24.5867 27.8025 24.1496 28.5072 24.1005C29.2118 24.0514 29.9458 24.3899 30.5597 25.1154C31.1733 25.8404 31.6211 26.9096 31.7079 28.1555C31.7947 29.4013 31.4996 30.5223 30.9926 31.3254C30.4852 32.1291 29.8053 32.5661 29.1006 32.6152C28.396 32.6643 27.662 32.3258 27.0481 31.6004ZM29.1576 33.4329C27.1022 33.5762 25.2776 31.4201 25.0822 28.6173C24.8868 25.8144 26.3947 23.4261 28.4502 23.2828C30.5056 23.1396 32.3302 25.2956 32.5256 28.0985C32.721 30.9013 31.2131 33.2897 29.1576 33.4329Z"
                      fill="#111111"
                    />
                    <path
                      d="M25.8999 29.3714C25.8012 31.3357 27.0861 32.9966 28.7698 33.0812C30.4534 33.1658 31.8984 31.642 31.9971 29.6778C32.0958 27.7135 30.8109 26.0525 29.1272 25.9679C27.4435 25.8833 25.9986 27.4071 25.8999 29.3714Z"
                      fill="#111111"
                    />
                    <path
                      d="M27.9596 37.4191C30.0489 36.3843 29.3453 37.633 28.7323 38.3866C29.0874 40.1297 30.4576 43.9012 33.0971 45.0425C35.7365 46.1838 37.6118 41.2029 37.2038 38.2205C36.8557 38.1815 35.7493 37.8726 36.0636 37.388C36.2765 37.0595 37.2246 36.4608 38.2882 36.4036C39.3536 36.3463 38.4159 37.8863 37.8999 38.2984C38.4981 39.775 37.9076 42.885 36.3585 45.3899C34.4221 48.521 31.8581 46.6658 30.4867 44.7502C29.3896 43.2178 28.2409 40.1524 27.8037 38.8113C26.9851 38.7784 25.8702 38.4538 27.9596 37.4191Z"
                      fill="#111111"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex space-x-4">
                  <Link
                    href="https://notefolio.net/ayan_note/383271"
                    target="_blank"
                    className="w-8 h-8 rounded-md overflow-hidden"
                  >
                    <Image
                      src={icons.NotePolio.src}
                      width={icons.NotePolio.width}
                      height={icons.NotePolio.height}
                      alt="notepolio"
                    />
                  </Link>
                  <Link href="https://github.com/grrrew" target="_blank">
                    <Image
                      src={icons.Github.src}
                      width={icons.Github.width}
                      height={icons.Github.height}
                      alt="notepolio"
                    />
                  </Link>
                </div>
                <span className="text-text-sub-gray99 text-body1-medium">
                  Copyright {new Date().getFullYear()}. GRRREW. All rights
                  reserved.
                </span>
              </div>
            </div>
            <div
              id="main-section"
              className="mx-auto relative overflow-x-hidden max-w-lg w-full bg-white"
            >
              {getLayout(<Component {...pageProps} />)}
            </div>
          </HydrationBoundary>
        </QueryProvider>
      </ErrorBoundary>

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
