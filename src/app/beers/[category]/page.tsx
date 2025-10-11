'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Droplets,
  Zap,
  Award,
  BookOpen,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Plus,
  Minus,
  Info,
  Calendar,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Package,
  Wine,
  ShoppingCart,
  DollarSign,
  Shield,
  Flame,
  Snowflake,
  Heart
} from 'lucide-react'

interface Beer {
  id: string
  name: string
  category: string
  type: string
  brewery?: string
  origin?: string
  state?: string
  abv: number
  ibu?: number
  description: string
  flavors: string[]
  pairings: string[]
  image?: string
  rating: number
  isPremium: boolean
  isCraft?: boolean
  price?: number
  servingTemp?: string
  color?: string
  aroma?: string
  flavor?: string
  pairing?: string
  glassType?: string
}

// Función para obtener el código de país desde el nombre
const getCountryCode = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'méxico': 'MX', 'mexico': 'MX',
    'estados unidos': 'US', 'usa': 'US', 'eeuu': 'US',
    'alemania': 'DE', 'germany': 'DE',
    'bélgica': 'BE', 'belgica': 'BE', 'belgium': 'BE',
    'reino unido': 'GB', 'inglaterra': 'GB', 'uk': 'GB', 'gran bretaña': 'GB',
    'irlanda': 'IE', 'ireland': 'IE',
    'holanda': 'NL', 'países bajos': 'NL', 'netherlands': 'NL',
    'españa': 'ES', 'spain': 'ES',
    'república checa': 'CZ', 'checa': 'CZ', 'czech': 'CZ',
    'japón': 'JP', 'japan': 'JP',
    'china': 'CN',
    'brasil': 'BR', 'brazil': 'BR',
    'argentina': 'AR',
    'chile': 'CL',
    'colombia': 'CO',
    'perú': 'PE', 'peru': 'PE',
    'canadá': 'CA', 'canada': 'CA',
    'australia': 'AU',
    'francia': 'FR', 'france': 'FR',
    'italia': 'IT', 'italy': 'IT',
    'portugal': 'PT'
  }
  
  const normalized = countryName.toLowerCase().trim()
  return countryMap[normalized] || ''
}

const categoryConfig = {
  lagers: {
    name: 'Lagers',
    icon: Wine,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    description: 'Cervezas doradas, refrescantes y fáciles de beber',
    subcategories: ['Pilsner', 'Helles', 'Dunkel', 'Bock']
  },
  ales: {
    name: 'Ales',
    icon: Star,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Cervezas con más cuerpo y sabor, fermentación alta',
    subcategories: ['IPA', 'Pale Ale', 'Stout', 'Porter']
  },
  wheat: {
    name: 'Trigo',
    icon: Droplets,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Cervezas de trigo, suaves y refrescantes',
    subcategories: ['Hefeweizen', 'Witbier', 'Weissbier', 'American Wheat']
  },
  specialty: {
    name: 'Especiales',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Cervezas artesanales y de temporada',
    subcategories: ['Sour', 'Fruit Beer', 'Barrel Aged', 'Seasonal']
  },
  crafts: {
    name: 'Artesanales',
    icon: Flame,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Cervezas artesanales de alta calidad',
    subcategories: ['IPA Artesanal', 'Pale Ale Artesanal', 'Stout Artesanal', 'Porter Artesanal']
  },
  imports: {
    name: 'Importadas',
    icon: Package,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Cervezas importadas de todo el mundo',
    subcategories: ['Alemanas', 'Belgas', 'Británicas', 'Americanas']
  },
  nonalcoholic: {
    name: 'Sin Alcohol',
    icon: Snowflake,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-cyan-900/20',
    description: 'Cervezas sin alcohol con gran sabor',
    subcategories: ['Lager 0%', 'Ale 0%', 'Wheat 0%', 'IPA 0%']
  },
  seasonal: {
    name: 'De Temporada',
    icon: Calendar,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Cervezas especiales de temporada',
    subcategories: ['Primavera', 'Verano', 'Otoño', 'Invierno']
  }
}


export default function CategoryBeersPage() {
  const params = useParams()
  const category = params?.category as string
  const [beers, setBeers] = useState<Beer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')

  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig]

  useEffect(() => {
    const loadBeers = async () => {
      try {
        setLoading(true)
        console.log('Loading beers for category:', category)
        
        // Cargar cervezas reales desde la API
        const response = await fetch(`/api/beers?limit=1000`)
        console.log('API Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Total beers from API:', data.beers?.length || 0)
          
          const beersData = Array.isArray(data) ? data : (data.beers || [])
          
          // Mapear categorías de URL a categorías de base de datos
          const categoryMap: { [key: string]: string } = {
            'lagers': 'LAGER',
            'ales': 'ALE',
            'wheat': 'WHEAT',
            'specialty': 'SPECIALTY',
            'crafts': 'CRAFT',
            'imports': 'IMPORT',
            'nonalcoholic': 'NONALCOHOLIC',
            'seasonal': 'SEASONAL'
          }
          
          const dbCategory = categoryMap[category.toLowerCase()] || category.toUpperCase()
          const categoryName = categoryInfo?.name || category
          
          console.log('Looking for beers with category:', dbCategory)
          
          const filteredData = beersData.filter((beer: any) => {
            const beerCategory = beer.category?.toUpperCase() || ''
            const match = beerCategory === dbCategory
            if (match) {
              console.log('Match found:', beer.name, 'with category', beer.category)
            }
            return match
          })
          
          console.log('Filtered beers for category:', filteredData.length)
          
          // Transformar datos de la API al formato del componente
          const transformedBeers: Beer[] = filteredData.map((beer: any) => ({
            id: beer.id,
            name: beer.name,
            category: categoryName,
            type: beer.type || 'Cerveza',
            brewery: beer.brand || 'Sin marca',
            origin: beer.origin || 'No especificado',
            state: beer.state,
            abv: beer.abv || 0,
            ibu: beer.ibu || 0,
            description: beer.description || 'Sin descripción',
            flavors: ['Malta', 'Lúpulo', 'Equilibrado'],
            pairings: ['Comida casual', 'Snacks', 'Platillos típicos'],
            image: beer.image,
            rating: beer.rating || 4.0,
            isPremium: beer.isPremium || false,
            isCraft: beer.isCraft || false,
            price: beer.price || 0,
            servingTemp: beer.servingTemp || '4-7°C',
            color: beer.color,
            aroma: beer.aroma,
            flavor: beer.flavor,
            pairing: beer.pairing,
            glassType: beer.glassType
          }))
          
          console.log('Final transformed beers:', transformedBeers)
          setBeers(transformedBeers)
        }
      } catch (error) {
        console.error('Error loading beers:', error)
        setBeers([])
      } finally {
        setLoading(false)
      }
    }

    if (categoryInfo) {
      loadBeers()
    }
  }, [category, categoryInfo])

  const filteredBeers = beers.filter(beer => {
    const matchesSearch = beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              beer.type.toLowerCase().includes(selectedSubcategory.toLowerCase())
    
    return matchesSearch && matchesSubcategory
  })

  // Agrupar cervezas por subcategoría para mostrar mejor organización
  const groupedBeers = beers.reduce((acc, beer) => {
    const subcategory = beer.type
    if (!acc[subcategory]) {
      acc[subcategory] = []
    }
    acc[subcategory].push(beer)
    return acc
  }, {} as Record<string, Beer[]>)

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Categoría no encontrada
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            La categoría &quot;{category}&quot; no existe.
          </p>
          <Link
            href="/beers"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Cervezas
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando cervezas...</p>
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
          {/* Back Button */}
          <Link
            href="/beers"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Cervezas
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className={`relative w-20 h-20 bg-gradient-to-br ${categoryInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <categoryInfo.icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {categoryInfo.description}
            </p>
            <div className="flex justify-center gap-4 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" /> {beers.length} Cervezas
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" /> Premium
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Buscar en ${categoryInfo.name.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                />
              </div>

              {/* Subcategory Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none"
                >
                  <option value="all">Todas las Subcategorías</option>
                  {categoryInfo.subcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none">
                  <option value="name">Ordenar por Nombre</option>
                  <option value="rating">Ordenar por Rating</option>
                  <option value="price">Ordenar por Precio</option>
                  <option value="abv">Ordenar por ABV</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Subcategorías de {categoryInfo.name}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryInfo.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? 'all' : subcategory)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedSubcategory === subcategory
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-sm mb-1">{subcategory}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {beers.filter(beer => beer.type.toLowerCase().includes(subcategory.toLowerCase())).length} cervezas
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubcategory === 'all' ? `${categoryInfo.name} Disponibles` : `${selectedSubcategory} - ${categoryInfo.name}`}
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredBeers.length} cervezas encontradas
            </span>
          </div>

          {filteredBeers.length === 0 ? (
            <div className="text-center py-20">
              <categoryInfo.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron cervezas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay cervezas disponibles en esta categoría'}
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
          ) : selectedSubcategory === 'all' ? (
            // Mostrar agrupado por subcategorías cuando se selecciona "all"
            <div className="space-y-12">
              {Object.entries(groupedBeers).map(([subcategory, subcategoryBeers], groupIndex) => (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {subcategory}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {subcategoryBeers.length} cervezas en esta subcategoría
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategoryBeers.map((beer, index) => (
                      <motion.div
                        key={beer.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <Link href={`/beers/${category}/${beer.id}`}>
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer">
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden">
                            {beer.image ? (
                              <img
                                src={beer.image}
                                alt={beer.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
                                <categoryInfo.icon className="h-20 w-20 text-purple-600 dark:text-purple-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            
                            {/* Badges Container */}
                            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                              <div className="flex flex-col gap-2">
                                {beer.isCraft && (
                                  <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                                    🍺 Artesanal
                                  </span>
                                )}
                                {beer.isPremium && (
                                  <span className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                                    <Award className="h-3 w-3" />
                                    Premium
                                  </span>
                                )}
                              </div>
                              
                              {/* ABV Badge */}
                              <span className="px-3 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-bold rounded-full shadow-lg">
                                {beer.abv}%
                              </span>
                            </div>

                            {/* Bottom Info on Image */}
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                                {beer.name}
                              </h3>
                              <p className="text-sm text-white/90 drop-shadow">
                                {beer.brewery}
                              </p>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col">
                            {/* Origin & Location */}
                            {beer.origin && (
                              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                                {(() => {
                                  const countryCode = getCountryCode(beer.origin)
                                  return countryCode ? (
                                    <img 
                                      src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                                      alt={beer.origin}
                                      className="h-5 w-auto rounded shadow-sm"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none'
                                      }}
                                    />
                                  ) : (
                                    <MapPin className="h-5 w-5 text-purple-600" />
                                  )
                                })()}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {beer.origin}
                                  {beer.state && <span className="text-gray-500 dark:text-gray-400"> • {beer.state}</span>}
                                </span>
                              </div>
                            )}

                            {/* Technical Details Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">IBU</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.ibu}</p>
                              </div>

                              {beer.servingTemp && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Servir</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">{beer.servingTemp}</p>
                                </div>
                              )}

                              {beer.color && (
                                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 col-span-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🎨 Color</span>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{beer.color}</p>
                                </div>
                              )}

                              {beer.glassType && (
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 col-span-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🍺 Vaso</span>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{beer.glassType}</p>
                                </div>
                              )}
                            </div>

                            {/* Tasting Notes */}
                            {(beer.aroma || beer.flavor) && (
                              <div className="mb-4 space-y-2">
                                {beer.aroma && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">👃 Aroma:</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{beer.aroma}</p>
                                  </div>
                                )}
                                {beer.flavor && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">👅 Sabor:</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{beer.flavor}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Pairing */}
                            {beer.pairing && (
                              <div className="mb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3">
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                                  🍽️ Maridaje:
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{beer.pairing}</p>
                              </div>
                            )}

                            {/* Price - Push to bottom */}
                            {beer.price && (
                              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    ${beer.price.toFixed(2)}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    por botella
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Mostrar cervezas filtradas por subcategoría
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBeers.map((beer, index) => (
                <motion.div
                  key={beer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/beers/${category}/${beer.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {beer.image ? (
                        <img
                          src={beer.image}
                          alt={beer.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
                          <categoryInfo.icon className="h-20 w-20 text-purple-600 dark:text-purple-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Badges Container */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                          {beer.isCraft && (
                            <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                              🍺 Artesanal
                            </span>
                          )}
                          {beer.isPremium && (
                            <span className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                              <Award className="h-3 w-3" />
                              Premium
                            </span>
                          )}
                        </div>
                        
                        {/* ABV Badge */}
                        <span className="px-3 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-bold rounded-full shadow-lg">
                          {beer.abv}%
                        </span>
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                          {beer.name}
                        </h3>
                        <p className="text-sm text-white/90 drop-shadow">
                          {beer.brewery}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Origin & Location */}
                      {beer.origin && (
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                          {(() => {
                            const countryCode = getCountryCode(beer.origin)
                            return countryCode ? (
                              <img 
                                src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                                alt={beer.origin}
                                className="h-5 w-auto rounded shadow-sm"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            ) : (
                              <MapPin className="h-5 w-5 text-purple-600" />
                            )
                          })()}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {beer.origin}
                            {beer.state && <span className="text-gray-500 dark:text-gray-400"> • {beer.state}</span>}
                          </span>
                        </div>
                      )}

                      {/* Technical Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">IBU</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{beer.ibu}</p>
                        </div>

                        {beer.servingTemp && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Servir</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{beer.servingTemp}</p>
                          </div>
                        )}

                        {beer.color && (
                          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🎨 Color</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{beer.color}</p>
                          </div>
                        )}

                        {beer.glassType && (
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🍺 Vaso</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{beer.glassType}</p>
                          </div>
                        )}
                      </div>

                      {/* Tasting Notes */}
                      {(beer.aroma || beer.flavor) && (
                        <div className="mb-4 space-y-2">
                          {beer.aroma && (
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">👃 Aroma:</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{beer.aroma}</p>
                            </div>
                          )}
                          {beer.flavor && (
                            <div>
                              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">👅 Sabor:</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{beer.flavor}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pairing */}
                      {beer.pairing && (
                        <div className="mb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                            🍽️ Maridaje:
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{beer.pairing}</p>
                        </div>
                      )}

                      {/* Price - Push to bottom */}
                      {beer.price && (
                        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              ${beer.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              por botella
                            </span>
                          </div>
                        </div>
                        )}
                    </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
