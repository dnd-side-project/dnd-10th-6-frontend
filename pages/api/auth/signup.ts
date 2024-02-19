import { AUTH } from '@/constants'
import { BadRequestError, InternalServerError, isNamuiError } from '@/error'
import { Provider } from '@/lib/auth'
import withHandler from '@/lib/server/with-handler'
import { parse, serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
    serverURL.pathname = '/api/v1/auth/login'
    console.log(req.headers.cookie)
    const response = await fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify({ nickname: '123' }),
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie ?? '',
      },
    }).then((res) => res.json())
    console.log(response)
    res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)
    const error = isNamuiError(err) ? err : new InternalServerError()
    res.status(200).json({ ok: true })
  }
}

export default withHandler({
  methods: ['POST'],
  handler,
})
