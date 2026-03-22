/**
 * Rutas públicas coherentes con app router:
 * - Cervezas/vinos: /[tipo]/[category]/[id] (detalle) o /[tipo]/[category] (listado)
 */

/** IDs generados por Prisma (cuid) */
export function isLikelyDatabaseId(id: string): boolean {
  return /^c[a-z0-9]{20,32}$/i.test(id)
}

export function cocktailDetailPath(category: string, id: string): string {
  return `/cocktails/${encodeURIComponent(category)}/${encodeURIComponent(id)}`
}

const MOCK_BEER_LIST_SLUG: Record<string, string> = {
  Lagers: 'lagers',
  Ales: 'ales',
  Trigo: 'wheat',
  Especiales: 'specialty',
}

/** Cerveza: detalle real si el id es de BD; si no, listado de categoría (datos demo). */
export function beerPublicPath(beer: { id: string; category?: string }): string {
  if (isLikelyDatabaseId(beer.id)) {
    const cat = beer.category || 'LAGER'
    return `/beers/${encodeURIComponent(cat)}/${encodeURIComponent(beer.id)}`
  }
  const slug = MOCK_BEER_LIST_SLUG[beer.category || ''] || 'lagers'
  return `/beers/${slug}`
}

const MOCK_WINE_LIST_SLUG: Record<string, string> = {
  Tintos: 'red-wines',
  Blancos: 'white-wines',
  Rosados: 'rose-wines',
  Espumosos: 'sparkling-wines',
}

/** Vino: detalle real si el id es de BD; si no, listado de categoría (datos demo). */
export function winePublicPath(wine: { id: string; category?: string }): string {
  if (isLikelyDatabaseId(wine.id)) {
    const cat = wine.category || 'RED'
    return `/wines/${encodeURIComponent(cat)}/${encodeURIComponent(wine.id)}`
  }
  const slug = MOCK_WINE_LIST_SLUG[wine.category || ''] || 'red-wines'
  return `/wines/${slug}`
}

export function spiritDetailPath(category: string, id: string): string {
  return `/spirits/${encodeURIComponent(category)}/${encodeURIComponent(id)}`
}

/** Slug de URL /spirits/[category] a partir del enum de BD (WHISKEY, LIQUEUR, …). */
const SPIRIT_DB_TO_SLUG: Record<string, string> = {
  WHISKEY: 'whiskey',
  VODKA: 'vodka',
  GIN: 'gin',
  RUM: 'rum',
  TEQUILA: 'tequila',
  COGNAC: 'cognac',
  LIQUEUR: 'liqueurs',
  AMARETTO: 'amaretto',
  SCHNAPPS: 'schnapps',
}

export function spiritCategorySlugFromDb(category?: string): string {
  const c = (category || '').toUpperCase()
  return SPIRIT_DB_TO_SLUG[c] || (category ? category.toLowerCase() : 'whiskey')
}

export function spiritPublicPath(spirit: { id: string; category?: string }): string {
  const slug = spiritCategorySlugFromDb(spirit.category)
  return `/spirits/${slug}/${encodeURIComponent(spirit.id)}`
}
