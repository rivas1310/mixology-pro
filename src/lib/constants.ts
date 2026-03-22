// Categorías de cócteles unificadas (usando las del admin como estándar)
export const COCKTAIL_CATEGORIES = [
  { value: 'CLASSIC', label: 'Clásicos' },
  { value: 'MODERN', label: 'Modernos' },
  { value: 'TROPICAL', label: 'Tropicales' },
  { value: 'DESSERT', label: 'Postres' },
  { value: 'SOUR', label: 'Sours' },
  { value: 'SHOT', label: 'Shots' },
  { value: 'MOCKTAIL', label: 'Sin Alcohol' },
  { value: 'HIGHBALL', label: 'Highballs' },
  { value: 'MARTINI', label: 'Martinis' },
] as const

// Niveles de dificultad unificados
export const DIFFICULTY_LEVELS = [
  { value: 'EASY', label: 'Fácil' },
  { value: 'MEDIUM', label: 'Intermedio' },
  { value: 'HARD', label: 'Avanzado' },
  { value: 'EXPERT', label: 'Experto' }
] as const

// Tipos de vasos unificados
export const GLASS_TYPES = [
  'Copa Martini',
  'Vaso Old Fashioned', 
  'Copa de Vino',
  'Vaso Highball',
  'Copa Margarita',
  'Vaso Collins',
  'Copa Coupé',
  'Vaso Rocks',
  'Copa Flute',
  'Vaso Shot',
  'Copa Hurricane',
  'Vaso Zombie'
] as const

// Técnicas de preparación unificadas
export const PREPARATION_TECHNIQUES = [
  'Shake',
  'Stir', 
  'Build',
  'Muddle',
  'Blend',
  'Layer',
  'Roll',
  'Whip',
  'Dry Shake',
  'Reverse Dry Shake'
] as const

// Unidades de medida para ingredientes
export const INGREDIENT_UNITS = [
  'ml',
  'oz',
  'dash',
  'slice',
  'sprig',
  'twist',
  'cube',
  'splash',
  'drop',
  'pinch'
] as const

// Tipos de ingredientes
export const INGREDIENT_TYPES = [
  'Spirit',
  'Liqueur', 
  'Wine',
  'Beer',
  'Mixer',
  'Citrus',
  'Herb',
  'Spice',
  'Sweetener',
  'Bitter',
  'Garnish'
] as const
