import { AUTH } from '@/constants'
import { UnauthorizedError, isNamuiError } from '@/error'
import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
const token = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const parse = token.safeParse(req.cookies)
    if (!parse.success) {
      throw new UnauthorizedError()
    }
    // TODO:쿠키 전송 상태 확인
    const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
    serverURL.pathname = '/api/v1/auth/refresh'
    const response = await fetch(serverURL, {
      method: 'POST',
      headers: {
        cookie: req.headers.cookie ?? '',
        [AUTH.AUTH_HEADER_KEY]: parse.data.accessToken,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new UnauthorizedError()
      }
      return res.json() as Promise<{
        data: {
          accessToken: 'string'
        }
      }>
    })

    res.setHeader('Set-Cookie', [
      serialize(AUTH.ACCESS_TOKEN_KEY, response.data.accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: AUTH.ACCESS_EXPIRED_TIME,
      }),
    ])
    return res.json({
      accessToken: response.data.accessToken,
    })
  } catch (err) {
    if (isNamuiError(err)) {
      return res.status(200).json({ message: err.message, accessToken: null })
    }
  }
}

export default withHandler({
  methods: ['POST'],
  handler,
})
