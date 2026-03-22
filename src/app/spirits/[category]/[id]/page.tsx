'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { OriginWithFlag } from '@/components/ui/OriginWithFlag'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Package, 
  Award,
  Wine,
  Thermometer,
  Info,
  ShoppingCart,
  Beaker,
  Droplets,
  Sparkles,
  Eye,
  Palette,
  Clock,
  UtensilsCrossed,
  Building2,
  Globe,
  TrendingUp,
  BookOpen,
  Flower2
} from 'lucide-react'

interface Spirit {
  id: string
  name: string
  type: string
  category: string
  brand?: string
  producer?: string
  owner?: string
  description?: string
  image?: string
  abv?: number
  origin?: string
  denomination?: string
  price?: number
  rating: number
  isPremium: boolean
  composition?: string
  aging?: string
  color?: string
  aroma?: string
  taste?: string
  finish?: string
  servingSuggestions?: string
  temperature?: string
  pairings?: string
  trivia?: string
  presentations?: any
  createdAt: string
}

export default function SpiritDetailPage() {
  const params = useParams()
  const router = useRouter()
  const category = params?.category as string
  const id = params?.id as string
  
  const [spirit, setSpirit] = useState<Spirit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSpirit = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/spirits/${id}`)
        if (response.ok) {
          const data = await response.json()
          console.log('Spirit data:', data)
          setSpirit(data)
        }
      } catch (error) {
        console.error('Error loading spirit:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSpirit()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando destilado...</p>
        </div>
      </div>
    )
  }

  if (!spirit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Wine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Destilado no encontrado
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

  let presentations = []
  try {
    presentations = spirit.presentations ? JSON.parse(spirit.presentations) : []
  } catch (e) {
    presentations = []
  }

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
              <div className="relative h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                {spirit.image ? (
                  <img
                    src={spirit.image}
                    alt={spirit.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Wine className="h-48 w-48 text-amber-600 dark:text-amber-400" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    {spirit.isPremium && (
                      <span className="px-4 py-2 bg-yellow-400/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                        <Award className="h-4 w-4" />
                        Premium
                      </span>
                    )}
                    {spirit.category && (
                      <span className="px-4 py-2 bg-purple-600/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg">
                        {spirit.category}
                      </span>
                    )}
                  </div>
                  
                  {spirit.abv && (
                    <span className="px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-xl font-bold rounded-full shadow-lg">
                      {spirit.abv}% ABV
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              {spirit.price && (
                <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Precio aproximado</p>
                      <span className="text-4xl font-bold">${spirit.price.toFixed(2)}</span>
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
                {spirit.name}
              </h1>
              {spirit.brand && (
                <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
                  {spirit.brand}
                </p>
              )}
              
              {/* Origin & Producer */}
              <div className="flex flex-wrap gap-4 text-lg">
                {spirit.origin && (
                  <div className="flex flex-wrap items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 text-purple-600 shrink-0" />
                    <OriginWithFlag origin={spirit.origin} />
                    {spirit.denomination && (
                      <span className="text-gray-500 dark:text-gray-400">
                        • {spirit.denomination}
                      </span>
                    )}
                  </div>
                )}
                {spirit.producer && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <span>{spirit.producer}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(spirit.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-semibold">
                  {spirit.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>

            {/* Technical Details Grid - FIRST */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <Info className="h-8 w-8 text-purple-600" />
                Ficha Técnica Completa
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre Comercial */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">1. Nombre Comercial</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{spirit.name}</p>
                </div>

                {/* Tipo */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">2. Tipo</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{spirit.type}</p>
                </div>

                {/* Productor/Marca */}
                {spirit.producer && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">3. Productor / Marca</p>
                    <p className="text-gray-900 dark:text-white">
                      <span className="font-bold">{spirit.brand}</span>
                      {spirit.owner && <span className="block text-sm mt-1">Propietario: {spirit.owner}</span>}
                    </p>
                  </div>
                )}

                {/* Origen */}
                {spirit.origin && (
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">4. Origen</p>
                    <p className="text-gray-900 dark:text-white">
                      <OriginWithFlag
                        origin={spirit.origin}
                        textClassName="font-bold text-gray-900 dark:text-white"
                        flagWidth={40}
                      />
                      {spirit.denomination && (
                        <span className="block text-sm mt-2 font-normal text-gray-700 dark:text-gray-300">
                          Denominación: {spirit.denomination}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Composición */}
                {spirit.composition && (
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 md:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">5. Composición</p>
                    <p className="text-gray-900 dark:text-white">{spirit.composition}</p>
                  </div>
                )}

                {/* Envejecimiento */}
                {spirit.aging && (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 md:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">6. Envejecimiento</p>
                    <p className="text-gray-900 dark:text-white">{spirit.aging}</p>
                  </div>
                )}

                {/* ABV */}
                {spirit.abv && (
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 md:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">7. Graduación Alcohólica</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{spirit.abv}% Alc. Vol.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {spirit.description && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  Descripción General
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {spirit.description}
                </p>
              </div>
            )}

            {/* Organoleptic Characteristics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-600" />
                Características Organolépticas
              </h2>
              
              <div className="space-y-6">
                {spirit.color && (
                  <div className="border-l-4 border-amber-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Palette className="h-6 w-6 text-amber-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Color</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {spirit.color}
                    </p>
                  </div>
                )}

                {spirit.aroma && (
                  <div className="border-l-4 border-purple-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Flower2 className="h-6 w-6 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aroma (Nariz)</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {spirit.aroma}
                    </p>
                  </div>
                )}

                {spirit.taste && (
                  <div className="border-l-4 border-pink-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplets className="h-6 w-6 text-pink-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sabor (Boca)</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {spirit.taste}
                    </p>
                  </div>
                )}

                {spirit.finish && (
                  <div className="border-l-4 border-indigo-500 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-6 w-6 text-indigo-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Final</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {spirit.finish}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Presentations */}
            {presentations.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Package className="h-6 w-6 text-blue-600" />
                  Presentaciones Comerciales
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {presentations.map((pres: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Volumen:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{pres.volume}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Empaque:</span>
                          <span className="text-gray-900 dark:text-white">{pres.packaging}</span>
                        </div>
                        {pres.ean && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">EAN:</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300 font-mono">{pres.ean}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Serving Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spirit.servingSuggestions && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Wine className="h-5 w-5 text-green-600" />
                    Sugerencias de Servicio
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {spirit.servingSuggestions}
                  </p>
                </div>
              )}

              {spirit.temperature && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    Temperatura Ideal
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {spirit.temperature}
                  </p>
                </div>
              )}
            </div>

            {/* Pairing */}
            {spirit.pairings && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                  Maridaje Sugerido
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {spirit.pairings}
                </p>
              </div>
            )}

            {/* Trivia */}
            {spirit.trivia && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info className="h-6 w-6 text-yellow-600" />
                  Notas Curiosas / Historia
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {spirit.trivia}
                </p>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  )
}
