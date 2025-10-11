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
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Target,
  Users,
  Bookmark,
  Share2,
  Download,
  CheckCircle,
  AlertCircle,
  Timer,
  Flame,
  Snowflake,
  Heart,
  Leaf,
  Wine,
  Sparkles
} from 'lucide-react'

interface Technique {
  id: string
  name: string
  category: string
  type: string
  difficulty: string
  time: string
  description: string
  steps: string[]
  tools: string[]
  tips: string[]
  image?: string
  rating: number
  isPremium: boolean
  videoUrl?: string
}

const categoryConfig = {
  basic: {
    name: 'Técnicas Básicas',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Fundamentos esenciales de la mixología',
    subcategories: ['Medición', 'Mezclado', 'Servido', 'Decoración']
  },
  advanced: {
    name: 'Técnicas Avanzadas',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Técnicas profesionales y creativas',
    subcategories: ['Flair', 'Molecular', 'Infusiones', 'Fermentación']
  },
  shaking: {
    name: 'Shaking',
    icon: Zap,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Técnicas de agitado y mezclado',
    subcategories: ['Dry Shake', 'Wet Shake', 'Reverse Shake', 'Hard Shake']
  },
  stirring: {
    name: 'Stirring',
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Técnicas de mezclado suave',
    subcategories: ['Stirring', 'Rolling', 'Swizzling', 'Layering']
  },
  garnishing: {
    name: 'Decoración',
    icon: Star,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Arte de la decoración en cócteles',
    subcategories: ['Frutas', 'Hierbas', 'Flores', 'Especias']
  },
  flair: {
    name: 'Flair Bartending',
    icon: Zap,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Técnicas de espectáculo y entretenimiento',
    subcategories: ['Bottle Flair', 'Glass Flair', 'Fire', 'Juggling']
  },
  molecular: {
    name: 'Mixología Molecular',
    icon: Settings,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    description: 'Técnicas científicas y creativas',
    subcategories: ['Spherification', 'Gelification', 'Emulsification', 'Smoking']
  },
  infusion: {
    name: 'Infusiones',
    icon: Droplets,
    color: 'from-teal-500 to-green-600',
    bgColor: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-teal-900/20',
    description: 'Técnicas de extracción de sabores',
    subcategories: ['Cold Infusion', 'Hot Infusion', 'Fat Washing', 'Clarification']
  }
}

// Mock data para cada categoría
const mockTechniques: Record<string, Technique[]> = {
  basic: [
    {
      id: '1',
      name: 'Shake',
      category: 'Técnicas Básicas',
      type: 'Mezclado',
      difficulty: 'Principiante',
      time: '5 min',
      description: 'Técnica fundamental de agitado para mezclar ingredientes con hielo.',
      steps: [
        'Agregar ingredientes al shaker',
        'Añadir hielo hasta 2/3 de capacidad',
        'Agitar vigorosamente por 10-15 segundos',
        'Colar en el vaso servido'
      ],
      tools: ['Boston Shaker', 'Hawthorne Strainer', 'Fine Strainer'],
      tips: [
        'Usar hielo fresco y seco',
        'Agitar hasta que el shaker se sienta frío',
        'No agitar demasiado para evitar dilución excesiva'
      ],
      image: '/images/techniques/shake.jpg',
      rating: 4.8,
      isPremium: false,
      videoUrl: '/videos/shake-technique.mp4'
    },
    {
      id: '2',
      name: 'Stir',
      category: 'Técnicas Básicas',
      type: 'Mezclado',
      difficulty: 'Principiante',
      time: '3 min',
      description: 'Técnica de mezclado suave para cócteles con ingredientes claros.',
      steps: [
        'Agregar ingredientes al mixing glass',
        'Añadir hielo grande',
        'Revolver suavemente con bar spoon',
        'Colar en el vaso servido'
      ],
      tools: ['Mixing Glass', 'Bar Spoon', 'Hawthorne Strainer'],
      tips: [
        'Usar hielo grande para menor dilución',
        'Revolver en una sola dirección',
        'Detener cuando el vaso se sienta frío'
      ],
      image: '/images/techniques/stir.jpg',
      rating: 4.6,
      isPremium: false,
      videoUrl: '/videos/stir-technique.mp4'
    },
    {
      id: '3',
      name: 'Build',
      category: 'Técnicas Básicas',
      type: 'Servido',
      difficulty: 'Principiante',
      time: '2 min',
      description: 'Técnica de construcción directa en el vaso servido.',
      steps: [
        'Agregar hielo al vaso servido',
        'Verter ingredientes en orden',
        'Revolver suavemente',
        'Decorar y servir'
      ],
      tools: ['Bar Spoon', 'Jigger'],
      tips: [
        'Verter ingredientes más densos primero',
        'Revolver suavemente para mezclar',
        'Servir inmediatamente'
      ],
      image: '/images/techniques/build.jpg',
      rating: 4.4,
      isPremium: false
    }
  ],
  shaking: [
    {
      id: '4',
      name: 'Dry Shake',
      category: 'Shaking',
      type: 'Dry Shake',
      difficulty: 'Intermedio',
      time: '8 min',
      description: 'Técnica de agitado sin hielo para emulsificar ingredientes.',
      steps: [
        'Agregar ingredientes al shaker sin hielo',
        'Agitar vigorosamente por 15-20 segundos',
        'Añadir hielo y agitar nuevamente',
        'Colar en el vaso servido'
      ],
      tools: ['Boston Shaker', 'Hawthorne Strainer', 'Fine Strainer'],
      tips: [
        'Usar para claras de huevo o crema',
        'Agitar sin hielo primero para emulsificar',
        'Añadir hielo después para enfriar'
      ],
      image: '/images/techniques/dry-shake.jpg',
      rating: 4.7,
      isPremium: false,
      videoUrl: '/videos/dry-shake-technique.mp4'
    },
    {
      id: '5',
      name: 'Wet Shake',
      category: 'Shaking',
      type: 'Wet Shake',
      difficulty: 'Intermedio',
      time: '6 min',
      description: 'Técnica de agitado con hielo para cócteles tradicionales.',
      steps: [
        'Agregar ingredientes al shaker',
        'Añadir hielo hasta 2/3 de capacidad',
        'Agitar vigorosamente por 10-15 segundos',
        'Colar en el vaso servido'
      ],
      tools: ['Boston Shaker', 'Hawthorne Strainer'],
      tips: [
        'Usar hielo fresco y seco',
        'Agitar hasta que el shaker se sienta frío',
        'No agitar demasiado para evitar dilución excesiva'
      ],
      image: '/images/techniques/wet-shake.jpg',
      rating: 4.5,
      isPremium: false,
      videoUrl: '/videos/wet-shake-technique.mp4'
    }
  ],
  stirring: [
    {
      id: '6',
      name: 'Rolling',
      category: 'Stirring',
      type: 'Rolling',
      difficulty: 'Intermedio',
      time: '5 min',
      description: 'Técnica de mezclado suave entre dos vasos.',
      steps: [
        'Agregar ingredientes al primer vaso',
        'Verter suavemente al segundo vaso',
        'Repetir el proceso 3-4 veces',
        'Servir en el vaso final'
      ],
      tools: ['Mixing Glass', 'Bar Spoon'],
      tips: [
        'Usar para ingredientes delicados',
        'Mantener el flujo suave y constante',
        'No agitar demasiado'
      ],
      image: '/images/techniques/rolling.jpg',
      rating: 4.3,
      isPremium: false,
      videoUrl: '/videos/rolling-technique.mp4'
    }
  ]
}

export default function CategoryTechniquesPage() {
  const params = useParams()
  const category = params?.category as string
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')

  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig]

  useEffect(() => {
    const loadTechniques = async () => {
      try {
        setLoading(true)
        
        // Mapear categoría de URL a categoría de base de datos
        const categoryMap: { [key: string]: string } = {
          'basic': 'SHAKING',
          'shaking': 'SHAKING',
          'stirring': 'STIRRING',
          'muddling': 'MUDDLING',
          'straining': 'STRAINING',
          'layering': 'LAYERING',
          'infusions': 'INFUSIONS',
          'infusion': 'INFUSIONS',
          'clarification': 'CLARIFICATION',
          'carbonation': 'CARBONATION',
          'flaming': 'FLAMING',
          'smoking': 'SMOKING',
          'freezing': 'FREEZING',
          'garnishing': 'GARNISHING',
          'batching': 'BATCHING',
          'aging': 'AGING',
          'advanced': 'INFUSIONS',
          'flair': 'FLAMING',
          'molecular': 'CLARIFICATION'
        }
        
        const dbCategory = categoryMap[category.toLowerCase()] || category.toUpperCase()
        
        console.log('Loading techniques for category:', dbCategory)
        
        const response = await fetch(`/api/admin/techniques?category=${dbCategory}`)
        
        if (response.ok) {
          const data = await response.json()
          const techniquesData = data.techniques || []
          
          console.log('Techniques loaded:', techniquesData.length)
          
          // Transformar datos de la API al formato del componente
          const transformedTechniques: Technique[] = techniquesData.map((tech: any) => ({
            id: tech.id,
            name: tech.name,
            category: categoryInfo?.name || tech.category,
            type: tech.subcategory || tech.category,
            difficulty: tech.difficulty || 'Medio',
            time: tech.timeRequired || 'Varía',
            description: tech.description || '',
            steps: tech.steps ? (Array.isArray(tech.steps) ? tech.steps.map((s: any) => s.instruction) : JSON.parse(tech.steps).map((s: any) => s.instruction)) : [],
            tools: tech.equipment ? tech.equipment.split(',').map((t: string) => t.trim()) : [],
            tips: tech.tips ? tech.tips.split('\n').filter((t: string) => t.trim()) : [],
            image: tech.image,
            rating: 4.5,
            isPremium: tech.isFeatured || false,
            videoUrl: tech.videoUrl
          }))
          
          setTechniques(transformedTechniques)
        }
      } catch (error) {
        console.error('Error loading techniques:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryInfo) {
      loadTechniques()
    }
  }, [category, categoryInfo])

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technique.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              technique.type.toLowerCase().includes(selectedSubcategory.toLowerCase())
    
    return matchesSearch && matchesSubcategory
  })

  // Agrupar técnicas por subcategoría para mostrar mejor organización
  const groupedTechniques = techniques.reduce((acc, technique) => {
    const subcategory = technique.type
    if (!acc[subcategory]) {
      acc[subcategory] = []
    }
    acc[subcategory].push(technique)
    return acc
  }, {} as Record<string, Technique[]>)

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
            href="/techniques"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Técnicas
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
          <p className="text-gray-600 dark:text-gray-300">Cargando técnicas...</p>
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
            href="/techniques"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Técnicas
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
                <Package className="h-4 w-4" /> {techniques.length} Técnicas
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
                  <option value="difficulty">Ordenar por Dificultad</option>
                  <option value="time">Ordenar por Tiempo</option>
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
                      {techniques.filter(tech => tech.type.toLowerCase().includes(subcategory.toLowerCase())).length} técnicas
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubcategory === 'all' ? `${categoryInfo.name} Disponibles` : `${selectedSubcategory} - ${categoryInfo.name}`}
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredTechniques.length} técnicas encontradas
            </span>
          </div>

          {filteredTechniques.length === 0 ? (
            <div className="text-center py-20">
              <categoryInfo.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron técnicas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay técnicas disponibles en esta categoría'}
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
              {Object.entries(groupedTechniques).map(([subcategory, subcategoryTechniques], groupIndex) => (
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
                      {subcategoryTechniques.length} técnicas en esta subcategoría
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategoryTechniques.map((technique, index) => (
                      <motion.div
                        key={technique.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <Link href={`/techniques/${category}/${technique.id}`}>
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer">
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            {technique.image ? (
                              <img
                                src={technique.image}
                                alt={technique.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
                                <categoryInfo.icon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            
                            {/* Premium Badge */}
                            {technique.isPremium && (
                              <div className="absolute top-4 left-4">
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-full flex items-center gap-1">
                                  <Award className="h-3 w-3" />
                                  Premium
                                </span>
                              </div>
                            )}

                            {/* Difficulty Badge */}
                            <div className="absolute top-4 right-4">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                technique.difficulty === 'Principiante' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                                technique.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                                'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              }`}>
                                {technique.difficulty}
                              </span>
                            </div>

                            {/* Play Button */}
                            {technique.videoUrl && (
                              <div className="absolute bottom-4 right-4">
                                <button className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                                  <Play className="h-4 w-4 ml-0.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                  {technique.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {technique.type}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Clock className="h-4 w-4" />
                                {technique.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Target className="h-4 w-4" />
                                {technique.difficulty}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                {technique.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                              </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                              {technique.description}
                            </p>

                            {/* Tools */}
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Herramientas:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {technique.tools.slice(0, 2).map((tool, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                                  >
                                    {tool}
                                  </span>
                                ))}
                                {technique.tools.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                                    +{technique.tools.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {technique.steps.length} pasos
                              </span>
                              <span className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors">
                                Ver Técnica
                              </span>
                            </div>
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
            // Mostrar técnicas filtradas por subcategoría
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTechniques.map((technique, index) => (
                <motion.div
                  key={technique.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/techniques/${category}/${technique.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {technique.image ? (
                        <img
                          src={technique.image}
                          alt={technique.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
                          <categoryInfo.icon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Premium Badge */}
                      {technique.isPremium && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-full flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Premium
                          </span>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          technique.difficulty === 'Principiante' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                          technique.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                          'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        }`}>
                          {technique.difficulty}
                        </span>
                      </div>

                      {/* Play Button */}
                      {technique.videoUrl && (
                        <div className="absolute bottom-4 right-4">
                          <button className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                            <Play className="h-4 w-4 ml-0.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {technique.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {technique.type}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4" />
                          {technique.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Target className="h-4 w-4" />
                          {technique.difficulty}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {technique.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {technique.description}
                      </p>

                      {/* Tools */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Herramientas:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {technique.tools.slice(0, 2).map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                            >
                              {tool}
                            </span>
                          ))}
                          {technique.tools.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                              +{technique.tools.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {technique.steps.length} pasos
                        </span>
                        <span className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors">
                          Ver Técnica
                        </span>
                      </div>
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
