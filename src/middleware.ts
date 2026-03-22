import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function sha256Hex(message: string): Promise<string> {
  const enc = new TextEncoder()
  const data = enc.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Sin contraseña configurada: no bloquear (desarrollo / despliegue inicial)
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.next()
  }

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
    return NextResponse.next()
  }

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_session')?.value
  const pwd = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET || 'change-me'
  const expected = await sha256Hex(`${pwd}:${secret}`)

  if (token && token === expected) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/admin/login'
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin', '/api/admin/:path*'],
}
