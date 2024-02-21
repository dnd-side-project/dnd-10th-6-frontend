import { Method } from 'axios'
import { NextApiResponse, NextApiRequest } from 'next'
import { withError } from './utils'

interface ConfigType<T> {
  methods: Method[]
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>
  hasAuthenticated?: boolean
}

// const cookieOptions: CookieSerializeOptions = {
//   maxAge: 60 * 60, // 한시간,
//   path: '/',
//   httpOnly: true,
//   secure: true,
// }

export default function withHandler<T = void>({
  methods,
  hasAuthenticated = false,
  handler,
}: ConfigType<T>) {
  return async function (
    req: NextApiRequest & { method: Method },
    res: NextApiResponse,
  ): Promise<T | void> {
    if (req.method && !methods.includes(req.method)) {
      return res.status(405).json({ message: 'Method not allowed' })
    }
    try {
      if (hasAuthenticated) {
        // try {
        //   return await handler(req, res)
        // } catch (error) {
        //   //TODO
        //   // const newToken = await getNewTokenNam()
        //   const serializedToken = serialize(
        //     'accessToken',
        //     'newToken',
        //     cookieOptions,
        //   )
        //   req.cookies['accessToken'] = serializedToken
        //   res.setHeader('Set-Cookie', serializedToken)
        //   return await handler(req, res)
        // }
      }
      return await handler(req, res)
    } catch (error) {
      console.error(error)
      return withError(res, { status: 500 })
    }
  }
}
