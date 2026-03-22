/**
 * Resuelve la URL de PostgreSQL para la app (local, Railway u otra).
 *
 * Modos:
 * 1) Solo `DATABASE_URL` → se usa siempre (típico en Railway / despliegues).
 * 2) `DATABASE_URL_LOCAL` + `DATABASE_URL_RAILWAY` + `DATABASE_TARGET=local|railway`
 *    → alternar sin reescribir la URL a mano.
 *
 * `DATABASE_TARGET` por defecto: `local`
 */
export function getDatabaseUrl(): string {
  const target = (process.env.DATABASE_TARGET || 'local').toLowerCase()

  if (target === 'railway') {
    const railway = process.env.DATABASE_URL_RAILWAY?.trim()
    if (railway) return railway
  } else {
    const local = process.env.DATABASE_URL_LOCAL?.trim()
    if (local) return local
  }

  const fallback = process.env.DATABASE_URL?.trim()
  if (fallback) return fallback

  throw new Error(
    '[database] Define DATABASE_URL, o bien DATABASE_URL_LOCAL (y opcionalmente DATABASE_URL_RAILWAY + DATABASE_TARGET). Ver .env.example'
  )
}
