import { NamuiError } from '@/error'
import { Oauth, Provider } from '@/lib/auth'
import { withError } from '@/lib/server/utils'
import withHandler from '@/lib/server/with-handler'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { provider, code } = req.query
  const parsedProvider = Provider.safeParse(provider)
  if (!parsedProvider.success) {
    return withError(res, {
      status: 400,
      message: NamuiError.BadRequestError.message,
    })
  }

  const url = Oauth.getAuthorizationURL(parsedProvider.data)
  if (!url || !code) {
    return withError(res, {
      status: 400,
      message: NamuiError.BadRequestError.message,
    })
  }
  // TODO: 백앤드와 연동 필요
  return res.redirect(302, '/').json('123')
}

export default withHandler({
  methods: ['GET'],
  handler,
})
