'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Star,
  MapPin,
  Award,
  Wrench,
  Info,
  ShoppingCart,
  BookOpen,
  Sparkles,
  CheckCircle,
  Lightbulb,
  AlertCircle,
  Package,
  Target,
  ShieldCheck
} from 'lucide-react'

interface ToolDetail {
  id: string
  name: string
  category: string
  subcategory?: string
  description?: string
  image?: string
  brand?: string
  material?: string
  size?: string
  capacity?: string
  price?: string
  uses?: string
  howToUse?: string
  maintenance?: string
  tips?: string
  alternatives?: string
  isProfessional: boolean
  isEssential: boolean
  isFeatured: boolean
  origin?: string
}

export default function ToolDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [tool, setTool] = useState<ToolDetail | null>(null)
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

    const loadTool = async () => {
      try {
        const response = await fetch(`/api/admin/tools/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setTool(data)
        }
      } catch (error) {
        console.error('Error loading tool:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTool()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando herramienta...</p>
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Herramienta no encontrada
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
              <div className="relative h-[600px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                {tool.image ? (
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Wrench className="h-48 w-48 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    {tool.isEssential && (
                      <span className="px-4 py-2 bg-green-500/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg">
                        ⭐ Esencial
                      </span>
                    )}
                    {tool.isProfessional && (
                      <span className="px-4 py-2 bg-blue-500/95 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg">
                        🎓 Profesional
                      </span>
                    )}
                    {tool.isFeatured && (
                      <span className="px-4 py-2 bg-yellow-400/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                        <Star className="h-4 w-4" />
                        Destacada
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              {tool.price && (
                <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Precio aproximado</p>
                      <span className="text-4xl font-bold">${tool.price}</span>
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
            {/* Title & Info */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {tool.name}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                  {tool.category}
                </span>
                {tool.subcategory && (
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                    {tool.subcategory}
                  </span>
                )}
              </div>

              {/* Brand & Origin */}
              <div className="flex flex-wrap gap-4 text-lg">
                {tool.brand && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Package className="h-5 w-5 text-purple-600" />
                    <span>Marca: <strong>{tool.brand}</strong></span>
                  </div>
                )}
                {tool.origin && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{tool.origin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Specs */}
            {(tool.material || tool.size || tool.capacity) && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <Info className="h-8 w-8 text-purple-600" />
                  Especificaciones Técnicas
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tool.material && (
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Material</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{tool.material}</p>
                    </div>
                  )}

                  {tool.size && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Tamaño / Dimensiones</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{tool.size}</p>
                    </div>
                  )}

                  {tool.capacity && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Capacidad</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{tool.capacity}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {tool.description && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  Descripción
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {tool.description}
                </p>
              </div>
            )}

            {/* Uses */}
            {tool.uses && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-purple-600" />
                  Usos Principales
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {tool.uses}
                </p>
              </div>
            )}

            {/* How to Use */}
            {tool.howToUse && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Cómo Usar
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {tool.howToUse}
                </p>
              </div>
            )}

            {/* Maintenance */}
            {tool.maintenance && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  Mantenimiento y Cuidado
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {tool.maintenance}
                </p>
              </div>
            )}

            {/* Tips */}
            {tool.tips && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                  Consejos de Uso
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {tool.tips}
                </p>
              </div>
            )}

            {/* Alternatives */}
            {tool.alternatives && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-green-600" />
                  Alternativas
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {tool.alternatives}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

