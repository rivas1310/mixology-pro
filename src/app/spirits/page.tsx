'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Package, 
  Award,
  Wine,
  Flame,
  Droplets,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
  Clock,
  DollarSign,
  Heart,
  Apple
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

const spiritCategories = [
  // DESTILADOS
  {
    id: 'whiskey',
    name: 'Whiskey',
    type: 'destilado',
    icon: Flame,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-amber-900/20',
    description: 'Destilados de grano con carácter único',
    count: 25,
    examples: ['Scotch Whisky', 'Bourbon', 'Irish Whiskey', 'Japanese Whisky']
  },
  {
    id: 'vodka',
    name: 'Vodka',
    type: 'destilado',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Destilado neutro y versátil',
    count: 20,
    examples: ['Russian Vodka', 'Polish Vodka', 'French Vodka', 'American Vodka']
  },
  {
    id: 'gin',
    name: 'Gin',
    type: 'destilado',
    icon: Zap,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-green-900/20',
    description: 'Aromatizado con bayas de enebro',
    count: 18,
    examples: ['London Dry Gin', 'Plymouth Gin', 'Old Tom Gin', 'Navy Strength']
  },
  {
    id: 'rum',
    name: 'Ron',
    type: 'destilado',
    icon: Target,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Destilado de caña de azúcar',
    count: 22,
    examples: ['White Rum', 'Gold Rum', 'Dark Rum', 'Spiced Rum']
  },
  {
    id: 'tequila',
    name: 'Tequila',
    type: 'destilado',
    icon: BarChart3,
    color: 'from-lime-500 to-green-600',
    bgColor: 'from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20',
    description: 'Destilado de agave azul',
    count: 15,
    examples: ['Blanco', 'Reposado', 'Añejo', 'Extra Añejo']
  },
  {
    id: 'cognac',
    name: 'Cognac',
    type: 'destilado',
    icon: Award,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    description: 'Brandy francés de prestigio',
    count: 12,
    examples: ['VS', 'VSOP', 'XO', 'Hors d\'Age']
  },
  // LICORES
  {
    id: 'liqueurs',
    name: 'Licores',
    type: 'licor',
    icon: Wine,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    description: 'Bebidas alcohólicas dulces y aromatizadas',
    count: 30,
    examples: ['Baileys', 'Kahlúa', 'Cointreau', 'Grand Marnier']
  },
  {
    id: 'amaretto',
    name: 'Amaretto',
    type: 'licor',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Licor de almendras italiano',
    count: 8,
    examples: ['Disaronno', 'Lazzaroni', 'Gozio', 'Luxardo']
  },
  {
    id: 'schnapps',
    name: 'Schnapps',
    type: 'licor',
    icon: Apple,
    color: 'from-green-500 to-lime-600',
    bgColor: 'from-green-50 to-lime-50 dark:from-green-900/20 dark:to-green-900/20',
    description: 'Licores de frutas alemanes',
    count: 12,
    examples: ['Peach Schnapps', 'Apple Schnapps', 'Cherry Schnapps', 'Pear Schnapps']
  }
]

export default function SpiritsPage() {
  const [spirits, setSpirits] = useState<Spirit[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    const loadSpirits = async () => {
      try {
        const params = new URLSearchParams()
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory)
        }
        if (selectedType !== 'all') {
          params.append('type', selectedType)
        }
        if (searchTerm) {
          params.append('search', searchTerm)
        }

        const response = await fetch(`/api/spirits?${params.toString()}`)
        if (response.ok) {
          const data = await response.json()
          setSpirits(data.spirits || data || [])
        }
      } catch (error) {
        console.error('Error loading spirits:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSpirits()
  }, [selectedCategory, selectedType, searchTerm])

  const filteredSpirits = spirits.filter(spirit => {
    const matchesSearch = spirit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spirit.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spirit.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    const categoryConfig = spiritCategories.find(cat => cat.id === category.toLowerCase())
    return categoryConfig?.icon || Package
  }

  const getCategoryColor = (category: string) => {
    const categoryConfig = spiritCategories.find(cat => cat.id === category.toLowerCase())
    return categoryConfig?.color || 'from-gray-500 to-gray-600'
  }

  const getCategoryBgColor = (category: string) => {
    const categoryConfig = spiritCategories.find(cat => cat.id === category.toLowerCase())
    return categoryConfig?.bgColor || 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20'
  }

  // Separar destilados y licores
  const destilados = spiritCategories.filter(cat => cat.type === 'destilado')
  const licores = spiritCategories.filter(cat => cat.type === 'licor')

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
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wine className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Destilados y Licores
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Explora nuestra colección premium de destilados y licores de todo el mundo
            </p>
            <div className="flex justify-center gap-4 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" /> {spirits.length} Productos
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
                  placeholder="Buscar destilados y licores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none"
                >
                  <option value="all">Todas las Categorías</option>
                  {spiritCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none"
                >
                  <option value="all">Todos los Tipos</option>
                  <option value="destilado">Destilados</option>
                  <option value="licor">Licores</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destilados Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Destilados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destilados.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/spirits/${category.id}`}>
                  <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer h-full`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-400 to-transparent rounded-full blur-xl" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-400 to-transparent rounded-full blur-lg" />
                    </div>

                    {/* Icon */}
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {category.description}
                      </p>

                      {/* Count */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.count}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          destilados
                        </span>
                      </div>

                      {/* Examples */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Ejemplos:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {category.examples.slice(0, 2).map((example, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                            >
                              {example}
                            </span>
                          ))}
                          {category.examples.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                              +{category.examples.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-center gap-2 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                        <span>Explorar</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Licores Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Licores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {licores.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/spirits/${category.id}`}>
                  <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer h-full`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-400 to-transparent rounded-full blur-xl" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-400 to-transparent rounded-full blur-lg" />
                    </div>

                    {/* Icon */}
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {category.description}
                      </p>

                      {/* Count */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.count}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          licores
                        </span>
                      </div>

                      {/* Examples */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Ejemplos:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {category.examples.slice(0, 2).map((example, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                            >
                              {example}
                            </span>
                          ))}
                          {category.examples.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                              +{category.examples.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-center gap-2 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                        <span>Explorar</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Todos los Productos
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredSpirits.length} productos encontrados
            </span>
          </div>

          {filteredSpirits.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay productos disponibles'}
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
              {filteredSpirits.map((spirit, index) => (
                <motion.div
                  key={spirit.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/spirits/${spirit.category.toLowerCase()}/${spirit.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {spirit.image ? (
                          <img
                            src={spirit.image}
                            alt={spirit.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <>
                            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryBgColor(spirit.category)}`} />
                            <div className="w-full h-full flex items-center justify-center">
                              {(() => {
                                const IconComponent = getCategoryIcon(spirit.category)
                                return <IconComponent className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                              })()}
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

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {spirit.name}
                            </h3>
                            {spirit.brand && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {spirit.brand}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Package className="h-4 w-4" />
                            <span className="font-medium">{spirit.type}</span>
                          </div>
                          {spirit.origin && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <MapPin className="h-4 w-4" />
                              <span>{spirit.origin}</span>
                            </div>
                          )}
                          {(spirit as any).denomination && (
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-medium">Denominación:</span> {(spirit as any).denomination}
                            </div>
                          )}
                          {(spirit as any).aging && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Clock className="h-4 w-4" />
                              <span>{(spirit as any).aging}</span>
                            </div>
                          )}
                        </div>

                        {spirit.description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {spirit.description}
                          </p>
                        )}

                        {spirit.price && (
                          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                ${spirit.price.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
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