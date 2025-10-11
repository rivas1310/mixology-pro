'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Star,
  Clock,
  Award,
  Droplets,
  Zap,
  Heart,
  Share2,
  Bookmark,
  Play,
  Timer,
  Flame,
  Wine,
  Target,
  BarChart3,
  StarIcon,
  WineIcon,
  DropletsIcon,
  ZapIcon,
  Flame as FlameIcon,
  Target as TargetIcon,
  BarChart3 as BarChart3Icon
} from 'lucide-react'
import { COCKTAIL_CATEGORIES } from '@/lib/constants'

// Configuración de categorías con iconos
const categoryIcons = {
  CLASSIC: WineIcon,
  TROPICAL: FlameIcon,
  DESSERT: Heart,
  SOUR: ZapIcon,
  SHOT: TargetIcon,
  MOCKTAIL: DropletsIcon,
  HIGHBALL: BarChart3Icon,
  MARTINI: StarIcon
}

// Función para obtener cóctel de la API
async function fetchCocktail(id: string) {
  try {
    const response = await fetch(`/api/cocktails/${id}`)
    
    if (!response.ok) {
      throw new Error('Error al cargar cóctel')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching cocktail:', error)
    return null
  }
}

export default function CocktailDetailPage() {
  const params = useParams()
  const router = useRouter()
  const category = params?.category as string
  const id = params?.id as string
  
  const [cocktail, setCocktail] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCocktail = async () => {
      setLoading(true)
      try {
        console.log('Loading cocktail with ID:', id)
        const data = await fetchCocktail(id)
        console.log('Cocktail data received:', data)
        if (data) {
          console.log('Cocktail details:', {
            name: data.name,
            description: data.description,
            ingredientsText: data.ingredientsText,
            instructions: data.instructions,
            image: data.image
          })
          setCocktail(data)
        } else {
          console.log('No cocktail data received')
        }
      } catch (error) {
        console.error('Error loading cocktail:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCocktail()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando cóctel...</p>
        </div>
      </div>
    )
  }

  if (!cocktail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cóctel no encontrado
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            El cóctel &quot;{id}&quot; no existe.
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

  const categoryInfo = COCKTAIL_CATEGORIES.find(cat => cat.value === cocktail.category)
  const CategoryIcon = categoryIcons[cocktail.category as keyof typeof categoryIcons]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <button
            onClick={() => router.push(`/cocktails/${category}`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a {categoryInfo?.label}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl overflow-hidden">
                {cocktail.image ? (
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CategoryIcon className="h-32 w-32 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full flex items-center gap-2">
                    <CategoryIcon className="h-4 w-4" />
                    {categoryInfo?.label}
                  </span>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    cocktail.difficulty === 'EASY' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                    cocktail.difficulty === 'MEDIUM' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  }`}>
                    {cocktail.difficulty === 'EASY' ? 'Fácil' : 
                     cocktail.difficulty === 'MEDIUM' ? 'Intermedio' : 'Avanzado'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {cocktail.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {cocktail.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cocktail.time}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Preparación
                  </div>
                </div>

                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cocktail.rating}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Calificación
                  </div>
                </div>

                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cocktail.reviewCount || 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Reviews
                  </div>
                </div>

                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                  <div className="flex items-center justify-center mb-2">
                    <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cocktail.abv || 0}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ABV
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                  <Heart className="h-5 w-5" />
                  Favorito
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recipe Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ingredientes
              </h2>
              <div className="space-y-4">
                {cocktail.ingredientsText && Array.isArray(cocktail.ingredientsText) && cocktail.ingredientsText.length > 0 ? (
                  cocktail.ingredientsText.map((ingredient: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            {index + 1}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {ingredient}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                    <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                      ⚠️ Este cóctel no tiene ingredientes definidos
                    </p>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">
                      Los ingredientes deben agregarse desde el panel de administración
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Preparación
              </h2>
              <div className="space-y-4">
                {cocktail.instructions && cocktail.instructions.length > 0 ? (
                  cocktail.instructions.map((instruction: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {instruction.step}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {instruction.instruction || 'Instrucción no definida'}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                    <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                      ⚠️ Este cóctel no tiene instrucciones definidas
                    </p>
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">
                      Las instrucciones deben agregarse desde el panel de administración
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <Star className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Categoría</h3>
              <p className="text-gray-600 dark:text-gray-300">{categoryInfo?.label}</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dificultad</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {cocktail.difficulty === 'EASY' ? 'Fácil' : 
                 cocktail.difficulty === 'MEDIUM' ? 'Intermedio' : 'Avanzado'}
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Clásico</h3>
              <p className="text-gray-600 dark:text-gray-300">{cocktail.isClassic ? 'Sí' : 'No'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Historia del {cocktail.name}
            </h2>
            {cocktail.story && (
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {cocktail.story}
              </p>
            )}
            

            {cocktail.trivia && (
              <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  ¿Sabías que...?
                </h3>
                <p className="leading-relaxed">
                  {cocktail.trivia}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
