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
  Sparkles,
  Wrench,
  Scissors,
  ShoppingCart,
  DollarSign,
  Shield
} from 'lucide-react'

interface Tool {
  id: string
  name: string
  category: string
  type: string
  difficulty: string
  price: string
  description: string
  features: string[]
  materials: string[]
  care: string[]
  image?: string
  rating: number
  isPremium: boolean
  brand?: string
  origin?: string
  material?: string
  size?: string
  capacity?: string
  uses?: string
  isEssential?: boolean
}

const categoryConfig = {
  essential: {
    name: 'Herramientas Esenciales',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Herramientas básicas que todo bartender debe tener',
    subcategories: ['Cocteleras', 'Cucharas', 'Coladores', 'Medidores']
  },
  premium: {
    name: 'Herramientas Premium',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Herramientas profesionales de alta calidad',
    subcategories: ['Cocteleras Premium', 'Accesorios', 'Decoración', 'Medición']
  },
  specialized: {
    name: 'Herramientas Especializadas',
    icon: Settings,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Herramientas para técnicas específicas',
    subcategories: ['Molecular', 'Flair', 'Decoración', 'Medición']
  },
  decoration: {
    name: 'Herramientas de Decoración',
    icon: Star,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Herramientas para decorar cócteles',
    subcategories: ['Cuchillos', 'Moldes', 'Skewers', 'Rimmers']
  },
  measurement: {
    name: 'Herramientas de Medición',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Herramientas para medir ingredientes',
    subcategories: ['Jiggers', 'Escalas', 'Medidores', 'Tazas']
  },
  ice: {
    name: 'Herramientas de Hielo',
    icon: Snowflake,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-cyan-900/20',
    description: 'Herramientas para trabajar con hielo',
    subcategories: ['Moldes', 'Trituradores', 'Pinzas', 'Bandejas']
  },
  flair: {
    name: 'Herramientas de Flair',
    icon: Zap,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Herramientas para flair bartending',
    subcategories: ['Botellas', 'Vasos', 'Accesorios', 'Protección']
  },
  molecular: {
    name: 'Herramientas Moleculares',
    icon: Settings,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    description: 'Herramientas para mixología molecular',
    subcategories: ['Spherification', 'Gelification', 'Emulsification', 'Smoking']
  }
}

// Mock data para cada categoría
const mockTools: Record<string, Tool[]> = {
  essential: [
    {
      id: '1',
      name: 'Boston Shaker',
      category: 'Herramientas Esenciales',
      type: 'Cocteleras',
      difficulty: 'Principiante',
      price: '$25-80',
      description: 'La coctelera más versátil y esencial para cualquier bartender.',
      features: ['Dos piezas', 'Acero inoxidable', 'Fácil de usar', 'Duradera'],
      materials: ['Acero inoxidable', 'Sellos de goma'],
      care: ['Lavar con agua caliente', 'Secar completamente', 'Almacenar separado'],
      image: '/images/tools/boston-shaker.jpg',
      rating: 4.8,
      isPremium: false,
      brand: 'Koriko',
      origin: 'Japón'
    },
    {
      id: '2',
      name: 'Bar Spoon',
      category: 'Herramientas Esenciales',
      type: 'Cucharas',
      difficulty: 'Principiante',
      price: '$8-25',
      description: 'Cuchara larga para mezclar cócteles y medir ingredientes.',
      features: ['30cm de longitud', 'Extremo en espiral', 'Peso balanceado', 'Acero inoxidable'],
      materials: ['Acero inoxidable', 'Mango ergonómico'],
      care: ['Lavar a mano', 'Secar inmediatamente', 'Almacenar en seco'],
      image: '/images/tools/bar-spoon.jpg',
      rating: 4.6,
      isPremium: false,
      brand: 'OXO',
      origin: 'Estados Unidos'
    },
    {
      id: '3',
      name: 'Hawthorne Strainer',
      category: 'Herramientas Esenciales',
      type: 'Coladores',
      difficulty: 'Principiante',
      price: '$12-35',
      description: 'Colador con resorte para filtrar cócteles agitados.',
      features: ['Resorte ajustable', 'Filtro fino', 'Fácil limpieza', 'Duradero'],
      materials: ['Acero inoxidable', 'Resorte de acero'],
      care: ['Desmontar para limpiar', 'Cepillar resorte', 'Secar completamente'],
      image: '/images/tools/hawthorne-strainer.jpg',
      rating: 4.7,
      isPremium: false,
      brand: 'Koriko',
      origin: 'Japón'
    }
  ],
  premium: [
    {
      id: '4',
      name: 'Koriko Shaker Set',
      category: 'Herramientas Premium',
      type: 'Cocteleras Premium',
      difficulty: 'Profesional',
      price: '$150-300',
      description: 'Set premium de cocteleras japonesas de alta calidad.',
      features: ['Acero inoxidable premium', 'Sellos perfectos', 'Diseño ergonómico', 'Garantía de por vida'],
      materials: ['Acero inoxidable 18/8', 'Sellos de silicona'],
      care: ['Lavar a mano', 'Usar detergente suave', 'Secar con paño suave'],
      image: '/images/tools/koriko-set.jpg',
      rating: 4.9,
      isPremium: true,
      brand: 'Koriko',
      origin: 'Japón'
    }
  ],
  decoration: [
    {
      id: '5',
      name: 'Garnish Knife Set',
      category: 'Herramientas de Decoración',
      type: 'Cuchillos',
      difficulty: 'Intermedio',
      price: '$35-80',
      description: 'Set de cuchillos especializados para decorar cócteles.',
      features: ['3 cuchillos especializados', 'Filos afilados', 'Mangos ergonómicos', 'Estuche incluido'],
      materials: ['Acero inoxidable', 'Mangos de madera'],
      care: ['Lavar a mano', 'Secar inmediatamente', 'Afilado profesional'],
      image: '/images/tools/garnish-knife.jpg',
      rating: 4.5,
      isPremium: false,
      brand: 'Victorinox',
      origin: 'Suiza'
    }
  ]
}

export default function CategoryToolsPage() {
  const params = useParams()
  const category = params?.category as string
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')

  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig]

  useEffect(() => {
    const loadTools = async () => {
      try {
        setLoading(true)
        
        // Mapear categoría de URL a categoría de base de datos
        const categoryMap: { [key: string]: string } = {
          'essential': 'BARTENDER',
          'bartender': 'BARTENDER',
          'mixologist': 'MIXOLOGIST',
          'premium': 'MIXOLOGIST',
          'sommelier': 'SOMMELIER',
          'specialized': 'MIXOLOGIST',
          'decoration': 'MIXOLOGIST'
        }
        
        const dbCategory = categoryMap[category.toLowerCase()] || category.toUpperCase()
        
        console.log('Loading tools for category:', dbCategory)
        
        const response = await fetch(`/api/admin/tools?category=${dbCategory}`)
        
        if (response.ok) {
          const data = await response.json()
          const toolsData = data.tools || []
          
          console.log('Tools loaded:', toolsData.length)
          
          // Transformar datos de la API al formato del componente
          const transformedTools: Tool[] = toolsData.map((tool: any) => ({
            id: tool.id,
            name: tool.name,
            category: categoryInfo?.name || tool.category,
            type: tool.subcategory || tool.category,
            difficulty: tool.isProfessional ? 'Profesional' : 'Básico',
            price: tool.price || 'Consultar',
            description: tool.description || '',
            features: tool.uses ? tool.uses.split('\n').filter((f: string) => f.trim()) : [],
            materials: tool.material ? [tool.material] : [],
            care: tool.maintenance ? tool.maintenance.split('\n').filter((c: string) => c.trim()) : [],
            image: tool.image,
            rating: 4.5,
            isPremium: tool.isProfessional || false,
            brand: tool.brand,
            origin: tool.origin,
            material: tool.material,
            size: tool.size,
            capacity: tool.capacity,
            uses: tool.uses,
            isEssential: tool.isEssential
          }))
          
          setTools(transformedTools)
        }
      } catch (error) {
        console.error('Error loading tools:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryInfo) {
      loadTools()
    }
  }, [category, categoryInfo])

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              tool.type.toLowerCase().includes(selectedSubcategory.toLowerCase())
    
    return matchesSearch && matchesSubcategory
  })

  // Agrupar herramientas por subcategoría para mostrar mejor organización
  const groupedTools = tools.reduce((acc, tool) => {
    const subcategory = tool.type
    if (!acc[subcategory]) {
      acc[subcategory] = []
    }
    acc[subcategory].push(tool)
    return acc
  }, {} as Record<string, Tool[]>)

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
            href="/tools"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Herramientas
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
          <p className="text-gray-600 dark:text-gray-300">Cargando herramientas...</p>
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
            href="/tools"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Herramientas
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
                <Package className="h-4 w-4" /> {tools.length} Herramientas
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
                  <option value="difficulty">Ordenar por Dificultad</option>
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
                      {tools.filter(tool => tool.type.toLowerCase().includes(subcategory.toLowerCase())).length} herramientas
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubcategory === 'all' ? `${categoryInfo.name} Disponibles` : `${selectedSubcategory} - ${categoryInfo.name}`}
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredTools.length} herramientas encontradas
            </span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <categoryInfo.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron herramientas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay herramientas disponibles en esta categoría'}
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
              {Object.entries(groupedTools).map(([subcategory, subcategoryTools], groupIndex) => (
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
                      {subcategoryTools.length} herramientas en esta subcategoría
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategoryTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <Link href={`/tools/${category}/${tool.id}`}>
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer">
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden">
                            {tool.image ? (
                              <img
                                src={tool.image}
                                alt={tool.name}
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
                                {tool.isEssential && (
                                  <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                                    ⭐ Esencial
                                  </span>
                                )}
                                {tool.isPremium && (
                                  <span className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                                    <Award className="h-3 w-3" />
                                    Premium
                                  </span>
                                )}
                              </div>
                              
                              {/* Difficulty Badge */}
                              <span className={`px-3 py-1.5 backdrop-blur-sm text-sm font-bold rounded-full shadow-lg ${
                                tool.difficulty === 'Básico' ? 'bg-green-400/95 text-gray-900' :
                                tool.difficulty === 'Profesional' ? 'bg-blue-500/95 text-white' :
                                'bg-purple-500/95 text-white'
                              }`}>
                                {tool.difficulty}
                              </span>
                            </div>

                            {/* Bottom Info on Image */}
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                                {tool.name}
                              </h3>
                              {tool.brand && (
                                <p className="text-sm text-white/90 drop-shadow">
                                  {tool.brand}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col">
                            {/* Type/Subcategory */}
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {tool.type}
                              </span>
                            </div>

                            {/* Technical Details Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              {tool.material && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 col-span-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🔧 Material</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">{tool.material}</p>
                                </div>
                              )}

                              {tool.size && (
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">📏 Tamaño</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">{tool.size}</p>
                                </div>
                              )}

                              {tool.capacity && (
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">📦 Capacidad</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">{tool.capacity}</p>
                                </div>
                              )}
                            </div>

                            {/* Description */}
                            {tool.description && (
                              <div className="mb-4">
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                  {tool.description}
                                </p>
                              </div>
                            )}

                            {/* Uses */}
                            {tool.uses && (
                              <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">🎯 Usos:</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{tool.uses}</p>
                              </div>
                            )}

                            {/* Price - Push to bottom */}
                            {tool.price && (
                              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    ${tool.price}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    aprox.
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
            // Mostrar herramientas filtradas por subcategoría
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/tools/${category}/${tool.id}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {tool.image ? (
                        <img
                          src={tool.image}
                          alt={tool.name}
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
                          {tool.isEssential && (
                            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                              ⭐ Esencial
                            </span>
                          )}
                          {tool.isPremium && (
                            <span className="px-3 py-1 bg-yellow-400/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                              <Award className="h-3 w-3" />
                              Premium
                            </span>
                          )}
                        </div>
                        
                        {/* Difficulty Badge */}
                        <span className={`px-3 py-1.5 backdrop-blur-sm text-sm font-bold rounded-full shadow-lg ${
                          tool.difficulty === 'Básico' ? 'bg-green-400/95 text-gray-900' :
                          tool.difficulty === 'Profesional' ? 'bg-blue-500/95 text-white' :
                          'bg-purple-500/95 text-white'
                        }`}>
                          {tool.difficulty}
                        </span>
                      </div>

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                          {tool.name}
                        </h3>
                        {tool.brand && (
                          <p className="text-sm text-white/90 drop-shadow">
                            {tool.brand}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Type/Subcategory */}
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {tool.type}
                        </span>
                      </div>

                      {/* Technical Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {tool.material && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">🔧 Material</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{tool.material}</p>
                          </div>
                        )}

                        {tool.size && (
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">📏 Tamaño</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{tool.size}</p>
                          </div>
                        )}

                        {tool.capacity && (
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">📦 Capacidad</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{tool.capacity}</p>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {tool.description && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                            {tool.description}
                          </p>
                        </div>
                      )}

                      {/* Uses */}
                      {tool.uses && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">🎯 Usos:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{tool.uses}</p>
                        </div>
                      )}

                      {/* Price - Push to bottom */}
                      {tool.price && (
                        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              ${tool.price}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              aprox.
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
