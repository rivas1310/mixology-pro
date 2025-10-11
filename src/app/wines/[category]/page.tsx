'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Wine,
  Search,
  Filter,
  Star,
  Clock,
  BarChart3,
  Award,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Package,
  Grape,
  Thermometer
} from 'lucide-react'

interface WineItem {
  id: string
  name: string
  category: string
  type: string
  brand?: string
  origin?: string
  region?: string
  grapeVariety?: string
  abv: number
  vintage?: number
  description: string
  image?: string
  rating: number
  isPremium: boolean
  price?: number
  servingTemp?: string
  color?: string
  aroma?: string
  taste?: string
  body?: string
  acidity?: string
  tannins?: string
  pairing?: string
  awards?: string
}

// Función para obtener el código de país desde el nombre
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
    'austria': 'AT',
    'grecia': 'GR', 'greece': 'GR',
    'hungría': 'HU', 'hungary': 'HU',
  }
  
  const normalized = countryName.toLowerCase().trim()
  return countryMap[normalized] || ''
}

// Configuración de categorías
const categoryConfig: { [key: string]: { name: string; icon: any; bgColor: string; description: string } } = {
  'red-wines': { 
    name: 'Vinos Tintos', 
    icon: Wine, 
    bgColor: 'from-red-500 to-red-700',
    description: 'Vinos tintos con cuerpo, taninos y complejidad' 
  },
  'white-wines': { 
    name: 'Vinos Blancos', 
    icon: Wine, 
    bgColor: 'from-yellow-400 to-yellow-600',
    description: 'Vinos blancos frescos y aromáticos' 
  },
  'rose-wines': { 
    name: 'Vinos Rosados', 
    icon: Wine, 
    bgColor: 'from-pink-400 to-pink-600',
    description: 'Vinos rosados ligeros y refrescantes' 
  },
  'sparkling-wines': { 
    name: 'Vinos Espumosos', 
    icon: Wine, 
    bgColor: 'from-amber-300 to-amber-500',
    description: 'Champagne, cava y otros espumosos' 
  },
  'dessert-wines': { 
    name: 'Vinos de Postre', 
    icon: Wine, 
    bgColor: 'from-orange-400 to-orange-600',
    description: 'Vinos dulces perfectos para postres' 
  },
  'fortified-wines': { 
    name: 'Vinos Fortificados', 
    icon: Wine, 
    bgColor: 'from-amber-600 to-amber-800',
    description: 'Oporto, jerez y otros vinos fortificados' 
  }
}

export default function WineCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [wines, setWines] = useState<WineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  useEffect(() => {
    params.then(p => setCategory(p.category))
  }, [params])

  const categoryInfo = category ? categoryConfig[category] : null

  useEffect(() => {
    if (!category || !categoryInfo) return

    const loadWines = async () => {
      try {
        const response = await fetch('/api/admin/wines')
        
        if (response.ok) {
          const data = await response.json()
          console.log('Total wines from API:', data.wines?.length || 0)
          
          const winesData = Array.isArray(data) ? data : (data.wines || [])
          
          // Mapear categorías de URL a categorías de base de datos
          const categoryMap: { [key: string]: string } = {
            'red-wines': 'RED',
            'white-wines': 'WHITE',
            'rose-wines': 'ROSE',
            'sparkling-wines': 'SPARKLING',
            'dessert-wines': 'DESSERT',
            'fortified-wines': 'FORTIFIED'
          }
          
          const dbCategory = categoryMap[category.toLowerCase()] || category.toUpperCase()
          const categoryName = categoryInfo?.name || category
          
          console.log('Looking for wines with category:', dbCategory)
          
          const filteredData = winesData.filter((wine: any) => {
            const wineCategory = wine.category?.toUpperCase() || ''
            const match = wineCategory === dbCategory
            if (match) {
              console.log('Match found:', wine.name, 'with category', wine.category)
            }
            return match
          })
          
          console.log('Filtered wines for category:', filteredData.length)
          
          // Transformar datos de la API al formato del componente
          const transformedWines: WineItem[] = filteredData.map((wine: any) => ({
            id: wine.id,
            name: wine.name,
            category: categoryName,
            type: wine.type || 'Vino',
            brand: wine.brand || 'Sin marca',
            origin: wine.origin || 'No especificado',
            region: wine.region,
            grapeVariety: wine.grapeVariety,
            abv: wine.abv || 0,
            vintage: wine.vintage,
            description: wine.description || 'Sin descripción',
            image: wine.image,
            rating: wine.rating || 4.0,
            isPremium: wine.isPremium || false,
            price: wine.price || 0,
            servingTemp: wine.servingTemp,
            color: wine.color,
            aroma: wine.aroma,
            taste: wine.taste,
            body: wine.body,
            acidity: wine.acidity,
            tannins: wine.tannins,
            pairing: wine.pairing,
            awards: wine.awards
          }))
          
          console.log('Final transformed wines:', transformedWines)
          setWines(transformedWines)
        }
      } catch (error) {
        console.error('Error loading wines:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryInfo) {
      loadWines()
    }
  }, [category, categoryInfo])

  const filteredWines = wines.filter(wine => {
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (wine.grapeVariety && wine.grapeVariety.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              wine.type.toLowerCase().includes(selectedSubcategory.toLowerCase())
    
    return matchesSearch && matchesSubcategory
  })

  // Agrupar vinos por tipo
  const groupedWines = wines.reduce((acc, wine) => {
    const subcategory = wine.type
    if (!acc[subcategory]) {
      acc[subcategory] = []
    }
    acc[subcategory].push(wine)
    return acc
  }, {} as Record<string, WineItem[]>)

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
            href="/wines"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Vinos
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando vinos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.bgColor} opacity-10`} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href="/wines"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Vinos
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${categoryInfo.bgColor} mb-6">
              <categoryInfo.icon className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {categoryInfo.name}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {categoryInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar vinos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wines Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubcategory === 'all' ? `${categoryInfo.name} Disponibles` : `${selectedSubcategory} - ${categoryInfo.name}`}
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredWines.length} vinos encontrados
            </span>
          </div>

          {searchTerm && filteredWines.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                No se encontraron vinos con &quot;{searchTerm}&quot;
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : selectedSubcategory === 'all' ? (
            // Mostrar agrupado por tipos cuando se selecciona "all"
            <div className="space-y-12">
              {Object.entries(groupedWines).map(([subcategory, subcategoryWines], groupIndex) => (
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
                      {subcategoryWines.length} vinos en esta subcategoría
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subcategoryWines.map((wine, index) => (
                      <motion.div
                        key={wine.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <WineCard wine={wine} categoryInfo={categoryInfo} category={category} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Mostrar vinos filtradas por subcategoría
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWines.map((wine, index) => (
                <motion.div
                  key={wine.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <WineCard wine={wine} categoryInfo={categoryInfo} category={category} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Componente de Card de Vino
function WineCard({ wine, categoryInfo, category }: { wine: WineItem; categoryInfo: any; category: string }) {
  const countryCode = getCountryCode(wine.origin || '')
  
  return (
    <Link href={`/wines/${category}/${wine.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {wine.image ? (
          <img
            src={wine.image}
            alt={wine.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
            <Wine className="h-20 w-20 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badges Container */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {wine.isPremium && (
              <span className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                <Award className="h-3 w-3" />
                Premium
              </span>
            )}
            {wine.vintage && (
              <span className="px-3 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                {wine.vintage}
              </span>
            )}
          </div>
          
          {/* ABV Badge */}
          <span className="px-3 py-1.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-bold rounded-full shadow-lg">
            {wine.abv}%
          </span>
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
            {wine.name}
          </h3>
          <p className="text-sm text-white/90 drop-shadow">
            {wine.brand}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Origin & Location */}
        {wine.origin && (
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
            {countryCode ? (
              <img 
                src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                alt={wine.origin}
                className="h-5 w-auto rounded shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : (
              <MapPin className="h-5 w-5 text-purple-600" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {wine.origin}
              {wine.region && <span className="text-gray-500 dark:text-gray-400"> • {wine.region}</span>}
            </span>
          </div>
        )}

        {/* Grape Variety */}
        {wine.grapeVariety && (
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Grape className="h-4 w-4" />
              <span className="font-semibold">Uva:</span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white font-medium">{wine.grapeVariety}</p>
          </div>
        )}

        {/* Wine Characteristics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {wine.servingTemp && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Servir</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{wine.servingTemp}</p>
            </div>
          )}

          {wine.body && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Cuerpo</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{wine.body}</p>
            </div>
          )}

          {wine.color && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🎨 Color</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{wine.color}</p>
            </div>
          )}
        </div>

        {/* Tasting Notes */}
        {(wine.aroma || wine.taste) && (
          <div className="mb-4 space-y-2">
            {wine.aroma && (
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">👃 Aroma:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{wine.aroma}</p>
              </div>
            )}
            {wine.taste && (
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">👅 Sabor:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{wine.taste}</p>
              </div>
            )}
          </div>
        )}

        {/* Pairing */}
        {wine.pairing && (
          <div className="mb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
              🍽️ Maridaje:
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{wine.pairing}</p>
          </div>
        )}

        {/* Awards */}
        {wine.awards && (
          <div className="mb-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
              🏆 Premios:
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{wine.awards}</p>
          </div>
        )}

        {/* Price - Push to bottom */}
        {wine.price && (
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ${wine.price.toFixed(2)}
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
  )
}

