'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, ArrowLeft, Loader2 } from 'lucide-react'
import { useApp } from '@/contexts/AppProvider'
import { cocktailDetailPath } from '@/lib/publicUrls'
import { CloudflareImage } from '@/components/ui/CloudflareImage'

interface CocktailBrief {
  id: string
  name: string
  category: string
  description?: string | null
  image?: string | null
}

export default function FavoritesPage() {
  const { favorites } = useApp()
  const [items, setItems] = useState<CocktailBrief[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) {
      setItems([])
      setLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      const results: CocktailBrief[] = []
      for (const id of favorites) {
        try {
          const res = await fetch(`/api/cocktails/${id}`)
          if (!res.ok) continue
          const data = await res.json()
          if (data?.id && data?.category) {
            results.push({
              id: data.id,
              name: data.name,
              category: data.category,
              description: data.description,
              image: data.image,
            })
          }
        } catch {
          /* skip */
        }
      }
      if (!cancelled) {
        setItems(results)
        setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [favorites])

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-gold-dark mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-4xl font-display text-primary-800">Tus favoritos</h1>
        </div>
        <p className="text-primary-600 mb-10 max-w-xl">
          Cócteles que marcaste con el corazón. Los favoritos se guardan en este navegador.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 bg-white/80 rounded-2xl border border-beige">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-primary-700 mb-4">Aún no tienes cócteles favoritos.</p>
            <Link
              href="/cocktails"
              className="text-gold-dark font-medium hover:underline"
            >
              Explorar cócteles
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-amber-50 rounded-2xl border border-amber-200">
            <p className="text-primary-800 mb-2">
              No pudimos cargar los detalles de algunos favoritos (quizá ya no existen en el catálogo).
            </p>
            <Link href="/cocktails" className="text-gold-dark font-medium hover:underline">
              Ver cócteles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {items.map((c) => (
              <Link
                key={c.id}
                href={cocktailDetailPath(c.category, c.id)}
                className="group rounded-2xl overflow-hidden border border-beige bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gradient-to-br from-beige to-gold-light/30">
                  {c.image ? (
                    <CloudflareImage
                      src={c.image}
                      alt={c.name}
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">
                      🍹
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-serif text-primary-800 group-hover:text-gold-dark">
                    {c.name}
                  </h2>
                  {c.description && (
                    <p className="text-sm text-primary-600 mt-2 line-clamp-2">{c.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
