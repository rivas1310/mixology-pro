'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CloudflareImage } from '@/components/ui/CloudflareImage'

const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD', 'EXPERT'] as const
const SPIRIT_TYPES = ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whisky', 'Vermouth', 'Brandy']

interface CocktailFromApi {
  id: string
  name: string
  description?: string | null
  category: string
  difficulty: string
  abv?: number | null
  image?: string | null
  ingredientsText?: unknown
}

function parseIngredientsLines(c: CocktailFromApi): string[] {
  const raw = c.ingredientsText
  if (Array.isArray(raw)) return raw.map(String)
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw)
      return Array.isArray(p) ? p.map(String) : []
    } catch {
      return []
    }
  }
  return []
}

function isNonAlcoholic(c: CocktailFromApi): boolean {
  if (c.category === 'MOCKTAIL') return true
  if (c.abv != null && c.abv === 0) return true
  return false
}

function matchesSpirits(c: CocktailFromApi, selected: string[]): boolean {
  if (selected.length === 0) return true
  const lines = parseIngredientsLines(c)
  const blob = [...lines, c.description || '', c.name].join(' ').toLowerCase()
  return selected.some((spirit) => blob.includes(spirit.toLowerCase()))
}

const getDifficultyLabel = (difficulty: string) => {
  const labels: Record<string, string> = {
    EASY: 'Fácil',
    MEDIUM: 'Intermedio',
    HARD: 'Difícil',
    EXPERT: 'Experto',
  }
  return labels[difficulty] || difficulty
}

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    EASY: 'text-olive bg-cream-100 border-beige',
    MEDIUM: 'text-gold-dark bg-cream-100 border-beige',
    HARD: 'text-primary-700 bg-cream-100 border-beige',
    EXPERT: 'text-primary-800 bg-cream-100 border-beige',
  }
  return colors[difficulty] || ''
}

export default function CocktailsPage() {
  const [cocktails, setCocktails] = useState<CocktailFromApi[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedSpirits, setSelectedSpirits] = useState<string[]>([])
  const [showAlcoholic, setShowAlcoholic] = useState<boolean | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setLoadError(null)
      try {
        const res = await fetch('/api/cocktails?limit=1000')
        if (!res.ok) throw new Error('Error al cargar cócteles')
        const data = await res.json()
        setCocktails(Array.isArray(data) ? data : [])
      } catch {
        setLoadError('No se pudieron cargar los cócteles. Intenta de nuevo más tarde.')
        setCocktails([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredCocktails = useMemo(() => {
    return cocktails.filter((cocktail) => {
      const matchesSearch =
        !searchQuery.trim() ||
        cocktail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cocktail.description || '').toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDifficulty =
        !selectedDifficulty || cocktail.difficulty === selectedDifficulty

      const matchesSpiritsFilter = matchesSpirits(cocktail, selectedSpirits)

      const nonAlc = isNonAlcoholic(cocktail)
      const matchesAlcoholic =
        showAlcoholic === null ||
        (showAlcoholic === false ? nonAlc : !nonAlc)

      return matchesSearch && matchesDifficulty && matchesSpiritsFilter && matchesAlcoholic
    })
  }, [cocktails, searchQuery, selectedDifficulty, selectedSpirits, showAlcoholic])

  const toggleSpirit = (spirit: string) => {
    setSelectedSpirits((prev) =>
      prev.includes(spirit) ? prev.filter((s) => s !== spirit) : [...prev, spirit]
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-cream border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <p className="text-sm font-medium text-olive tracking-wide uppercase mb-3">
              Explorar
            </p>
            <h1 className="text-5xl md:text-6xl font-display text-primary-800 mb-4">
              Cócteles
            </h1>
            <p className="text-lg text-primary-700 max-w-2xl">
              Descubre nuestras recetas desde la base de datos: clásicos, tropicales y más
            </p>
          </div>

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12"
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-primary-800 mb-3 block uppercase tracking-wide">
                Dificultad
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                    selectedDifficulty === null
                      ? 'bg-primary-800 text-cream-50 border-primary-800'
                      : 'bg-white text-primary-800 border-beige hover:border-primary-400'
                  }`}
                >
                  Todas
                </button>
                {DIFFICULTIES.map((difficulty) => (
                  <button
                    type="button"
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-primary-800 text-cream-50 border-primary-800'
                        : 'bg-white text-primary-800 border-beige hover:border-primary-400'
                    }`}
                  >
                    {getDifficultyLabel(difficulty)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-primary-800 mb-3 block uppercase tracking-wide">
                Tipo
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowAlcoholic(null)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                    showAlcoholic === null
                      ? 'bg-primary-800 text-cream-50 border-primary-800'
                      : 'bg-white text-primary-800 border-beige hover:border-primary-400'
                  }`}
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={() => setShowAlcoholic(true)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                    showAlcoholic === true
                      ? 'bg-primary-800 text-cream-50 border-primary-800'
                      : 'bg-white text-primary-800 border-beige hover:border-primary-400'
                  }`}
                >
                  Con Alcohol
                </button>
                <button
                  type="button"
                  onClick={() => setShowAlcoholic(false)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                    showAlcoholic === false
                      ? 'bg-primary-800 text-cream-50 border-primary-800'
                      : 'bg-white text-primary-800 border-beige hover:border-primary-400'
                  }`}
                >
                  Sin Alcohol
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-primary-800 mb-3 block uppercase tracking-wide">
                Espíritus (en ingredientes)
              </label>
              <div className="flex flex-wrap gap-2">
                {SPIRIT_TYPES.map((spirit) => (
                  <button
                    type="button"
                    key={spirit}
                    onClick={() => toggleSpirit(spirit)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${
                      selectedSpirits.includes(spirit)
                        ? 'bg-primary-800 text-cream-50 border-primary-800'
                        : 'bg-white text-primary-800 border-beige hover:border-primary-400'
                    }`}
                  >
                    {spirit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loadError && (
          <p className="text-center text-red-700 mb-8 bg-red-50 border border-red-200 rounded-lg py-4 px-4">
            {loadError}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-12 w-12 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-sm text-primary-600">
                <span className="font-semibold text-primary-800">{filteredCocktails.length}</span>{' '}
                cócteles encontrados
              </p>
            </div>

            {filteredCocktails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredCocktails.map((cocktail) => {
                  const href = `/cocktails/${cocktail.category}/${cocktail.id}`
                  const nonAlc = isNonAlcoholic(cocktail)
                  return (
                    <Link key={cocktail.id} href={href} className="group space-y-5">
                      <div className="relative h-64 bg-gradient-to-br from-beige/70 to-gold-light/50 overflow-hidden">
                        {cocktail.image ? (
                          <CloudflareImage
                            src={cocktail.image}
                            alt={cocktail.name}
                            fill
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl">🍹</div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl font-serif text-primary-800 group-hover:text-gold-dark transition-colors">
                            {cocktail.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-sm text-xs font-semibold whitespace-nowrap border ${getDifficultyColor(cocktail.difficulty)}`}
                          >
                            {getDifficultyLabel(cocktail.difficulty)}
                          </span>
                        </div>

                        <p className="text-sm text-primary-600 line-clamp-2">
                          {cocktail.description || 'Sin descripción'}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-beige text-xs text-primary-600">
                          <div>
                            {nonAlc
                              ? 'Sin alcohol'
                              : cocktail.abv != null
                                ? `${cocktail.abv}% ABV`
                                : 'Con alcohol'}
                          </div>
                          <ChevronRight className="h-4 w-4 text-gold-dark group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-primary-600 mb-6">
                  No se encontraron cócteles con esos filtros
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedDifficulty(null)
                    setSelectedSpirits([])
                    setShowAlcoholic(null)
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
