/**
 * Convierte un texto de origen (país / región) en código ISO 3166-1 alpha-2
 * para banderas (p. ej. flagcdn). Incluye nombres en español e inglés.
 */
const COUNTRY_MAP: Record<string, string> = {
  méxico: 'MX',
  mexico: 'MX',
  españa: 'ES',
  spain: 'ES',
  francia: 'FR',
  france: 'FR',
  italia: 'IT',
  italy: 'IT',
  portugal: 'PT',
  alemania: 'DE',
  germany: 'DE',
  irlanda: 'IE',
  ireland: 'IE',
  /* Bandera regional en flagcdn (más fiel que GB genérico) */
  escocia: 'gb-sct',
  scotland: 'gb-sct',
  'reino unido': 'GB',
  uk: 'GB',
  inglaterra: 'GB',
  england: 'GB',
  'gran bretaña': 'GB',
  gales: 'GB',
  wales: 'GB',
  'estados unidos': 'US',
  usa: 'US',
  eeuu: 'US',
  rusia: 'RU',
  russia: 'RU',
  polonia: 'PL',
  poland: 'PL',
  japon: 'JP',
  japón: 'JP',
  japan: 'JP',
  'nueva zelanda': 'NZ',
  australia: 'AU',
  chile: 'CL',
  argentina: 'AR',
  peru: 'PE',
  perú: 'PE',
  colombia: 'CO',
  brasil: 'BR',
  brazil: 'BR',
  cuba: 'CU',
  jamaica: 'JM',
  caribe: 'JM',
  bélgica: 'BE',
  belgica: 'BE',
  belgium: 'BE',
  holanda: 'NL',
  'países bajos': 'NL',
  netherlands: 'NL',
  'república checa': 'CZ',
  checa: 'CZ',
  czech: 'CZ',
  china: 'CN',
  canadá: 'CA',
  canada: 'CA',
  india: 'IN',
  sudáfrica: 'ZA',
  'south africa': 'ZA',
  suecia: 'SE',
  sweden: 'SE',
  noruega: 'NO',
  norway: 'NO',
  dinamarca: 'DK',
  denmark: 'DK',
  finlandia: 'FI',
  finland: 'FI',
  austria: 'AT',
  grecia: 'GR',
  greece: 'GR',
  turquía: 'TR',
  turkey: 'TR',
  corea: 'KR',
  'corea del sur': 'KR',
  taiwan: 'TW',
  filipinas: 'PH',
  philippines: 'PH',
  tailandia: 'TH',
  thailand: 'TH',
  vietnam: 'VN',
  israel: 'IL',
  uruguay: 'UY',
  paraguay: 'PY',
  bolivia: 'BO',
  ecuador: 'EC',
  venezuela: 'VE',
  panamá: 'PA',
  panama: 'PA',
  'costa rica': 'CR',
  'puerto rico': 'PR',
  'república dominicana': 'DO',
}

function normalizedVariants(label: string): string[] {
  const raw = label.trim().toLowerCase()
  if (!raw) return []

  const out: string[] = [raw]

  for (const part of raw.split(/[,;/|]/).map((p) => p.trim()).filter(Boolean)) {
    if (!out.includes(part)) out.push(part)
  }

  const noParen = raw.replace(/\s*\([^)]*\)\s*/g, ' ').trim()
  if (noParen && noParen !== raw && !out.includes(noParen)) out.push(noParen)

  return out
}

/**
 * Devuelve código ISO2 si se reconoce el país/región; '' si no.
 */
export function getCountryCodeFromOrigin(origin: string): string {
  if (!origin?.trim()) return ''

  for (const key of normalizedVariants(origin)) {
    if (COUNTRY_MAP[key]) return COUNTRY_MAP[key]
  }

  const two = origin.trim().toLowerCase()
  if (/^[a-z]{2}$/.test(two)) return two.toUpperCase()

  return ''
}

export function countryFlagCdnUrl(iso2: string, width: 20 | 40 | 80 = 40): string {
  const code = iso2.trim().toLowerCase()
  if (!code) return ''
  return `https://flagcdn.com/w${width}/${code}.png`
}
