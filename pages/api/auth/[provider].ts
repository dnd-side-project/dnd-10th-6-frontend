import { AUTH } from '@/constants'
import { BadRequestError, InternalServerError, isNamuiError } from '@/error'
import { Provider } from '@/lib/auth'
import { NamuiApi } from '@/lib/namui-api'
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

    const { accessToken, refreshToken } = await NamuiApi.signIn(
      parsedProvider.data,
      code,
    )

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
    const error = isNamuiError(err) ? err : new InternalServerError()
    return res.redirect(307, `/?err=${error.name}`).json({})
  }
}

export default withHandler({
  methods: ['GET'],
  handler,
})
