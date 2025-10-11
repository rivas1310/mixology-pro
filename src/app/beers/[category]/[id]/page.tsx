'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Award,
  Beer,
  Thermometer,
  Info,
  ShoppingCart,
  Palette,
  UtensilsCrossed,
  BookOpen,
  Flower2,
  Droplets,
  Wine,
  BarChart3
} from 'lucide-react'

interface BeerDetail {
  id: string
  name: string
  brand: string
  type: string
  category: string
  description?: string
  image?: string
  abv?: number
  ibu?: number
  origin?: string
  state?: string
  servingTemp?: string
  price?: number
  rating: number
  isCraft: boolean
  isPremium: boolean
  // Notas de cata
  tastingNotes?: string
  color?: string
  aroma?: string
  flavor?: string
  pairing?: string
  glassType?: string
}

// Función para obtener el código de país
const getCountryCode = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'méxico': 'MX', 'mexico': 'MX',
    'estados unidos': 'US', 'usa': 'US', 'eeuu': 'US',
    'alemania': 'DE', 'germany': 'DE',
    'bélgica': 'BE', 'belgica': 'BE', 'belgium': 'BE',
    'reino unido': 'GB', 'inglaterra': 'GB', 'uk': 'GB',
    'irlanda': 'IE', 'ireland': 'IE',
    'holanda': 'NL', 'países bajos': 'NL',
    'españa': 'ES', 'spain': 'ES',
    'república checa': 'CZ', 'checa': 'CZ',
    'japón': 'JP', 'japan': 'JP',
  }
  
  const normalized = countryName.toLowerCase().trim()
  return countryMap[normalized] || ''
}

export default function BeerDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [beer, setBeer] = useState<BeerDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    params.then(p => {
      setCategory(p.category)
      setId(p.id)
    })
  }, [params])

  useEffect(() => {
    if (!id) return

    const loadBeer = async () => {
      try {
        const response = await fetch(`/api/beers/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setBeer(data)
        }
      } catch (error) {
        console.error('Error loading beer:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBeer()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando cerveza...</p>
        </div>
      </div>
    )
  }

  if (!beer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Beer className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cerveza no encontrada
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  const countryCode = getCountryCode(beer.origin || '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Image Column - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Image */}
              <div className="relative h-[600px] bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                {beer.image ? (
                  <img
                    src={beer.image}
                    alt={beer.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Beer className="h-48 w-48 text-amber-600 dark:text-amber-400" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    {beer.isCraft && (
                      <span className="px-4 py-2 bg-amber-500/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg">
                        🍺 Artesanal
                      </span>
                    )}
                    {beer.isPremium && (
                      <span className="px-4 py-2 bg-yellow-400/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                        <Award className="h-4 w-4" />
                        Premium
                      </span>
                    )}
                  </div>
                  
                  {beer.abv && (
                    <span className="px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-xl font-bold rounded-full shadow-lg">
                      {beer.abv}% ABV
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              {beer.price && (
                <div className="p-6 bg-gradient-to-r from-amber-600 to-orange-600">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Precio aproximado</p>
                      <span className="text-4xl font-bold">${beer.price.toFixed(2)}</span>
                    </div>
                    <ShoppingCart className="h-8 w-8 opacity-75" />
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
            className="lg:col-span-3 space-y-8"
          >
            {/* Title & Brand */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3">
                {beer.name}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
                {beer.brand}
              </p>
              
              {/* Origin */}
              {beer.origin && (
                <div className="flex items-center gap-3 text-lg">
                  {countryCode && (
                    <img 
                      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                      alt={beer.origin}
                      className="h-8 w-auto rounded shadow-sm"
                    />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    {beer.origin}
                    {beer.state && <span className="text-gray-500 dark:text-gray-400"> • {beer.state}</span>}
                  </span>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(beer.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-semibold">
                  {beer.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>

            {/* Technical Details Grid - FIRST */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <Info className="h-8 w-8 text-amber-600" />
                Ficha Técnica
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Nombre</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.name}</p>
                </div>

                {/* Marca */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Cervecería</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.brand}</p>
                </div>

                {/* Estilo */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Estilo</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.category}</p>
                </div>

                {/* Tipo */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Tipo</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.type}</p>
                </div>

                {/* ABV */}
                {beer.abv && (
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Alcohol (ABV)</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{beer.abv}%</p>
                  </div>
                )}

                {/* IBU */}
                {beer.ibu && (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Amargor (IBU)</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{beer.ibu}</p>
                  </div>
                )}

                {/* Temperatura */}
                {beer.servingTemp && (
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Temperatura de Servicio</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.servingTemp}</p>
                  </div>
                )}

                {/* Vaso */}
                {beer.glassType && (
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Tipo de Vaso</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.glassType}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {beer.description && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  Descripción
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {beer.description}
                </p>
              </div>
            )}

            {/* Tasting Notes */}
            {beer.tastingNotes && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Wine className="h-6 w-6 text-amber-600" />
                  Notas de Cata
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {beer.tastingNotes}
                </p>
              </div>
            )}

            {/* Organoleptic Characteristics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                Características Organolépticas
              </h2>
              
              <div className="space-y-6">
                {beer.color && (
                  <div className="border-l-4 border-amber-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Palette className="h-6 w-6 text-amber-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Color</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {beer.color}
                    </p>
                  </div>
                )}

                {beer.aroma && (
                  <div className="border-l-4 border-purple-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Flower2 className="h-6 w-6 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aroma</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {beer.aroma}
                    </p>
                  </div>
                )}

                {beer.flavor && (
                  <div className="border-l-4 border-pink-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplets className="h-6 w-6 text-pink-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sabor</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {beer.flavor}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pairing */}
            {beer.pairing && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                  Maridaje Recomendado
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {beer.pairing}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

