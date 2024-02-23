import { AUTH } from '@/constants'
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  isNamuiError,
} from '@/error'
import { Provider } from '@/lib/auth'
import withHandler from '@/lib/server/with-handler'
import { parse, serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { provider, code } = req.query
    const parsedProvider = Provider.safeParse(provider)
    if (!parsedProvider.success || !code) {
      throw new BadRequestError()
    }
    const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
    serverURL.pathname = '/api/v1/auth/login'

    const response = await fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify({ provider: parsedProvider.data, code }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // FIXME: 개발, 운영 분리 코드가 상당히 지저분함 함수화 할수 있을듯
    const { accessToken, refreshToken, errorCode, ...rest } =
      await response.json()

    if (!accessToken || !refreshToken) throw new UnauthorizedError()
    if (errorCode === 'NOT_FOUND_USER') {
      const cookies = response.headers.getSetCookie().map(
        (cookie) =>
          parse(cookie) as {
            oauthAccessToken?: string
            oauthProvider?: string
            Path: string
            'Max-Age': string
            Expires: string
          },
      )

      process.env.NODE_ENV === 'development'
        ? res.setHeader(
            'Set-Cookie',
            cookies.map((cookie) =>
              serialize(
                cookie[AUTH.OAUTH_TOKEN]
                  ? AUTH.OAUTH_TOKEN
                  : AUTH.OAUTH_PROVIDER,
                cookie[AUTH.OAUTH_TOKEN]
                  ? cookie[AUTH.OAUTH_TOKEN] ?? ''
                  : cookie[AUTH.OAUTH_PROVIDER] ?? '',
                {
                  path: '/',
                },
              ),
            ),
          )
        : res.setHeader('Set-Cookie', response.headers.getSetCookie())

      res.status(200).redirect('/signup')
      return
    }

    res.setHeader('Set-Cookie', [
      serialize(AUTH.ACCESS_TOKEN_KEY, accessToken, {
        path: '/',
        httpOnly: true,
        ...(process.env.NODE_ENV === 'production'
          ? { secure: true, sameSite: 'lax' }
          : {}),
        maxAge: AUTH.ACCESS_EXPIRED_TIME,
      }),
      serialize(AUTH.REFRESH_TOKEN_KEY, refreshToken, {
        path: '/',
        httpOnly: true,
        ...(process.env.NODE_ENV === 'production'
          ? { secure: true, sameSite: 'lax' }
          : {}),
        maxAge: AUTH.REFRESH_EXPIRED_TIME,
      }),
    ])
    res.status(200).redirect('/garden')
  } catch (err) {
    console.log(err)
    const error = isNamuiError(err) ? err : new InternalServerError()
    res.status(307).redirect(307, `/?err=${error.name}`)
  }
}

export default withHandler({
  methods: ['GET'],
  handler,
})
