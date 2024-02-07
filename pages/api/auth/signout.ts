import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    serialize('accessToken', '', {
      maxAge: 0,
      path: '/',
    }),
    serialize('refreshToken', '', {
      maxAge: 0,
      path: '/',
    }),
  ])
  return res.json({ ok: true })
}
export default withHandler({ methods: ['POST'], handler })
