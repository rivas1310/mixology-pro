'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Wine,
  Star,
  Clock,
  BarChart3,
  Award,
  MapPin,
  ArrowLeft,
  Grape,
  Thermometer,
  Calendar,
  Droplets,
  Sparkles,
  UtensilsCrossed
} from 'lucide-react'

interface WineDetail {
  id: string
  name: string
  brand: string
  type: string
  category: string
  description?: string
  image?: string
  abv?: number
  vintage?: number
  origin?: string
  region?: string
  denomination?: string
  grapeVariety?: string
  winery?: string
  servingTemp?: string
  price?: number
  rating: number
  isPremium: boolean
  tastingNotes?: string
  color?: string
  aroma?: string
  taste?: string
  body?: string
  acidity?: string
  tannins?: string
  finish?: string
  pairing?: string
  awards?: string
}

// Función para obtener el código de país
const getCountryCode = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'méxico': 'MX', 'mexico': 'MX',
    'españa': 'ES', 'spain': 'ES',
    'francia': 'FR', 'france': 'FR',
    'italia': 'IT', 'italy': 'IT',
    'portugal': 'PT',
    'alemania': 'DE', 'germany': 'DE',
    'argentina': 'AR',
    'chile': 'CL',
    'estados unidos': 'US', 'usa': 'US', 'eeuu': 'US',
    'australia': 'AU',
    'nueva zelanda': 'NZ', 'new zealand': 'NZ',
    'sudáfrica': 'ZA', 'south africa': 'ZA',
  }
  
  const normalized = countryName.toLowerCase().trim()
  return countryMap[normalized] || ''
}

export default function WineDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [wine, setWine] = useState<WineDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(p => {
      setCategory(p.category)
      setId(p.id)
    })
  }, [params])

  useEffect(() => {
    if (!id) return

    const loadWine = async () => {
      try {
        const response = await fetch(`/api/admin/wines/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setWine(data)
        }
      } catch (error) {
        console.error('Error loading wine:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWine()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando vino...</p>
        </div>
      </div>
    )
  }

  if (!wine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Wine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vino no encontrado
          </h1>
          <Link
            href={`/wines/${category}`}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors inline-block"
          >
            Volver a la categoría
          </Link>
        </div>
      </div>
    )
  }

  const countryCode = getCountryCode(wine.origin || '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/wines/${category}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a la categoría
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {wine.image ? (
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-[600px] object-cover"
                />
              ) : (
                <div className="w-full h-[600px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Wine className="h-40 w-40 text-white" />
                </div>
              )}
              
              {/* Badges on image */}
              <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  {wine.isPremium && (
                    <span className="px-4 py-2 bg-yellow-400/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                      <Award className="h-4 w-4" />
                      Premium
                    </span>
                  )}
                  {wine.vintage && (
                    <span className="px-4 py-2 bg-purple-600/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      {wine.vintage}
                    </span>
                  )}
                </div>
                
                {wine.abv && (
                  <span className="px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-lg font-bold rounded-full shadow-lg">
                    {wine.abv}% ABV
                  </span>
                )}
              </div>

              {/* Price at bottom */}
              {wine.price && (
                <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-3xl font-bold">${wine.price.toFixed(2)}</span>
                    <span className="text-sm opacity-90">por botella</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Column - Scrollable */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title & Brand */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {wine.name}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
                {wine.brand}
              </p>
              
              {/* Origin */}
              {wine.origin && (
                <div className="flex items-center gap-3 text-lg">
                  {countryCode && (
                    <img 
                      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                      alt={wine.origin}
                      className="h-8 w-auto rounded shadow-sm"
                    />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    {wine.origin}
                    {wine.region && <span className="text-gray-500 dark:text-gray-400"> • {wine.region}</span>}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {wine.description && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {wine.description}
                </p>
              </div>
            )}

            {/* Denomination & Winery */}
            {(wine.denomination || wine.winery) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wine.denomination && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Denominación</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{wine.denomination}</p>
                  </div>
                )}
                {wine.winery && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Bodega</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{wine.winery}</p>
                  </div>
                )}
              </div>
            )}

            {/* Grape Variety */}
            {wine.grapeVariety && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-2">
                  <Grape className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Variedad de Uva</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{wine.grapeVariety}</p>
              </div>
            )}

            {/* Technical Characteristics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Características Técnicas</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wine.servingTemp && (
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <Thermometer className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Temperatura</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{wine.servingTemp}</p>
                  </div>
                )}
                
                {wine.body && (
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cuerpo</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{wine.body}</p>
                  </div>
                )}
                
                {wine.acidity && (
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                    <Droplets className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Acidez</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{wine.acidity}</p>
                  </div>
                )}
                
                {wine.tannins && (
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <Wine className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Taninos</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{wine.tannins}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tasting Notes */}
            {wine.tastingNotes && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-amber-600" />
                  Notas de Cata
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{wine.tastingNotes}</p>
              </div>
            )}

            {/* Detailed Tasting */}
            <div className="space-y-4">
              {wine.color && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">🎨 Color</p>
                  <p className="text-gray-900 dark:text-white">{wine.color}</p>
                </div>
              )}
              
              {wine.aroma && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">👃 Aroma</p>
                  <p className="text-gray-900 dark:text-white">{wine.aroma}</p>
                </div>
              )}
              
              {wine.taste && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">👅 Sabor en Boca</p>
                  <p className="text-gray-900 dark:text-white">{wine.taste}</p>
                </div>
              )}
              
              {wine.finish && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">✨ Final</p>
                  <p className="text-gray-900 dark:text-white">{wine.finish}</p>
                </div>
              )}
            </div>

            {/* Pairing */}
            {wine.pairing && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                  Maridaje Recomendado
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{wine.pairing}</p>
              </div>
            )}

            {/* Awards */}
            {wine.awards && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  Premios y Reconocimientos
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{wine.awards}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

