/** Normaliza el campo añada (texto libre) para guardar en BD. */
export function normalizeVintageField(value: unknown): string | null {
  if (value === undefined || value === null) return null
  const s = String(value).trim()
  return s === '' ? null : s
}

/**
 * Convierte ABV/precio sin pasar NaN a Prisma (evita error 500 al guardar).
 */
export function parseOptionalFloat(value: unknown): number | null {
  if (value === undefined || value === null) return null
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const s = String(value).trim()
  if (s === '') return null
  const n = parseFloat(s.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}
