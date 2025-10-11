'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft,
  Clock,
  BarChart3,
  Award,
  CheckCircle,
  Lightbulb,
  AlertCircle,
  Play,
  Beaker,
  Wrench,
  Target,
  Sparkles,
  BookOpen,
  Star
} from 'lucide-react'

interface TechniqueDetail {
  id: string
  name: string
  category: string
  subcategory?: string
  description?: string
  image?: string
  difficulty?: string
  timeRequired?: string
  steps?: any
  ingredients?: string
  equipment?: string
  tips?: string
  videoUrl?: string
  applications?: string
  examples?: string
  precautions?: string
  benefits?: string
  origin?: string
  isFeatured: boolean
}

export default function TechniqueDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [technique, setTechnique] = useState<TechniqueDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(p => {
      setCategory(p.category)
      setId(p.id)
    })
  }, [params])

  useEffect(() => {
    if (!id) return

    const loadTechnique = async () => {
      try {
        const response = await fetch(`/api/admin/techniques/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setTechnique(data)
        }
      } catch (error) {
        console.error('Error loading technique:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTechnique()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando técnica...</p>
        </div>
      </div>
    )
  }

  if (!technique) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Técnica no encontrada
          </h1>
          <Link
            href={`/techniques/${category}`}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors inline-block"
          >
            Volver a la categoría
          </Link>
        </div>
      </div>
    )
  }

  const steps = technique.steps ? (Array.isArray(technique.steps) ? technique.steps : JSON.parse(technique.steps)) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/techniques/${category}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a la categoría
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column - Sticky */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {technique.image ? (
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-[500px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Beaker className="h-40 w-40 text-white" />
                </div>
              )}
              
              {/* Badges on image */}
              <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  {technique.isFeatured && (
                    <span className="px-4 py-2 bg-yellow-400/95 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full flex items-center gap-2 shadow-lg">
                      <Star className="h-4 w-4" />
                      Destacada
                    </span>
                  )}
                  {technique.difficulty && (
                    <span className={`px-4 py-2 backdrop-blur-sm text-sm font-bold rounded-full shadow-lg ${
                      technique.difficulty === 'EASY' ? 'bg-green-400/95 text-gray-900' :
                      technique.difficulty === 'MEDIUM' ? 'bg-yellow-400/95 text-gray-900' :
                      technique.difficulty === 'HARD' ? 'bg-orange-400/95 text-gray-900' :
                      'bg-red-400/95 text-white'
                    }`}>
                      {technique.difficulty === 'EASY' ? 'Fácil' :
                       technique.difficulty === 'MEDIUM' ? 'Medio' :
                       technique.difficulty === 'HARD' ? 'Difícil' : 'Experto'}
                    </span>
                  )}
                </div>
                
                {technique.timeRequired && (
                  <span className="px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {technique.timeRequired}
                  </span>
                )}
              </div>

              {/* Video */}
              {technique.videoUrl && (
                <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                  <a 
                    href={technique.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-white hover:text-purple-100 transition-colors"
                  >
                    <Play className="h-6 w-6" />
                    <span className="text-lg font-bold">Ver Video Tutorial</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Column - Scrollable */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title & Info */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {technique.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                  {technique.category}
                </span>
                {technique.subcategory && (
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                    {technique.subcategory}
                  </span>
                )}
                {technique.origin && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    Origen: {technique.origin}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {technique.description && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  Descripción
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.description}
                </p>
              </div>
            )}

            {/* Benefits */}
            {technique.benefits && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-green-600" />
                  Beneficios
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.benefits}
                </p>
              </div>
            )}

            {/* Ingredients/Materials */}
            {technique.ingredients && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Beaker className="h-6 w-6 text-purple-600" />
                  Ingredientes / Materiales
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.ingredients}
                </p>
              </div>
            )}

            {/* Equipment */}
            {technique.equipment && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Wrench className="h-6 w-6 text-blue-600" />
                  Equipo Necesario
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.equipment}
                </p>
              </div>
            )}

            {/* Steps */}
            {steps && steps.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                  Pasos de la Técnica
                </h2>
                
                <div className="space-y-6">
                  {steps.map((step: any, index: number) => (
                    <div key={index} className="border-l-4 border-purple-600 pl-6 py-2">
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step || index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white font-medium mb-2">
                            {step.instruction}
                          </p>
                          {step.tip && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 mt-2">
                              <p className="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{step.tip}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {technique.tips && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                  Consejos Profesionales
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.tips}
                </p>
              </div>
            )}

            {/* Precautions */}
            {technique.precautions && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  Precauciones
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.precautions}
                </p>
              </div>
            )}

            {/* Applications */}
            {technique.applications && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-indigo-600" />
                  Aplicaciones / Usos
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.applications}
                </p>
              </div>
            )}

            {/* Examples */}
            {technique.examples && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-purple-600" />
                  Ejemplos de Cócteles
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {technique.examples}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

