'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import {
  Wine,
  Sun,
  Sparkles,
  Droplets,
  Zap,
  Heart,
  ArrowRight,
  Target,
  BarChart3,
  Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { COCKTAIL_CATEGORIES } from '@/lib/constants'

const CATEGORY_COPY: Partial<Record<(typeof COCKTAIL_CATEGORIES)[number]['value'], string>> = {
  CLASSIC: 'Recetas base que todo bartender domina.',
  MODERN: 'Variaciones actuales, técnicas de barra y de autor.',
  TROPICAL: 'Perfiles frutales y refrescantes.',
  DESSERT: 'Perfiles dulces y cremosos.',
  SOUR: 'Equilibrio cítrico y espuma.',
  SHOT: 'Servicio rápido y directo.',
  MOCKTAIL: 'Opciones equilibradas sin alcohol.',
  HIGHBALL: 'Formato largo, refrescante y fácil de beber.',
  MARTINI: 'Elegancia en copa y stirred.',
}

const CATEGORY_HOME_ICONS: Record<string, LucideIcon> = {
  CLASSIC: Wine,
  MODERN: Sparkles,
  TROPICAL: Sun,
  DESSERT: Heart,
  SOUR: Zap,
  SHOT: Target,
  MOCKTAIL: Droplets,
  HIGHBALL: BarChart3,
  MARTINI: Star,
}

const categories = COCKTAIL_CATEGORIES.map((c) => ({
  id: c.value,
  name: c.label,
  description:
    CATEGORY_COPY[c.value] ??
    `Explora recetas con perfil ${c.label.toLowerCase()}.`,
  icon: CATEGORY_HOME_ICONS[c.value] ?? Wine,
}))

export function Categories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="mb-3 text-4xl text-primary-800 sm:text-5xl">
            Explora por Categoría
          </h2>
          <p className="mx-auto max-w-2xl text-base text-primary-600 sm:text-lg">
            Selecciona un estilo y entra directo a recetas con el mismo perfil.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Link
                href={`/cocktails/${encodeURIComponent(category.id)}`}
                className="group block border border-beige/70 bg-cream-50 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-beige bg-white">
                  <category.icon className="h-5 w-5 text-olive" />
                </div>

                <h3 className="mb-2 text-2xl text-primary-800 transition-colors group-hover:text-gold-dark">
                  {category.name}
                </h3>
                <p className="mb-6 text-sm text-primary-600">
                  {category.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-primary-700">
                  Ver recetas
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
