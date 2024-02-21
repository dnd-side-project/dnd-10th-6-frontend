import { AUTH } from '@/constants'
import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
const EXPIRED_TOKEN_KEY_LIST = [
  AUTH.OAUTH_TOKEN,
  AUTH.OAUTH_PROVIDER,
  AUTH.ACCESS_TOKEN_KEY,
  AUTH.REFRESH_TOKEN_KEY,
]
async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    EXPIRED_TOKEN_KEY_LIST.map((key) =>
      serialize(key, '', {
        maxAge: 0,
        path: '/',
      }),
    ),
  )
  return res.json({ ok: true })
}
export default withHandler({ methods: ['POST'], handler })
