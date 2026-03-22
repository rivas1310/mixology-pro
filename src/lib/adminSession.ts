import crypto from 'crypto'

/**
 * Token de sesión admin (mismo valor en cookie).
 * Debe coincidir con el cálculo en `middleware.ts` (Web Crypto SHA-256).
 */
export function getAdminSessionToken(): string {
  const pwd = process.env.ADMIN_PASSWORD || ''
  const secret = process.env.ADMIN_SESSION_SECRET || 'change-me'
  return crypto.createHash('sha256').update(`${pwd}:${secret}`, 'utf8').digest('hex')
}
