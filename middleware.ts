import { NextRequest, NextResponse } from 'next/server'
import { AUTH } from './constants'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname === '/') return NextResponse.next()
  const { cookies } = req
  if (url.pathname === '/signup') {
    const [provider, token] = [
      cookies.get(AUTH.OAUTH_PROVIDER),
      cookies.get(AUTH.OAUTH_TOKEN),
    ]
    // if (!provider || !token) {
    //   return NextResponse.redirect(new URL('/', req.url))
    // }
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/data|_next/image|favicon.ico|onboard).*)',
  ],
}
