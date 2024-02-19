import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  if (url.pathname === '/') return NextResponse.next()
  const { cookies } = req
  const accessToken = cookies.get('accessToken')
  const refreshToken = cookies.get('refreshToken')

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|onboard).*)'],
}
