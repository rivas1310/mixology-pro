function normalizeEnv(value?: string): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined

  // Tolerar valores pegados con comillas en .env: KEY= "value"
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim() || undefined
  }

  return trimmed
}

/**
 * Resuelve la URL de PostgreSQL para la app (local / Railway / única).
 *
 * Prioridades:
 * - Si hay `DATABASE_TARGET`, se respeta (`local` o `railway`).
 * - Sin target explícito:
 *   - Producción/Vercel: Railway -> DATABASE_URL -> Local
 *   - Desarrollo: Local -> DATABASE_URL -> Railway
 */
export function getDatabaseUrl(): string {
  const single = normalizeEnv(process.env.DATABASE_URL)
  const local = normalizeEnv(process.env.DATABASE_URL_LOCAL)
  const railway = normalizeEnv(process.env.DATABASE_URL_RAILWAY)

  const rawTarget = normalizeEnv(process.env.DATABASE_TARGET)?.toLowerCase()
  const hasExplicitTarget = rawTarget === 'local' || rawTarget === 'railway'

  let resolved: string | undefined

  if (hasExplicitTarget) {
    resolved = rawTarget === 'railway' ? railway || single || local : local || single || railway
  } else {
    const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL
    resolved = isProd ? railway || single || local : local || single || railway
  }

  if (resolved) return resolved

  throw new Error(
    '[database] No hay URL configurada. Define DATABASE_URL, o usa DATABASE_URL_LOCAL / DATABASE_URL_RAILWAY (opcional DATABASE_TARGET=local|railway).'
  )
}
