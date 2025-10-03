'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
  Wrench,
  Scissors,
  Package,
  ShoppingCart,
  DollarSign,
  Shield,
  Zap as ZapIcon,
  Clock as ClockIcon,
  Award as AwardIcon,
  BookOpen as BookOpenIcon
} from 'lucide-react'

const toolCategories = [
  {
    id: 'essential',
    name: 'Herramientas Esenciales',
    icon: BookOpenIcon,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Herramientas básicas que todo bartender debe tener',
    count: 8,
    difficulty: 'Principiante',
    price: '$50-200',
    subcategories: ['Cocteleras', 'Cucharas', 'Coladores', 'Medidores'],
    examples: ['Boston Shaker', 'Bar Spoon', 'Hawthorne Strainer', 'Jigger']
  },
  {
    id: 'premium',
    name: 'Herramientas Premium',
    icon: AwardIcon,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Herramientas profesionales de alta calidad',
    count: 12,
    difficulty: 'Profesional',
    price: '$200-1000',
    subcategories: ['Cocteleras Premium', 'Accesorios', 'Decoración', 'Medición'],
    examples: ['Koriko Shaker', 'Japanese Jigger', 'Fine Strainer', 'Muddler Set']
  },
  {
    id: 'specialized',
    name: 'Herramientas Especializadas',
    icon: Settings,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Herramientas para técnicas específicas',
    count: 15,
    difficulty: 'Avanzado',
    price: '$100-500',
    subcategories: ['Molecular', 'Flair', 'Decoración', 'Medición'],
    examples: ['Spherification Kit', 'Flair Bottles', 'Garnish Tools', 'Precision Scale']
  },
  {
    id: 'decoration',
    name: 'Herramientas de Decoración',
    icon: Star,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Herramientas para decorar cócteles',
    count: 20,
    difficulty: 'Intermedio',
    price: '$20-150',
    subcategories: ['Cuchillos', 'Moldes', 'Skewers', 'Rimmers'],
    examples: ['Garnish Knife', 'Ice Molds', 'Cocktail Picks', 'Salt Rim']
  },
  {
    id: 'measurement',
    name: 'Herramientas de Medición',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Herramientas para medir ingredientes',
    count: 10,
    difficulty: 'Principiante',
    price: '$15-100',
    subcategories: ['Jiggers', 'Escalas', 'Medidores', 'Tazas'],
    examples: ['Japanese Jigger', 'Digital Scale', 'Measuring Cup', 'Pour Spouts']
  },
  {
    id: 'ice',
    name: 'Herramientas de Hielo',
    icon: Snowflake,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20',
    description: 'Herramientas para trabajar con hielo',
    count: 8,
    difficulty: 'Intermedio',
    price: '$30-200',
    subcategories: ['Moldes', 'Trituradores', 'Pinzas', 'Bandejas'],
    examples: ['Ice Molds', 'Ice Crusher', 'Ice Tongs', 'Ice Bucket']
  },
  {
    id: 'flair',
    name: 'Herramientas de Flair',
    icon: ZapIcon,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Herramientas para flair bartending',
    count: 15,
    difficulty: 'Experto',
    price: '$50-300',
    subcategories: ['Botellas', 'Vasos', 'Accesorios', 'Protección'],
    examples: ['Flair Bottles', 'Practice Glasses', 'Safety Gear', 'Performance Tools']
  },
  {
    id: 'molecular',
    name: 'Herramientas Moleculares',
    icon: Settings,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    description: 'Herramientas para mixología molecular',
    count: 12,
    difficulty: 'Experto',
    price: '$200-800',
    subcategories: ['Kit Molecular', 'Herramientas', 'Químicos', 'Medición'],
    examples: ['Spherification Kit', 'Agar Agar', 'Sodium Alginate', 'Precision Tools']
  }
]

const featuredTools = [
  {
    id: '1',
    name: 'Boston Shaker Koriko',
    category: 'Herramientas Esenciales',
    type: 'Coctelera',
    brand: 'Koriko',
    price: 45,
    rating: 4.9,
    reviews: 1247,
    description: 'La coctelera más versátil y profesional del mercado',
    image: '/images/tools/boston-shaker-koriko.jpg',
    isEssential: true,
    features: ['Acero inoxidable', 'Doble pared', 'Fácil separación', 'Durabilidad'],
    pros: ['Versátil', 'Duradera', 'Buena mezcla', 'Fácil de usar'],
    cons: ['Requiere práctica', 'Puede ser ruidosa'],
    maintenance: 'Lavar con agua caliente y secar inmediatamente',
    warranty: '2 años',
    availability: 'Disponible'
  },
  {
    id: '2',
    name: 'Japanese Jigger 30/60ml',
    category: 'Herramientas de Medición',
    type: 'Medidor',
    brand: 'Cocktail Kingdom',
    price: 25,
    rating: 4.8,
    reviews: 892,
    description: 'Medidor de precisión japonesa con medidas internas',
    image: '/images/tools/japanese-jigger.jpg',
    isEssential: true,
    features: ['Medidas internas', 'Precisión milimétrica', 'Fácil lectura', 'Diseño ergonómico'],
    pros: ['Precisión', 'Fácil de usar', 'Duradera', 'Diseño elegante'],
    cons: ['Precio elevado', 'Requiere cuidado'],
    maintenance: 'Lavar a mano, no usar lavavajillas',
    warranty: '1 año',
    availability: 'Disponible'
  },
  {
    id: '3',
    name: 'Hawthorne Strainer',
    category: 'Herramientas Esenciales',
    type: 'Colador',
    brand: 'Barfly',
    price: 18,
    rating: 4.7,
    reviews: 2156,
    description: 'Colador profesional con resorte para cócteles',
    image: '/images/tools/hawthorne-strainer.jpg',
    isEssential: true,
    features: ['Resorte ajustable', 'Filtro fino', 'Mango ergonómico', 'Acero inoxidable'],
    pros: ['Filtra bien', 'Fácil de usar', 'Duradera', 'Versátil'],
    cons: ['Puede atascarse', 'Requiere limpieza'],
    maintenance: 'Limpiar con cepillo después de cada uso',
    warranty: '1 año',
    availability: 'Disponible'
  },
  {
    id: '4',
    name: 'Bar Spoon 12"',
    category: 'Herramientas Esenciales',
    type: 'Cuchara',
    brand: 'Cocktail Kingdom',
    price: 22,
    rating: 4.6,
    reviews: 1456,
    description: 'Cuchara de bar profesional con espiral y disco',
    image: '/images/tools/bar-spoon.jpg',
    isEssential: true,
    features: ['12 pulgadas', 'Espiral decorativa', 'Disco medidor', 'Acero inoxidable'],
    pros: ['Versátil', 'Duradera', 'Buena mezcla', 'Diseño clásico'],
    cons: ['Precio elevado', 'Requiere cuidado'],
    maintenance: 'Lavar a mano, secar inmediatamente',
    warranty: '1 año',
    availability: 'Disponible'
  }
]

const maintenanceTips = [
  {
    tip: 'Limpieza Diaria',
    description: 'Lavar todas las herramientas después de cada uso',
    icon: ClockIcon,
    frequency: 'Después de cada uso',
    details: 'Usar agua caliente y jabón suave, secar inmediatamente'
  },
  {
    tip: 'Limpieza Profunda',
    description: 'Limpieza semanal con productos especializados',
    icon: Settings,
    frequency: 'Semanal',
    details: 'Usar limpiadores específicos para acero inoxidable'
  },
  {
    tip: 'Almacenamiento',
    description: 'Guardar en lugar seco y ventilado',
    icon: Package,
    frequency: 'Siempre',
    details: 'Evitar humedad y cambios de temperatura extremos'
  },
  {
    tip: 'Inspección',
    description: 'Revisar herramientas regularmente',
    icon: CheckCircle,
    frequency: 'Mensual',
    details: 'Verificar desgaste, corrosión y funcionamiento'
  }
]

const priceRanges = [
  {
    range: 'Económico',
    min: 0,
    max: 50,
    color: 'from-green-500 to-emerald-500',
    description: 'Herramientas básicas para principiantes',
    icon: BookOpenIcon
  },
  {
    range: 'Intermedio',
    min: 50,
    max: 150,
    color: 'from-yellow-500 to-orange-500',
    description: 'Herramientas de calidad media',
    icon: Target
  },
  {
    range: 'Premium',
    min: 150,
    max: 500,
    color: 'from-orange-500 to-red-500',
    description: 'Herramientas profesionales',
    icon: AwardIcon
  },
  {
    range: 'Lujo',
    min: 500,
    max: 2000,
    color: 'from-red-500 to-purple-500',
    description: 'Herramientas de alta gama',
    icon: Star
  }
]

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedTool, setExpandedTool] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredTools = featuredTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesPrice = selectedPriceRange === 'all' || 
                        (tool.price >= priceRanges.find(r => r.range === selectedPriceRange)?.min! && 
                         tool.price <= priceRanges.find(r => r.range === selectedPriceRange)?.max!)
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Herramientas de <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Mixología</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Descubre las mejores herramientas profesionales para bartenders. Desde lo básico hasta lo más avanzado
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar herramientas, marcas, categorías..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorías de Herramientas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Organiza tus herramientas por categorías para una mejor gestión de tu bar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer`}>
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.count}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          herramientas
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {category.price}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          precio
                        </div>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.difficulty === 'Principiante' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                        category.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                        category.difficulty === 'Avanzado' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' :
                        'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}>
                        {category.difficulty}
                      </span>
                    </div>

                    {/* Examples */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ejemplos:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {category.examples.slice(0, 3).map((example, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {example}
                          </span>
                        ))}
                        {category.examples.length > 3 && (
                          <span className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full">
                            +{category.examples.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Ver herramientas
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Herramientas Destacadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las herramientas más populares y mejor valoradas por la comunidad
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                }`}
              >
                Todas
              </button>
              {toolCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPriceRange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedPriceRange === 'all'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                }`}
              >
                Todos
              </button>
              {priceRanges.map((range) => (
                <button
                  key={range.range}
                  onClick={() => setSelectedPriceRange(range.range)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedPriceRange === range.range
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                >
                  {range.range}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </button>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Wrench className="h-16 w-16 text-orange-600 dark:text-orange-400" />
                    </div>
                    
                    {/* Essential Badge */}
                    {tool.isEssential && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Esencial
                        </span>
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        ${tool.price}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {tool.name}
                      </h3>
                      <button
                        onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {tool.brand}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        {tool.type}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {tool.rating} ({tool.reviews} reviews)
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Características:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {tool.features.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{tool.features.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedTool === tool.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                      >
                        {/* Pros and Cons */}
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
                              Ventajas:
                            </p>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              {tool.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-2">
                              Desventajas:
                            </p>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              {tool.cons.map((con, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <AlertCircle className="h-3 w-3 text-red-500" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Maintenance */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Mantenimiento:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tool.maintenance}
                          </p>
                        </div>

                        {/* Warranty */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Garantía: {tool.warranty}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {tool.availability}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                        <ShoppingCart className="h-4 w-4" />
                        Comprar
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Ranges */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rangos de Precio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Encuentra herramientas según tu presupuesto y nivel de experiencia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {priceRanges.map((range, index) => (
              <motion.div
                key={range.range}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${range.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <range.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {range.range}
                    </h3>
                    
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      ${range.min} - ${range.max}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {range.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Consejos de Mantenimiento
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mantén tus herramientas en perfecto estado para un rendimiento óptimo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceTips.map((tip, index) => (
              <motion.div
                key={tip.tip}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <tip.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {tip.tip}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {tip.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 font-medium mb-3">
                    <Clock className="h-4 w-4" />
                    {tip.frequency}
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tip.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
