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
  Sparkles
} from 'lucide-react'

const techniqueCategories = [
  {
    id: 'basic',
    name: 'Técnicas Básicas',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Fundamentos esenciales de la mixología',
    count: 12,
    difficulty: 'Principiante',
    time: '5-15 min',
    subcategories: ['Medición', 'Mezclado', 'Servido', 'Decoración'],
    examples: ['Shake', 'Stir', 'Build', 'Muddle', 'Strain']
  },
  {
    id: 'advanced',
    name: 'Técnicas Avanzadas',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    description: 'Técnicas profesionales y creativas',
    count: 18,
    difficulty: 'Avanzado',
    time: '15-45 min',
    subcategories: ['Flair', 'Molecular', 'Infusiones', 'Fermentación'],
    examples: ['Flair Bartending', 'Spherification', 'Smoking', 'Fat Washing']
  },
  {
    id: 'shaking',
    name: 'Shaking',
    icon: Zap,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-blue-900/20',
    description: 'Técnicas de agitado y mezclado',
    count: 8,
    difficulty: 'Intermedio',
    time: '10-20 min',
    subcategories: ['Dry Shake', 'Wet Shake', 'Reverse Shake', 'Hard Shake'],
    examples: ['Dry Shake', 'Wet Shake', 'Reverse Shake', 'Hard Shake']
  },
  {
    id: 'stirring',
    name: 'Stirring',
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Técnicas de mezclado suave',
    count: 6,
    difficulty: 'Intermedio',
    time: '8-15 min',
    subcategories: ['Stirring', 'Rolling', 'Swizzling', 'Layering'],
    examples: ['Stirring', 'Rolling', 'Swizzling', 'Layering']
  },
  {
    id: 'garnishing',
    name: 'Decoración',
    icon: Star,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Arte de la decoración en cócteles',
    count: 15,
    difficulty: 'Intermedio',
    time: '5-30 min',
    subcategories: ['Frutas', 'Hierbas', 'Flores', 'Especias'],
    examples: ['Twist', 'Wheel', 'Flag', 'Skewer', 'Rim']
  },
  {
    id: 'flair',
    name: 'Flair Bartending',
    icon: Zap,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Técnicas de espectáculo y entretenimiento',
    count: 20,
    difficulty: 'Experto',
    time: '30-60 min',
    subcategories: ['Bottle Flair', 'Glass Flair', 'Fire', 'Juggling'],
    examples: ['Bottle Tossing', 'Glass Spinning', 'Fire Pouring', 'Juggling']
  },
  {
    id: 'molecular',
    name: 'Mixología Molecular',
    icon: Settings,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    description: 'Técnicas científicas y creativas',
    count: 12,
    difficulty: 'Experto',
    time: '45-120 min',
    subcategories: ['Spherification', 'Gelification', 'Emulsification', 'Smoking'],
    examples: ['Spherification', 'Gelification', 'Emulsification', 'Smoking']
  },
  {
    id: 'infusion',
    name: 'Infusiones',
    icon: Droplets,
    color: 'from-teal-500 to-green-600',
    bgColor: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20',
    description: 'Técnicas de extracción de sabores',
    count: 10,
    difficulty: 'Intermedio',
    time: '2-48 horas',
    subcategories: ['Cold Infusion', 'Hot Infusion', 'Fat Washing', 'Clarification'],
    examples: ['Cold Infusion', 'Hot Infusion', 'Fat Washing', 'Clarification']
  }
]

const featuredTechniques = [
  {
    id: '1',
    name: 'Shake Clásico',
    category: 'Shaking',
    difficulty: 'Principiante',
    time: '10 min',
    description: 'La técnica fundamental de agitado en mixología',
    image: '/images/techniques/classic-shake.jpg',
    isEssential: true,
    steps: [
      'Llenar la coctelera con hielo',
      'Añadir los ingredientes',
      'Agitar vigorosamente por 10-15 segundos',
      'Colar en el vaso servido'
    ],
    tools: ['Coctelera', 'Colador', 'Hielo'],
    tips: ['Usar hielo fresco', 'Agitar con fuerza', 'Colar inmediatamente'],
    cocktails: ['Daiquiri', 'Margarita', 'Whiskey Sour']
  },
  {
    id: '2',
    name: 'Stirring',
    category: 'Stirring',
    difficulty: 'Principiante',
    time: '8 min',
    description: 'Técnica de mezclado suave para cócteles con licores',
    image: '/images/techniques/stirring.jpg',
    isEssential: true,
    steps: [
      'Llenar el vaso mezclador con hielo',
      'Añadir los ingredientes',
      'Revolver suavemente por 30-45 segundos',
      'Colar en el vaso servido'
    ],
    tools: ['Vaso mezclador', 'Cuchara bar', 'Colador'],
    tips: ['Revolver suavemente', 'Mantener el hielo', 'No agitar'],
    cocktails: ['Manhattan', 'Martini', 'Negroni']
  },
  {
    id: '3',
    name: 'Muddle',
    category: 'Técnicas Básicas',
    difficulty: 'Principiante',
    time: '5 min',
    description: 'Técnica para extraer sabores de hierbas y frutas',
    image: '/images/techniques/muddle.jpg',
    isEssential: true,
    steps: [
      'Colocar ingredientes en el vaso',
      'Aplicar presión suave con el muddler',
      'Girar ligeramente para extraer sabores',
      'Añadir el resto de ingredientes'
    ],
    tools: ['Muddler', 'Vaso', 'Ingredientes frescos'],
    tips: ['No triturar completamente', 'Presión suave', 'Usar ingredientes frescos'],
    cocktails: ['Mojito', 'Old Fashioned', 'Caipirinha']
  },
  {
    id: '4',
    name: 'Flair Bottle Tossing',
    category: 'Flair Bartending',
    difficulty: 'Experto',
    time: '45 min',
    description: 'Técnica espectacular de manipulación de botellas',
    image: '/images/techniques/bottle-tossing.jpg',
    isEssential: false,
    steps: [
      'Dominar el agarre de la botella',
      'Practicar el movimiento de lanzamiento',
      'Controlar la rotación en el aire',
      'Recibir la botella con seguridad'
    ],
    tools: ['Botella de práctica', 'Espacio amplio', 'Protección'],
    tips: ['Empezar con botellas vacías', 'Practicar en espacios seguros', 'Dominar lo básico primero'],
    cocktails: ['Cócteles con espectáculo', 'Demostraciones', 'Competencias']
  }
]

const difficultyLevels = [
  {
    level: 'Principiante',
    color: 'from-green-500 to-emerald-500',
    description: 'Técnicas básicas y fundamentales',
    time: '5-15 min',
    icon: BookOpen
  },
  {
    level: 'Intermedio',
    color: 'from-yellow-500 to-orange-500',
    description: 'Técnicas que requieren práctica',
    time: '15-30 min',
    icon: Target
  },
  {
    level: 'Avanzado',
    color: 'from-orange-500 to-red-500',
    description: 'Técnicas profesionales complejas',
    time: '30-60 min',
    icon: Award
  },
  {
    level: 'Experto',
    color: 'from-red-500 to-purple-500',
    description: 'Técnicas de maestría y espectáculo',
    time: '60+ min',
    icon: Zap
  }
]

const essentialTools = [
  {
    name: 'Coctelera',
    description: 'Herramienta fundamental para agitar cócteles',
    icon: Zap,
    essential: true,
    price: '$15-50',
    brands: ['Boston Shaker', 'Cobbler Shaker', 'French Shaker']
  },
  {
    name: 'Cuchara Bar',
    description: 'Para mezclar y medir ingredientes',
    icon: Clock,
    essential: true,
    price: '$5-25',
    brands: ['Bar Spoon', 'Jigger Spoon', 'Muddler Spoon']
  },
  {
    name: 'Colador',
    description: 'Para filtrar cócteles y eliminar hielo',
    icon: Filter,
    essential: true,
    price: '$8-20',
    brands: ['Hawthorne Strainer', 'Fine Strainer', 'Julep Strainer']
  },
  {
    name: 'Muddler',
    description: 'Para extraer sabores de hierbas y frutas',
    icon: Award,
    essential: true,
    price: '$10-30',
    brands: ['Wooden Muddler', 'Stainless Steel', 'Ceramic']
  }
]

export default function TechniquesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredTechniques = featuredTechniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technique.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || technique.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || technique.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Técnicas de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mixología</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Domina las técnicas profesionales de la mixología, desde lo básico hasta las técnicas más avanzadas
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar técnicas, métodos, herramientas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
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
              Categorías de Técnicas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Organiza las técnicas por categorías para un aprendizaje estructurado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techniqueCategories.map((category, index) => (
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                          técnicas
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {category.time}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          tiempo
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
                        Ver técnicas
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
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

      {/* Featured Techniques */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Técnicas Destacadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las técnicas más importantes que todo bartender debe dominar
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
              >
                Todas
              </button>
              {techniqueCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
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
              {difficultyLevels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => setSelectedDifficulty(level.level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedDifficulty === level.level
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                  }`}
                >
                  {level.level}
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

          {/* Techniques Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTechniques.map((technique, index) => (
              <motion.div
                key={technique.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    {/* Essential Badge */}
                    {technique.isEssential && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Esencial
                        </span>
                      </div>
                    )}

                    {/* Difficulty Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        technique.difficulty === 'Principiante' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                        technique.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                        technique.difficulty === 'Avanzado' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' :
                        'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}>
                        {technique.difficulty}
                      </span>
                    </div>

                    {/* Play Button */}
                    <button className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-300">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {technique.name}
                      </h3>
                      <button
                        onClick={() => setExpandedTechnique(expandedTechnique === technique.id ? null : technique.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {technique.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {technique.category}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {technique.description}
                    </p>

                    {/* Cocktails */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Cócteles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {technique.cocktails.map((cocktail, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                          >
                            {cocktail}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedTechnique === technique.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                      >
                        {/* Steps */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Pasos:
                          </p>
                          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {technique.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Tools */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Herramientas:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {technique.tools.map((tool, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tips */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Consejos:
                          </p>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {technique.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                        <Play className="h-4 w-4" />
                        Ver Tutorial
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

      {/* Difficulty Levels */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Niveles de Dificultad
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Progresión de aprendizaje desde principiante hasta experto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {difficultyLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <level.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {level.level}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {level.description}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Timer className="h-4 w-4" />
                      {level.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Tools */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Herramientas Esenciales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las herramientas fundamentales que todo bartender debe tener
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {essentialTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {tool.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Precio aproximado
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Marcas recomendadas:
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {tool.brands.map((brand, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
