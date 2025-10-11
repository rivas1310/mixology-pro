'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
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
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Target,
  TrendingUp,
  Users,
  Bookmark,
  Share2,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
  Timer,
  Flame,
  Snowflake,
  Heart,
  Leaf,
  Wine,
  Sparkles,
  ShoppingCart,
  DollarSign,
  Shield,
  Package,
  Wrench as WrenchIcon,
  Clock as ClockIcon,
  Award as AwardIcon,
  BookOpen as BookOpenIcon,
  Wine as WineIcon,
  Droplets as DropletsIcon,
  Zap as ZapIcon,
  Star as StarIcon,
  ArrowLeft
} from 'lucide-react'
import { COCKTAIL_CATEGORIES } from '@/lib/constants'

// Configuración de categorías con iconos y estilos
const categoryConfig = {
  CLASSIC: {
    icon: WineIcon,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Cócteles clásicos y tradicionales',
    difficulty: 'Intermedio',
    time: '5-10 min',
    subcategories: ['Clásicos', 'Modernos', 'Tropicales', 'De Temporada'],
    examples: ['Old Fashioned', 'Whiskey Sour', 'Mai Tai', 'Cosmopolitan']
  },
  TROPICAL: {
    icon: Flame,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Cócteles exóticos y refrescantes',
    difficulty: 'Fácil',
    time: '4-7 min',
    subcategories: ['Tiki', 'Caribeños', 'Hawaianos', 'Tropicales'],
    examples: ['Piña Colada', 'Mai Tai', 'Blue Hawaiian', 'Zombie']
  },
  DESSERT: {
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    description: 'Cócteles dulces y cremosos',
    difficulty: 'Intermedio',
    time: '5-10 min',
    subcategories: ['Creamy', 'Chocolate', 'Fruit', 'Coffee'],
    examples: ['White Russian', 'Grasshopper', 'Chocolate Martini', 'Irish Coffee']
  },
  SOUR: {
    icon: ZapIcon,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    description: 'Cócteles ácidos y equilibrados',
    difficulty: 'Intermedio',
    time: '5-8 min',
    subcategories: ['Whiskey Sour', 'Gin Sour', 'Pisco Sour', 'Amaretto Sour'],
    examples: ['Whiskey Sour', 'Pisco Sour', 'Amaretto Sour', 'Lemon Drop']
  },
  SHOT: {
    icon: Target,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Bebidas cortas y potentes',
    difficulty: 'Fácil',
    time: '1-3 min',
    subcategories: ['Tequila Shots', 'Vodka Shots', 'Whiskey Shots', 'Layered Shots'],
    examples: ['Tequila Shot', 'Kamikaze', 'B-52', 'Jägerbomb']
  },
  MOCKTAIL: {
    icon: DropletsIcon,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Cócteles sin alcohol, refrescantes y saludables',
    difficulty: 'Fácil',
    time: '3-5 min',
    subcategories: ['Mocktails', 'Smoothies', 'Jugos', 'Tés'],
    examples: ['Virgin Mojito', 'Shirley Temple', 'Piña Colada Sin Alcohol', 'Limonada de Fresa']
  },
  HIGHBALL: {
    icon: BarChart3,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Cócteles largos y refrescantes',
    difficulty: 'Fácil',
    time: '2-4 min',
    subcategories: ['Gin Tonic', 'Cuba Libre', 'Moscow Mule', 'Dark & Stormy'],
    examples: ['Gin Tonic', 'Cuba Libre', 'Moscow Mule', 'Dark & Stormy']
  },
  MARTINI: {
    icon: StarIcon,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Cócteles elegantes y sofisticados',
    difficulty: 'Intermedio',
    time: '4-8 min',
    subcategories: ['Dry Martini', 'Wet Martini', 'Dirty Martini', 'Vodka Martini'],
    examples: ['Dry Martini', 'Dirty Martini', 'Vesper', 'Gibson']
  }
}

// Función para obtener cócteles de la API
async function fetchCocktails(category: string, difficulty?: string, search?: string) {
  try {
    const params = new URLSearchParams()
    params.append('category', category)
    
    if (difficulty && difficulty !== 'all') {
      params.append('difficulty', difficulty)
    }
    
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/cocktails?${params.toString()}`
    const response = await fetch(url, { cache: 'no-store' })
    
    if (!response.ok) {
      throw new Error('Error al cargar cócteles')
    }
    
    let cocktails = await response.json()
    
    // Filtrar por búsqueda en el frontend si es necesario
    if (search) {
      cocktails = cocktails.filter((cocktail: any) => 
        cocktail.name.toLowerCase().includes(search.toLowerCase()) ||
        cocktail.description?.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    return cocktails
  } catch (error) {
    console.error('Error fetching cocktails:', error)
    return []
  }
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = params?.category as string
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [expandedCocktail, setExpandedCocktail] = useState<string | null>(null)
  const [cocktails, setCocktails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Cargar cócteles al montar el componente
  useEffect(() => {
    const loadCocktails = async () => {
      setLoading(true)
      try {
        const data = await fetchCocktails(category, selectedDifficulty, searchTerm)
        setCocktails(data)
      } catch (error) {
        console.error('Error loading cocktails:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCocktails()
  }, [category, selectedDifficulty, searchTerm])

  // Buscar la categoría en las constantes
  const categoryInfo = COCKTAIL_CATEGORIES.find(cat => cat.value === category)
  
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
            onClick={() => router.push('/cocktails')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Cócteles
          </button>
        </div>
      </div>
    )
  }

  const config = categoryConfig[category as keyof typeof categoryConfig]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando cócteles...</p>
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
          <button
            onClick={() => router.push('/cocktails')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Cócteles
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Category Icon */}
            <div className={`w-20 h-20 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <config.icon className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {categoryInfo.label}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {config.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {cocktails.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  cócteles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {config.time}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  tiempo promedio
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {config.difficulty}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  dificultad
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Buscar en ${categoryInfo.label.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filtrar por dificultad:
            </span>
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedDifficulty === 'all'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedDifficulty('EASY')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedDifficulty === 'EASY'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`}
            >
              Fácil
            </button>
            <button
              onClick={() => setSelectedDifficulty('MEDIUM')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedDifficulty === 'MEDIUM'
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
              }`}
            >
              Intermedio
            </button>
            <button
              onClick={() => setSelectedDifficulty('HARD')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedDifficulty === 'HARD'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
              }`}
            >
              Avanzado
            </button>
          </div>
        </div>
      </section>

      {/* Cocktails Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Cargando cócteles...</p>
            </div>
          ) : cocktails.length === 0 ? (
            <div className="text-center py-20">
              <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron cócteles
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay cócteles disponibles en esta categoría'}
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
              {cocktails.map((cocktail, index) => (
                <motion.div
                  key={cocktail.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Image */}
                    <a href={`/cocktails/${category}/${cocktail.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      {cocktail.image ? (
                        <img
                          src={cocktail.image}
                          alt={cocktail.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30" />
                          <div className="w-full h-full flex items-center justify-center">
                            <config.icon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Difficulty Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          cocktail.difficulty === 'EASY' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                          cocktail.difficulty === 'MEDIUM' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                          'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        }`}>
                          {cocktail.difficulty === 'EASY' ? 'Fácil' : 
                           cocktail.difficulty === 'MEDIUM' ? 'Intermedio' : 'Avanzado'}
                        </span>
                      </div>

                      {/* ABV Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                          {cocktail.abv || 0}% ABV
                        </span>
                      </div>
                    </div>
                    </a>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <a href={`/cocktails/${category}/${cocktail.id}`} className="block">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {cocktail.name}
                          </h3>
                        </a>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4" />
                          {cocktail.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {cocktail.rating || 0} ({cocktail.reviewCount || 0} reviews)
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {cocktail.description}
                      </p>

                      {/* Ingredients Preview */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Ingredientes:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cocktail.ingredientsText && Array.isArray(cocktail.ingredientsText) && cocktail.ingredientsText.slice(0, 3).map((ingredient: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                            >
                              {ingredient}
                            </span>
                          ))}
                          {cocktail.ingredientsText && Array.isArray(cocktail.ingredientsText) && cocktail.ingredientsText.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                              +{cocktail.ingredientsText.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setExpandedCocktail(expandedCocktail === cocktail.id ? null : cocktail.id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          <Info className="h-4 w-4" />
                          Ver Detalles
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Expanded Info */}
                      {expandedCocktail === cocktail.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                        >
                          {/* Ingredients */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Ingredientes:
                            </p>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {cocktail.ingredientsText && Array.isArray(cocktail.ingredientsText) && cocktail.ingredientsText.map((ingredient: string, idx: number) => (
                                <li key={idx} className="flex items-center justify-between">
                                  <span>{ingredient}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Instructions */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Preparación:
                            </p>
                            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {cocktail.instructions && cocktail.instructions.map((instruction: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-purple-600 dark:text-purple-400 font-bold">{instruction.step}.</span>
                                  <span>{instruction.instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Story */}
                          {cocktail.story && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Historia:
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {cocktail.story}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ejemplos de {categoryInfo.label}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Algunos de los cócteles más representativos de esta categoría
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 text-center border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <config.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {example}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
