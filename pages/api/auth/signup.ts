import { AUTH } from '@/constants'
import { BadRequestError } from '@/error'
import { withError } from '@/lib/server/utils'

import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nickname } = req.body
    if (!nickname) {
      throw new BadRequestError()
    }
    const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
    serverURL.pathname = '/api/v1/auth/signup'
    const response = (await fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify({ nickname }),
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie ?? '',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        return err
      })) as { accessToken: string; refreshToken: string }

    const { accessToken, refreshToken } = response
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
      serialize(AUTH.OAUTH_PROVIDER, '', {
        path: '/',
        maxAge: -1,
      }),
      serialize(AUTH.OAUTH_TOKEN, '', {
        path: '/',
        maxAge: -1,
      }),
    ])
    return res.status(200).json({ accessToken })
  } catch (_) {
    return withError(res, { status: 400 })
  }
}

export default withHandler({
  methods: ['POST'],
  handler,
})
