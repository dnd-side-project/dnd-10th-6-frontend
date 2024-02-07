import { AUTH } from '@/constants'
import { BadRequestError, isNamuiError } from '@/error'
import { Oauth, Provider } from '@/lib/auth'
import { NamuiApi } from '@/lib/namui-api'
import { withError } from '@/lib/server/utils'
import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { provider, code } = req.query
    const parsedProvider = Provider.safeParse(provider)
    if (!parsedProvider.success) {
      return withError(res, {
        status: 400,
        message: BadRequestError.message,
      })
    }

    const url = Oauth.getAuthorizationURL(parsedProvider.data)
    if (!url || !code) {
      return withError(res, {
        status: 400,
        message: BadRequestError.message,
      })
    }

    const {
      data: { accessToken, refreshToken },
    } = await NamuiApi.signIn(parsedProvider.data, code)

    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: AUTH.ACCESS_EXPIRED_TIME,
      }),
      serialize('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: AUTH.REFRESH_EXPIRED_TIME,
      }),
    ])
  } catch (err) {
    if (isNamuiError(err)) {
      return res.redirect(307, `/?err=${err.name}`).json({ ok: true })
    }
  }
  res.status(200).redirect('/')
}

export default withHandler({
  methods: ['GET'],
  handler,
})
