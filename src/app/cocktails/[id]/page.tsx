'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Star, 
  Search, 
  Filter, 
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
  ArrowLeft,
  Share,
  BookmarkPlus,
  PlayCircle
} from 'lucide-react'

// Datos de cócteles (en una app real vendrían de una API)
const cocktailsData = {
  'old-fashioned': {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    category: 'Hard Drinks',
    type: 'Clásico',
    difficulty: 'Intermedio',
    time: '5 min',
    abv: 25,
    description: 'El cóctel más clásico de la historia, elegante y sofisticado',
    image: '/images/cocktails/old-fashioned.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Bourbon', amount: '60ml', type: 'Spirit' },
      { name: 'Azúcar', amount: '1 cucharadita', type: 'Sweetener' },
      { name: 'Angostura Bitters', amount: '3 gotas', type: 'Bitter' },
      { name: 'Hielo', amount: 'Cubos', type: 'Ice' }
    ],
    instructions: [
      'Colocar el azúcar en el vaso',
      'Añadir 3 gotas de Angostura Bitters',
      'Muddlear hasta disolver el azúcar',
      'Añadir hielo y bourbon',
      'Revolver suavemente',
      'Decorar con cáscara de naranja'
    ],
    garnish: 'Cáscara de naranja',
    glass: 'Old Fashioned',
    technique: 'Build',
    history: 'Creado en 1880 en Louisville, Kentucky. El cóctel más antiguo del mundo.',
    rating: 4.9,
    reviews: 2156,
    tips: [
      'Usar bourbon de calidad premium',
      'Muddlear suavemente el azúcar',
      'No agitar, solo revolver',
      'Servir en vaso Old Fashioned'
    ],
    variations: [
      'Whiskey Old Fashioned',
      'Rum Old Fashioned',
      'Brandy Old Fashioned'
    ],
    similarCocktails: [
      'Manhattan',
      'Sazerac',
      'Boulevardier'
    ]
  },
  'dry-martini': {
    id: 'dry-martini',
    name: 'Dry Martini',
    category: 'Martinis',
    type: 'Clásico',
    difficulty: 'Intermedio',
    time: '4 min',
    abv: 30,
    description: 'El martini perfecto, seco y elegante',
    image: '/images/cocktails/dry-martini.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Gin', amount: '60ml', type: 'Spirit' },
      { name: 'Vermut Seco', amount: '10ml', type: 'Fortified Wine' },
      { name: 'Aceituna', amount: '1 unidad', type: 'Garnish' }
    ],
    instructions: [
      'Enfriar la copa con hielo',
      'Mezclar gin y vermut en vaso mezclador',
      'Revolver con hielo por 30 segundos',
      'Colar en copa enfriada',
      'Decorar con aceituna'
    ],
    garnish: 'Aceituna verde',
    glass: 'Copa Martini',
    technique: 'Stir',
    history: 'Creado en 1860. El cóctel más elegante del mundo.',
    rating: 4.8,
    reviews: 1892,
    tips: [
      'Usar gin de calidad premium',
      'Enfriar bien la copa',
      'Revolver, no agitar',
      'Servir inmediatamente'
    ],
    variations: [
      'Extra Dry Martini',
      'Bone Dry Martini',
      'Perfect Martini'
    ],
    similarCocktails: [
      'Vodka Martini',
      'Dirty Martini',
      'Gibson'
    ]
  },
  'mojito': {
    id: 'mojito',
    name: 'Mojito',
    category: 'Tropicales',
    type: 'Refrescante',
    difficulty: 'Fácil',
    time: '4 min',
    abv: 15,
    description: 'El cóctel cubano más famoso, refrescante y aromático',
    image: '/images/cocktails/mojito.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Ron Blanco', amount: '50ml', type: 'Spirit' },
      { name: 'Lima', amount: '1/2 unidad', type: 'Citrus' },
      { name: 'Menta', amount: '8 hojas', type: 'Herb' },
      { name: 'Azúcar', amount: '2 cucharaditas', type: 'Sweetener' },
      { name: 'Soda', amount: '100ml', type: 'Mixer' }
    ],
    instructions: [
      'Muddlear menta y azúcar en el vaso',
      'Añadir jugo de lima',
      'Añadir hielo y ron',
      'Agitar suavemente',
      'Completar con soda',
      'Decorar con rama de menta'
    ],
    garnish: 'Rama de menta',
    glass: 'Highball',
    technique: 'Muddle + Shake',
    history: 'Originario de Cuba en el siglo XVI. El cóctel más refrescante.',
    rating: 4.7,
    reviews: 3245,
    tips: [
      'Usar menta fresca',
      'Muddlear suavemente',
      'No agitar demasiado',
      'Servir con hielo fresco'
    ],
    variations: [
      'Virgin Mojito',
      'Mojito de Fresa',
      'Mojito de Mango'
    ],
    similarCocktails: [
      'Cuba Libre',
      'Daiquiri',
      'Caipirinha'
    ]
  },
  'virgin-mojito': {
    id: 'virgin-mojito',
    name: 'Virgin Mojito',
    category: 'Soft Drinks',
    type: 'Mocktail',
    difficulty: 'Fácil',
    time: '3 min',
    abv: 0,
    description: 'Mojito sin alcohol, perfecto para todos',
    image: '/images/cocktails/virgin-mojito.jpg',
    isClassic: false,
    ingredients: [
      { name: 'Lima', amount: '1/2 unidad', type: 'Citrus' },
      { name: 'Menta', amount: '8 hojas', type: 'Herb' },
      { name: 'Azúcar', amount: '2 cucharaditas', type: 'Sweetener' },
      { name: 'Soda', amount: '150ml', type: 'Mixer' }
    ],
    instructions: [
      'Muddlear menta y azúcar en el vaso',
      'Añadir jugo de lima',
      'Añadir hielo',
      'Completar con soda',
      'Decorar con rama de menta'
    ],
    garnish: 'Rama de menta',
    glass: 'Highball',
    technique: 'Muddle',
    history: 'Versión sin alcohol del clásico cubano.',
    rating: 4.6,
    reviews: 1876,
    tips: [
      'Usar menta fresca',
      'Muddlear suavemente',
      'Servir frío',
      'Decorar abundantemente'
    ],
    variations: [
      'Virgin Mojito de Fresa',
      'Virgin Mojito de Mango',
      'Virgin Mojito de Piña'
    ],
    similarCocktails: [
      'Virgin Cuba Libre',
      'Virgin Daiquiri',
      'Limonada de Menta'
    ]
  }
}

export default function CocktailDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const cocktail = cocktailsData[id as keyof typeof cocktailsData]

  if (!cocktail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cóctel no encontrado
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            El cóctel que buscas no existe
          </p>
          <Link
            href="/cocktails"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Cócteles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/cocktails"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Cócteles
            </Link>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20'
                }`}
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Share className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <WineIcon className="h-32 w-32 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              
              {/* Classic Badge */}
              {cocktail.isClassic && (
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-full flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current" />
                    Clásico
                  </span>
                </div>
              )}

              {/* ABV Badge */}
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full">
                  {cocktail.abv}% ABV
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {cocktail.name}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {cocktail.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {cocktail.time}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Tiempo
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {cocktail.difficulty}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Dificultad
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {cocktail.rating}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Valoración
                  </div>
                </div>
              </div>

              {/* Category and Type */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full">
                  {cocktail.category}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                  {cocktail.type}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <PlayCircle className="h-5 w-5" />
                  {showInstructions ? 'Ocultar' : 'Ver'} Instrucciones
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <BookmarkPlus className="h-5 w-5" />
                  Guardar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructions */}
      {showInstructions && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Cómo Preparar {cocktail.name}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Ingredients */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Ingredientes
                  </h3>
                  <div className="space-y-4">
                    {cocktail.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {ingredient.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {ingredient.type}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {ingredient.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Preparación
                  </h3>
                  <div className="space-y-4">
                    {cocktail.instructions.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Vaso
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{cocktail.glass}</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Técnica
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{cocktail.technique}</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Decoración
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{cocktail.garnish}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* History and Tips */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* History */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Historia
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {cocktail.history}
                </p>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Consejos Profesionales
                </h3>
                <ul className="space-y-3">
                  {cocktail.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Variations and Similar */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Variaciones
                </h3>
                <div className="space-y-2">
                  {cocktail.variations.map((variation, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">{variation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Cócteles Similares
                </h3>
                <div className="space-y-2">
                  {cocktail.similarCocktails.map((similar, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">{similar}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
