import { NextResponse } from 'next/server'

/**
 * Metadatos de seguridad del panel (sin secretos).
 * Protegido por middleware de admin.
 */
export async function GET() {
  const pwd = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET || 'change-me'

  return NextResponse.json({
    passwordConfigured: Boolean(pwd && String(pwd).length > 0),
    sessionSecretNeedsChange: secret === 'change-me',
    nodeEnv: process.env.NODE_ENV ?? 'development',
    cookie: {
      name: 'admin_session',
      httpOnly: true,
      sameSite: 'lax' as const,
      maxAgeDays: 7,
      secureInProduction: true,
    },
  })
}
