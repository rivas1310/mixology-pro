'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import mixHeroImage from '../../../mix.png'

export function Hero() {
  const [stats, setStats] = useState<{ cocktails: number; techniques: number } | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.cocktails === 'number') setStats(d)
      })
      .catch(() => {})
  }, [])

  const recipeCount = stats?.cocktails ?? null
  const techniqueCount = stats?.techniques ?? null

  return (
    <section className="relative overflow-hidden bg-cream-50 py-20 lg:py-24">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-gold/15 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl space-y-8">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.22em] text-olive">Edicion curada</p>
              <h1 className="text-5xl leading-tight text-primary-800 md:text-6xl lg:text-7xl">
                El arte de
                <br />
                la Mixología
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-primary-700">
                Explora recetas auténticas, aprende técnicas profesionales y descubre los secretos
                de los mejores bartenders del mundo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/cocktails" className="flex-1 sm:flex-none">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Explorar Cócteles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#finder" className="flex-1 sm:flex-none">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Buscar Recetas
                </Button>
              </Link>
            </div>

            <div className="flex gap-8 border-t border-beige pt-8">
              <div>
                <div className="text-3xl font-serif font-bold text-primary-800">
                  {recipeCount !== null ? recipeCount : '—'}
                </div>
                <div className="text-sm text-primary-500">Recetas</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-primary-800">
                  {techniqueCount !== null ? techniqueCount : '—'}
                </div>
                <div className="text-sm text-primary-500">Técnicas</div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-br from-beige/90 to-gold-light/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" />
            <Image
              src={mixHeroImage}
              alt="Imagen principal de mixología"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
