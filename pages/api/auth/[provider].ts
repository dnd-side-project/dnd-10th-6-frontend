import { Oauth } from '@/lib/server/auth'
import withHandler from '@/lib/server/with-handler'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { provider, code } = req.query
  const url = Oauth.getAuthorizationURL(provider as string)
  if (!url || !code) {
    return res.status(400).json({ message: '서비스 접속이 원할하지 않습니다.' })
  }
  // TODO: 백앤드와 연동 필요
  return res.json({ data: url.toString() })
}

export default withHandler({
  methods: ['GET'],
  handler,
})
