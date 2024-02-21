import { BadRequestError } from '@/error'
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
    message: BadRequestError.message,
  }

  const { message, status } = { ...defaultOptions, ...options }
  return res.status(status).json({ message })
}

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const serverURL = new URL(process.env.NEXT_PUBLIC_API_URL)
