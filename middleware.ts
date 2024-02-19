import { NextRequest, NextResponse } from 'next/server'
import { AUTH } from './constants'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname === '/') return NextResponse.next()
  const { cookies } = req
  const accessToken = cookies.get('accessToken')
  const refreshToken = cookies.get('refreshToken')

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  const requestHeaders = new Headers(req.headers)

  requestHeaders.append(AUTH.AUTH_HEADER_KEY, accessToken.value)
  return NextResponse.next({
    headers: requestHeaders,
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|onboard|signup).*)'],
}
