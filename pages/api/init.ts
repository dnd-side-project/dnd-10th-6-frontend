import { withError } from '@/lib/server/utils'
import withHandler from '@/lib/server/with-handler'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Set-Cookie', [
      serialize('namui-init', new Date().toLocaleString(), {
        path: '/',
        httpOnly: false,
        maxAge: 2147483647,
      }),
    ])
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err, '???')
    return withError(res, { status: 400 })
  }
}

export default withHandler({
  methods: ['GET'],
  handler,
})
