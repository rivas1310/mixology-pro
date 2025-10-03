'use client'

import { useState } from 'react'
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
  Star as StarIcon
} from 'lucide-react'

const martiniTypes = [
  {
    name: 'Dry Martini',
    description: 'El martini clásico, seco y elegante',
    icon: StarIcon,
    color: 'from-blue-500 to-cyan-500',
    count: 8,
    difficulty: 'Intermedio',
    time: '4-6 min',
    characteristics: ['Seco', 'Elegante', 'Clásico', 'Sofisticado'],
    examples: ['Dry Martini', 'Extra Dry Martini', 'Bone Dry Martini']
  },
  {
    name: 'Wet Martini',
    description: 'Martini con más vermut, más suave',
    icon: DropletsIcon,
    color: 'from-green-500 to-emerald-500',
    count: 6,
    difficulty: 'Intermedio',
    time: '4-6 min',
    characteristics: ['Suave', 'Aromático', 'Equilibrado', 'Versátil'],
    examples: ['Wet Martini', 'Perfect Martini', '50/50 Martini']
  },
  {
    name: 'Dirty Martini',
    description: 'Martini con jugo de aceituna, salado',
    icon: ZapIcon,
    color: 'from-purple-500 to-indigo-500',
    count: 5,
    difficulty: 'Intermedio',
    time: '5-7 min',
    characteristics: ['Salado', 'Aromático', 'Complejo', 'Único'],
    examples: ['Dirty Martini', 'Extra Dirty Martini', 'Filthy Martini']
  },
  {
    name: 'Vodka Martini',
    description: 'Martini con vodka en lugar de gin',
    icon: WineIcon,
    color: 'from-gray-500 to-slate-500',
    count: 7,
    difficulty: 'Fácil',
    time: '3-5 min',
    characteristics: ['Suave', 'Neutro', 'Versátil', 'Moderno'],
    examples: ['Vodka Martini', 'Cosmopolitan', 'Appletini']
  }
]

const featuredMartinis = [
  {
    id: '1',
    name: 'Dry Martini',
    type: 'Clásico',
    difficulty: 'Intermedio',
    time: '4 min',
    abv: 30,
    description: 'El martini perfecto, seco y elegante',
    image: '/images/martinis/dry-martini.jpg',
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
    rating: 4.9,
    reviews: 2156,
    tips: [
      'Usar gin de calidad premium',
      'Enfriar bien la copa',
      'Revolver, no agitar',
      'Servir inmediatamente'
    ]
  },
  {
    id: '2',
    name: 'Dirty Martini',
    type: 'Moderno',
    difficulty: 'Intermedio',
    time: '5 min',
    abv: 28,
    description: 'Martini con jugo de aceituna, salado y aromático',
    image: '/images/martinis/dirty-martini.jpg',
    isClassic: false,
    ingredients: [
      { name: 'Gin', amount: '60ml', type: 'Spirit' },
      { name: 'Vermut Seco', amount: '10ml', type: 'Fortified Wine' },
      { name: 'Jugo de Aceituna', amount: '15ml', type: 'Juice' },
      { name: 'Aceituna', amount: '2 unidades', type: 'Garnish' }
    ],
    instructions: [
      'Enfriar la copa con hielo',
      'Mezclar gin, vermut y jugo de aceituna',
      'Revolver con hielo por 30 segundos',
      'Colar en copa enfriada',
      'Decorar con aceitunas'
    ],
    garnish: 'Aceitunas verdes',
    glass: 'Copa Martini',
    technique: 'Stir',
    history: 'Creado en 1901. Popularizado por Franklin D. Roosevelt.',
    rating: 4.7,
    reviews: 1892,
    tips: [
      'Usar jugo de aceituna de calidad',
      'No exceder la cantidad de jugo',
      'Revolver suavemente',
      'Servir frío'
    ]
  },
  {
    id: '3',
    name: 'Vesper',
    type: 'Especial',
    difficulty: 'Avanzado',
    time: '6 min',
    abv: 32,
    description: 'Martini especial creado por Ian Fleming para James Bond',
    image: '/images/martinis/vesper.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Gin', amount: '45ml', type: 'Spirit' },
      { name: 'Vodka', amount: '15ml', type: 'Spirit' },
      { name: 'Lillet Blanc', amount: '7ml', type: 'Fortified Wine' },
      { name: 'Cáscara de Limón', amount: '1 unidad', type: 'Garnish' }
    ],
    instructions: [
      'Enfriar la copa con hielo',
      'Mezclar gin, vodka y Lillet',
      'Revolver con hielo por 30 segundos',
      'Colar en copa enfriada',
      'Exprimir cáscara de limón'
    ],
    garnish: 'Cáscara de limón',
    glass: 'Copa Martini',
    technique: 'Stir',
    history: 'Creado por Ian Fleming en 1953 para James Bond.',
    rating: 4.8,
    reviews: 1456,
    tips: [
      'Usar Lillet Blanc auténtico',
      'No sustituir ingredientes',
      'Revolver con precisión',
      'Exprimir la cáscara correctamente'
    ]
  },
  {
    id: '4',
    name: 'Gibson',
    type: 'Clásico',
    difficulty: 'Intermedio',
    time: '4 min',
    abv: 29,
    description: 'Martini seco decorado con cebollita en vinagre',
    image: '/images/martinis/gibson.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Gin', amount: '60ml', type: 'Spirit' },
      { name: 'Vermut Seco', amount: '10ml', type: 'Fortified Wine' },
      { name: 'Cebollita en Vinagre', amount: '1 unidad', type: 'Garnish' }
    ],
    instructions: [
      'Enfriar la copa con hielo',
      'Mezclar gin y vermut en vaso mezclador',
      'Revolver con hielo por 30 segundos',
      'Colar en copa enfriada',
      'Decorar con cebollita'
    ],
    garnish: 'Cebollita en vinagre',
    glass: 'Copa Martini',
    technique: 'Stir',
    history: 'Creado en 1890. Nombrado en honor a Charles Dana Gibson.',
    rating: 4.6,
    reviews: 1234,
    tips: [
      'Usar cebollitas pequeñas',
      'Enjuagar la cebollita',
      'Revolver suavemente',
      'Servir inmediatamente'
    ]
  }
]

const martiniGlassware = [
  {
    name: 'Copa Martini Clásica',
    description: 'La copa tradicional para martinis',
    icon: StarIcon,
    capacity: '150-200ml',
    material: 'Cristal',
    price: '$15-50',
    brands: ['Riedel', 'Schott Zwiesel', 'Libbey'],
    pros: ['Elegante', 'Tradicional', 'Buena presentación'],
    cons: ['Frágil', 'Precio elevado']
  },
  {
    name: 'Copa Martini Moderna',
    description: 'Diseño contemporáneo para martinis',
    icon: AwardIcon,
    capacity: '120-180ml',
    material: 'Cristal templado',
    price: '$20-60',
    brands: ['Riedel', 'Spiegelau', 'Zalto'],
    pros: ['Resistente', 'Moderno', 'Fácil limpieza'],
    cons: ['Menos tradicional', 'Precio elevado']
  },
  {
    name: 'Copa Martini de Acero',
    description: 'Copa de acero inoxidable para martinis',
    icon: Shield,
    capacity: '100-150ml',
    material: 'Acero inoxidable',
    price: '$25-40',
    brands: ['Barfly', 'Cocktail Kingdom', 'Koriko'],
    pros: ['Resistente', 'Mantiene frío', 'Duradera'],
    cons: ['No transparente', 'Peso elevado']
  }
]

const martiniTechniques = [
  {
    technique: 'Stirring',
    description: 'Revolver suavemente con cuchara bar',
    icon: ClockIcon,
    time: '30-45 segundos',
    difficulty: 'Intermedio',
    details: 'Revolver en sentido horario con movimientos suaves y controlados'
  },
  {
    technique: 'Chilling',
    description: 'Enfriar la copa antes de servir',
    icon: Snowflake,
    time: '2-3 minutos',
    difficulty: 'Fácil',
    details: 'Llenar la copa con hielo y agua, dejar reposar, vaciar y secar'
  },
  {
    technique: 'Straining',
    description: 'Colar el martini sin hielo',
    icon: DropletsIcon,
    time: '5-10 segundos',
    difficulty: 'Fácil',
    details: 'Usar colador fino para eliminar cualquier residuo de hielo'
  },
  {
    technique: 'Garnishing',
    description: 'Decorar con elegancia',
    icon: StarIcon,
    time: '10-15 segundos',
    difficulty: 'Fácil',
    details: 'Colocar la decoración con cuidado y precisión'
  }
]

const martiniHistory = [
  {
    year: '1860',
    event: 'Creación del Martini',
    description: 'Primera mención del martini en un libro de cócteles',
    icon: BookOpenIcon
  },
  {
    year: '1901',
    event: 'Dirty Martini',
    description: 'Franklin D. Roosevelt populariza el dirty martini',
    icon: AwardIcon
  },
  {
    year: '1953',
    event: 'Vesper Martini',
    description: 'Ian Fleming crea el Vesper para James Bond',
    icon: StarIcon
  },
  {
    year: '1960',
    event: 'Vodka Martini',
    description: 'Popularización del vodka martini en Estados Unidos',
    icon: WineIcon
  }
]

export default function MartinisPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [expandedMartini, setExpandedMartini] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredMartinis = featuredMartinis.filter(martini => {
    const matchesSearch = martini.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         martini.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         martini.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || martini.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <StarIcon className="h-12 w-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Martinis
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Los cócteles más elegantes y sofisticados. Desde el clásico Dry Martini hasta creaciones modernas
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar martinis, tipos, ingredientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Martini Types */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tipos de Martinis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada tipo de martini tiene sus propias características y técnicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {martiniTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {type.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {type.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {type.count}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          martinis
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {type.time}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          tiempo
                        </div>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        type.difficulty === 'Fácil' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                        type.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                        'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                      }`}>
                        {type.difficulty}
                      </span>
                    </div>

                    {/* Characteristics */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Características:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {type.characteristics.map((char, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ejemplos:
                      </p>
                      <div className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">{example}</p>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Ver martinis
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Martinis */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Martinis Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los martinis más populares y mejor valorados
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              Todos
            </button>
            {martiniTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Martinis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMartinis.map((martini, index) => (
              <motion.div
                key={martini.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">
                        {martini.name}
                      </h3>
                      <button
                        onClick={() => setExpandedMartini(expandedMartini === martini.id ? null : martini.id)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-blue-100 mb-4">
                      {martini.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {martini.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        {martini.difficulty}
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        {martini.abv}% ABV
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Ingredients */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Ingredientes:
                      </h4>
                      <div className="space-y-2">
                        {martini.ingredients.map((ingredient, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">{ingredient.name}</span>
                            <span className="text-gray-500 dark:text-gray-400">{ingredient.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Preparación:
                      </h4>
                      <ol className="space-y-2">
                        {martini.instructions.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-semibold">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expanded Info */}
                    {expandedMartini === martini.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
                      >
                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Vaso:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {martini.glass}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Técnica:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {martini.technique}
                            </p>
                          </div>
                        </div>

                        {/* History */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Historia:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {martini.history}
                          </p>
                        </div>

                        {/* Tips */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Consejos:
                          </p>
                          <ul className="space-y-1">
                            {martini.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
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

      {/* Martini Glassware */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Copas para Martinis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las copas perfectas para servir martinis elegantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {martiniGlassware.map((glass, index) => (
              <motion.div
                key={glass.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <glass.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {glass.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {glass.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {glass.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {glass.capacity} • {glass.material}
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                          Ventajas:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {glass.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                          Desventajas:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {glass.cons.map((con, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-red-500" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Marcas recomendadas:
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {glass.brands.map((brand, idx) => (
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

      {/* Martini Techniques */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Técnicas de Martini
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las técnicas esenciales para preparar martinis perfectos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {martiniTechniques.map((technique, index) => (
              <motion.div
                key={technique.technique}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <technique.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {technique.technique}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {technique.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {technique.time}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Target className="h-4 w-4" />
                        {technique.difficulty}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {technique.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Martini History */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Historia del Martini
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              La evolución del cóctel más elegante del mundo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {martiniHistory.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <event.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {event.year}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {event.event}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {event.description}
                    </p>
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
