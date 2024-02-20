import { AUTH } from '@/constants'
import { BadRequestError, InternalServerError, isNamuiError } from '@/error'
import { Provider } from '@/lib/auth'
import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
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

    const { accessToken, refreshToken, errorCode } =
      (await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify({ provider: parsedProvider.data, code }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        res.setHeader('Set-Cookie', response.headers.getSetCookie())
        return response.json()
      })) ?? {}

    if (errorCode === 'NOT_FOUND_USER') {
      return res.status(200).redirect('/signup').json({})
    }
    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: AUTH.ACCESS_EXPIRED_TIME,
      }),
      serialize('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: AUTH.REFRESH_EXPIRED_TIME,
      }),
    ])
    res.status(200).redirect('/')
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
