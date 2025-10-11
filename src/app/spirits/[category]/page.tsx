'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { 
  Search, 
  Star, 
  MapPin, 
  Package, 
  Award,
  ArrowLeft,
  Wine,
  Flame,
  Droplets,
  Zap,
  Target,
  BarChart3,
  Clock,
  DollarSign
} from 'lucide-react'

interface Spirit {
  id: string
  name: string
  type: string
  category: string
  brand?: string
  description?: string
  image?: string
  abv?: number
  origin?: string
  price?: number
  rating: number
  isPremium: boolean
  createdAt: string
}

const categoryConfig = {
  whiskey: {
    icon: Flame,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Destilados de grano con carácter único',
    examples: ['Scotch Whisky', 'Bourbon', 'Irish Whiskey', 'Japanese Whisky']
  },
  vodka: {
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Destilado neutro y versátil',
    examples: ['Russian Vodka', 'Polish Vodka', 'French Vodka', 'American Vodka']
  },
  gin: {
    icon: Zap,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Aromatizado con bayas de enebro',
    examples: ['London Dry Gin', 'Plymouth Gin', 'Old Tom Gin', 'Navy Strength']
  },
  rum: {
    icon: Target,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Destilado de caña de azúcar',
    examples: ['White Rum', 'Gold Rum', 'Dark Rum', 'Spiced Rum']
  },
  tequila: {
    icon: BarChart3,
    color: 'from-lime-500 to-green-600',
    bgColor: 'from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20',
    description: 'Destilado de agave azul',
    examples: ['Blanco', 'Reposado', 'Añejo', 'Extra Añejo']
  },
  cognac: {
    icon: Award,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    description: 'Brandy francés de prestigio',
    examples: ['VS', 'VSOP', 'XO', 'Hors d\'Age']
  },
  liqueurs: {
    icon: Wine,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    description: 'Bebidas alcohólicas dulces y aromatizadas',
    examples: ['Baileys', 'Kahlúa', 'Cointreau', 'Grand Marnier']
  },
  amaretto: {
    icon: Award,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Licor de almendras italiano',
    examples: ['Disaronno', 'Lazzaroni', 'Gozio', 'Luxardo']
  },
  schnapps: {
    icon: Droplets,
    color: 'from-green-500 to-lime-600',
    bgColor: 'from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20',
    description: 'Licores de frutas alemanes',
    examples: ['Peach Schnapps', 'Apple Schnapps', 'Cherry Schnapps', 'Pear Schnapps']
  }
}

async function fetchSpirits(category: string, search?: string) {
  try {
    // Mapear categorías de URL a categorías de base de datos
    const categoryMap: { [key: string]: string } = {
      'liqueurs': 'LIQUEUR',
      'whiskey': 'WHISKEY',
      'vodka': 'VODKA',
      'gin': 'GIN',
      'rum': 'RUM',
      'tequila': 'TEQUILA',
      'cognac': 'COGNAC',
      'amaretto': 'AMARETTO',
      'schnapps': 'SCHNAPPS'
    }
    
    const dbCategory = categoryMap[category.toLowerCase()] || category.toUpperCase()
    
    const params = new URLSearchParams()
    params.append('category', dbCategory)
    
    if (search) {
      params.append('search', search)
    }
    
    const url = `/api/spirits?${params.toString()}`
    console.log('Fetching spirits from:', url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Error al cargar licores')
    }
    
    const data = await response.json()
    console.log('Spirits API response:', data)
    
    // La API puede devolver { spirits: [...] } o directamente un array
    let spirits = Array.isArray(data) ? data : (data.spirits || [])
    
    console.log('Spirits array:', spirits)
    
    return spirits
  } catch (error) {
    console.error('Error fetching spirits:', error)
    return []
  }
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = params?.category as string
  const [searchTerm, setSearchTerm] = useState('')
  const [spirits, setSpirits] = useState<Spirit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSpirits = async () => {
      setLoading(true)
      try {
        const data = await fetchSpirits(category, searchTerm)
        console.log('Data received in component:', data)
        // Asegurarse de que siempre sea un array
        setSpirits(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error loading spirits:', error)
        setSpirits([])
      } finally {
        setLoading(false)
      }
    }

    loadSpirits()
  }, [category, searchTerm])

  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig]
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Categoría no encontrada
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            La categoría &quot;{category}&quot; no existe.
          </p>
          <button
            onClick={() => router.push('/spirits')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Licores
          </button>
        </div>
      </div>
    )
  }

  const config = categoryInfo

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando licores...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <button
              onClick={() => router.back()}
              className="absolute left-4 top-4 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver
            </button>
            <div className={`relative w-20 h-20 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <config.icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {config.description}
            </p>
            <div className="flex justify-center gap-4 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" /> {spirits.length} Licores
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" /> Premium
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Buscar en ${category.charAt(0).toUpperCase() + category.slice(1)}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spirits Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Cargando licores...</p>
            </div>
          ) : spirits.length === 0 ? (
            <div className="text-center py-20">
              <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron licores
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay licores disponibles en esta categoría'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spirits.map((spirit, index) => (
                <motion.div
                  key={spirit.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Image */}
                    <a href={`/spirits/${category}/${spirit.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        {spirit.image ? (
                          <img
                            src={spirit.image}
                            alt={spirit.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <>
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.bgColor}`} />
                            <div className="w-full h-full flex items-center justify-center">
                              <config.icon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                            </div>
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Premium Badge */}
                        {spirit.isPremium && (
                          <div className="absolute top-4 left-4">
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-full flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              Premium
                            </span>
                          </div>
                        )}

                        {/* ABV Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                            {spirit.abv || 0}% ABV
                          </span>
                        </div>
                      </div>
                    </a>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <a href={`/spirits/${category}/${spirit.id}`} className="block">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {spirit.name}
                          </h3>
                        </a>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Package className="h-4 w-4" />
                          {spirit.type}
                        </div>
                        {spirit.origin && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <MapPin className="h-4 w-4" />
                            {spirit.origin}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {spirit.rating.toFixed(1)} ({Math.floor(Math.random() * 50) + 10} reviews)
                        </div>
                      </div>

                      {spirit.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {spirit.description}
                        </p>
                      )}

                      {spirit.price && (
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${spirit.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            por botella
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4">
                        <a
                          href={`/spirits/${category}/${spirit.id}`}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Ver Ficha Técnica
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
