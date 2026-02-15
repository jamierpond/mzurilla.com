import { NextRequest, NextResponse } from 'next/server'

const TARGET_DOMAIN = 'https://emilydzurilla.com'

export function proxy(req: NextRequest) {
  const currentHost = req.nextUrl.host

  // Prevent infinite redirects
  if (currentHost === new URL(TARGET_DOMAIN).host) {
    return NextResponse.next()
  }

  const redirectUrl = new URL(req.nextUrl.pathname + req.nextUrl.search, TARGET_DOMAIN)
  return NextResponse.redirect(redirectUrl, 301)
}

export const config = {
  matcher: '/:path*',
}

