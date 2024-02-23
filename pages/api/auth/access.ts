import { UnauthorizedError, isNamuiError } from '@/error'
import withHandler from '@/lib/server/with-handler'
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

    return res.json({
      accessToken: parse.data.accessToken,
    })
  } catch (err) {
    if (isNamuiError(err)) {
      return res.status(200).json({ accessToken: null })
    }
  }
}

export default withHandler({
  methods: ['GET'],
  handler,
})
