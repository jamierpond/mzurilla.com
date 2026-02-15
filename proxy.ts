import { NextRequest, NextResponse } from 'next/server'

const TARGET_DOMAIN = 'https://emilydzurilla.com'
const MOUSE_DOMAIN = 'https://play.unity.com/en/games/0e181892-2ede-44ea-afb4-dcaef32f68b8/mouse-house'

const MAPPINGS: Record<string, string> = {
  "/mouse": MOUSE_DOMAIN,
} as const;

export function proxy(req: NextRequest) {
  const currentHost = req.nextUrl.host

  // Prevent infinite redirects
  if (currentHost === new URL(TARGET_DOMAIN).host) {
    return NextResponse.next()
  }

  const pathname = req.nextUrl.pathname
  const match = Object.entries(MAPPINGS).find(([path]) => pathname.startsWith(path))
  if (match) {
    const [path, target] = match
    const redirectUrl = new URL(pathname.replace(path, ''), target)
    redirectUrl.search = req.nextUrl.search
    return NextResponse.redirect(redirectUrl, 301)
  }


  const redirectUrl = new URL(req.nextUrl.pathname + req.nextUrl.search, TARGET_DOMAIN)
  return NextResponse.redirect(redirectUrl, 301)
}

export const config = {
  matcher: '/:path*',
}

