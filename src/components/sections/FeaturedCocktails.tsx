'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { CloudflareImage } from '@/components/ui/CloudflareImage'
import { COCKTAIL_CATEGORIES } from '@/lib/constants'

interface CocktailCard {
  id: string
  name: string
  description?: string | null
  category: string
  image?: string | null
}

function categoryLabel(category: string): string {
  const found = COCKTAIL_CATEGORIES.find((c) => c.value === category)
  return found?.label || category
}

export function FeaturedCocktails() {
  const [items, setItems] = useState<CocktailCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        let res = await fetch('/api/cocktails?featured=true&limit=6')
        let data = await res.json()
        let list: CocktailCard[] = Array.isArray(data) ? data : []

        if (list.length === 0) {
          res = await fetch('/api/cocktails?limit=3')
          data = await res.json()
          list = Array.isArray(data) ? data : []
        }

        setItems(list.slice(0, 3))
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <section className="bg-cream py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-48 bg-beige/60 rounded animate-pulse mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-6 animate-pulse">
                <div className="h-72 bg-beige/50 rounded" />
                <div className="h-6 bg-beige/50 rounded w-2/3" />
                <div className="h-4 bg-beige/40 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="bg-cream py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-primary-700">
            Aún no hay cócteles destacados. Marca recetas como destacadas en el admin o añade
            cócteles a la base de datos.
          </p>
          <Link href="/cocktails" className="inline-block mt-6">
            <Button variant="primary">Ver todos los cócteles</Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-4">
          <p className="text-sm font-medium text-olive tracking-[0.18em] uppercase">
            Selección Destacada
          </p>
          <h2 className="text-5xl md:text-6xl font-display text-primary-800">
            Cócteles en carta
          </h2>
          <p className="text-lg text-primary-700 max-w-2xl">
            Recetas desde nuestra base de datos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((cocktail) => {
            const href = `/cocktails/${cocktail.category}/${cocktail.id}`
            return (
              <Link key={cocktail.id} href={href} className="group space-y-6 cursor-pointer">
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-beige/80 to-gold-light/50 transition-all duration-300 group-hover:shadow-md">
                  {cocktail.image ? (
                    <CloudflareImage
                      src={cocktail.image}
                      alt={cocktail.name}
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">🍹</div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/40 backdrop-blur-sm text-cream-50 text-xs font-medium">
                    {categoryLabel(cocktail.category)}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-serif text-primary-800 group-hover:text-gold-dark transition-colors">
                    {cocktail.name}
                  </h3>
                  <p className="text-primary-700 leading-relaxed line-clamp-2">
                    {cocktail.description || 'Descubre la receta completa.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gold-dark text-sm font-medium group-hover:gap-3 transition-all">
                  Ver Receta
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
