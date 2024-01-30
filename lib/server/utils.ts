import { NamuiError } from '@/error'
import { NextApiResponse } from 'next'

export const withError = (
  res: NextApiResponse,
  options?: {
    status?: number
    message?: string
  },
) => {
  const defaultOptions = {
    status: 400,
    message: NamuiError.BadRequestError.message,
  }

  const { message, status } = { ...defaultOptions, ...options }
  return res.status(status).json({ message })
}
