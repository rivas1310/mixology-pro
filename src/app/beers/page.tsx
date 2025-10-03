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

const beerCategories = [
  {
    id: 'lagers',
    name: 'Lagers',
    icon: WineIcon,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    description: 'Cervezas doradas, refrescantes y fáciles de beber',
    count: 25,
    difficulty: 'Fácil',
    time: '2-4°C',
    subcategories: ['Pilsner', 'Helles', 'Dunkel', 'Bock'],
    examples: ['Corona Extra', 'Heineken', 'Stella Artois', 'Budweiser']
  },
  {
    id: 'ales',
    name: 'Ales',
    icon: StarIcon,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Cervezas con más cuerpo y sabor, fermentación alta',
    count: 30,
    difficulty: 'Intermedio',
    time: '4-7°C',
    subcategories: ['IPA', 'Pale Ale', 'Stout', 'Porter'],
    examples: ['Guinness', 'Sierra Nevada', 'Samuel Adams', 'Newcastle']
  },
  {
    id: 'wheat',
    name: 'Trigo',
    icon: DropletsIcon,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Cervezas de trigo, suaves y refrescantes',
    count: 15,
    difficulty: 'Fácil',
    time: '3-5°C',
    subcategories: ['Hefeweizen', 'Witbier', 'Weissbier', 'American Wheat'],
    examples: ['Blue Moon', 'Hoegaarden', 'Weihenstephaner', 'Schneider']
  },
  {
    id: 'specialty',
    name: 'Especiales',
    icon: AwardIcon,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Cervezas artesanales y de temporada',
    count: 20,
    difficulty: 'Avanzado',
    time: '6-8°C',
    subcategories: ['Sour', 'Barrel Aged', 'Imperial', 'Fruit Beer'],
    examples: ['Lambic', 'Barrel Aged Stout', 'Imperial IPA', 'Framboise']
  }
]

const featuredBeers = [
  {
    id: 'corona-extra',
    name: 'Corona Extra',
    category: 'Lagers',
    type: 'Lager',
    difficulty: 'Fácil',
    time: '2-4°C',
    abv: 4.5,
    description: 'La cerveza mexicana más popular del mundo',
    image: '/images/beers/corona-extra.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Malta', amount: '85%', type: 'Grain' },
      { name: 'Lúpulo', amount: '15%', type: 'Hop' },
      { name: 'Agua', amount: '95%', type: 'Water' },
      { name: 'Levadura', amount: '0.1%', type: 'Yeast' }
    ],
    instructions: [
      'Servir muy fría (2-4°C)',
      'Usar vaso alto y delgado',
      'Añadir rodaja de lima',
      'Servir con espuma moderada',
      'Beber inmediatamente'
    ],
    garnish: 'Rodaja de lima',
    glass: 'Vaso alto',
    technique: 'Directo',
    history: 'Creada en 1925 en México. La cerveza más exportada de México.',
    rating: 4.2,
    reviews: 15420,
    tips: [
      'Servir muy fría',
      'Añadir lima fresca',
      'Usar vaso alto',
      'Beber rápido'
    ]
  },
  {
    id: 'guinness',
    name: 'Guinness Draught',
    category: 'Ales',
    type: 'Stout',
    difficulty: 'Intermedio',
    time: '6-8°C',
    abv: 4.2,
    description: 'La stout irlandesa más famosa del mundo',
    image: '/images/beers/guinness.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Malta Tostada', amount: '70%', type: 'Grain' },
      { name: 'Cebada', amount: '25%', type: 'Grain' },
      { name: 'Lúpulo', amount: '5%', type: 'Hop' },
      { name: 'Agua', amount: '95%', type: 'Water' }
    ],
    instructions: [
      'Enfriar vaso a 6-8°C',
      'Inclinar vaso 45 grados',
      'Verter lentamente hasta 3/4',
      'Esperar 2 minutos para asentarse',
      'Completar vertido vertical'
    ],
    garnish: 'Sin decoración',
    glass: 'Copa Guinness',
    technique: 'Two-Part Pour',
    history: 'Creada en 1759 en Dublín. La stout más famosa del mundo.',
    rating: 4.6,
    reviews: 8920,
    tips: [
      'Temperatura correcta',
      'Técnica de vertido',
      'Paciencia en el asentamiento',
      'Servir en copa especial'
    ]
  },
  {
    id: 'heineken',
    name: 'Heineken',
    category: 'Lagers',
    type: 'Lager',
    difficulty: 'Fácil',
    time: '2-4°C',
    abv: 5.0,
    description: 'Cerveza holandesa premium, suave y refrescante',
    image: '/images/beers/heineken.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Malta Pilsner', amount: '90%', type: 'Grain' },
      { name: 'Lúpulo Saaz', amount: '10%', type: 'Hop' },
      { name: 'Agua', amount: '95%', type: 'Water' },
      { name: 'Levadura', amount: '0.1%', type: 'Yeast' }
    ],
    instructions: [
      'Servir muy fría (2-4°C)',
      'Usar vaso alto',
      'Verter con ángulo',
      'Crear espuma moderada',
      'Servir inmediatamente'
    ],
    garnish: 'Sin decoración',
    glass: 'Vaso alto',
    technique: 'Directo',
    history: 'Creada en 1873 en Holanda. Una de las cervezas más vendidas del mundo.',
    rating: 4.1,
    reviews: 12350,
    tips: [
      'Temperatura muy fría',
      'Vaso alto y delgado',
      'Espuma moderada',
      'Beber fresco'
    ]
  },
  {
    id: 'stella-artois',
    name: 'Stella Artois',
    category: 'Lagers',
    type: 'Lager',
    difficulty: 'Fácil',
    time: '3-5°C',
    abv: 5.0,
    description: 'Cerveza belga premium, elegante y refinada',
    image: '/images/beers/stella-artois.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Malta Pilsner', amount: '88%', type: 'Grain' },
      { name: 'Lúpulo Saaz', amount: '12%', type: 'Hop' },
      { name: 'Agua', amount: '95%', type: 'Water' },
      { name: 'Levadura', amount: '0.1%', type: 'Yeast' }
    ],
    instructions: [
      'Servir fría (3-5°C)',
      'Usar copa Stella Artois',
      'Verter con técnica',
      'Crear espuma perfecta',
      'Servir con elegancia'
    ],
    garnish: 'Sin decoración',
    glass: 'Copa Stella Artois',
    technique: '9-Step Pouring',
    history: 'Creada en 1926 en Bélgica. La cerveza premium belga más famosa.',
    rating: 4.3,
    reviews: 9870,
    tips: [
      'Temperatura correcta',
      'Copa especial',
      'Técnica de vertido',
      'Espuma perfecta'
    ]
  }
]

const difficultyLevels = [
  {
    level: 'Fácil',
    color: 'from-green-500 to-emerald-500',
    description: 'Cervezas simples y refrescantes',
    time: '2-4°C',
    icon: BookOpenIcon,
    examples: ['Lager', 'Pilsner', 'Wheat Beer']
  },
  {
    level: 'Intermedio',
    color: 'from-yellow-500 to-orange-500',
    description: 'Cervezas con más carácter',
    time: '4-7°C',
    icon: Target,
    examples: ['IPA', 'Pale Ale', 'Amber Ale']
  },
  {
    level: 'Avanzado',
    color: 'from-orange-500 to-red-500',
    description: 'Cervezas complejas y robustas',
    time: '6-8°C',
    icon: AwardIcon,
    examples: ['Stout', 'Porter', 'Barley Wine']
  },
  {
    level: 'Experto',
    color: 'from-red-500 to-purple-500',
    description: 'Cervezas especiales y limitadas',
    time: '8-12°C',
    icon: StarIcon,
    examples: ['Sour', 'Barrel Aged', 'Imperial']
  }
]

const popularBeerStyles = [
  { name: 'Lager', count: 45, icon: WineIcon, color: 'from-amber-500 to-yellow-500' },
  { name: 'IPA', count: 38, icon: ZapIcon, color: 'from-orange-500 to-red-500' },
  { name: 'Stout', count: 25, icon: AwardIcon, color: 'from-gray-600 to-black' },
  { name: 'Wheat', count: 20, icon: DropletsIcon, color: 'from-yellow-400 to-orange-500' },
  { name: 'Pilsner', count: 35, icon: StarIcon, color: 'from-amber-400 to-yellow-600' },
  { name: 'Porter', count: 15, icon: Flame, color: 'from-gray-700 to-gray-900' }
]

export default function BeersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedBeer, setExpandedBeer] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredBeers = featuredBeers.filter(beer => {
    const matchesSearch = beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || beer.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || beer.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Cervezas <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">del Mundo</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Descubre las mejores cervezas artesanales y comerciales del mundo
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cervezas, estilos, marcas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors">
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
              Categorías de Cerveza
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explora los diferentes estilos y categorías de cerveza
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beerCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <a
                  href={`/beers/${category.id}`}
                  className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer block`}
                >
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
                          cervezas
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {category.time}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          temperatura
                        </div>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.difficulty === 'Fácil' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
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
                        Ver cervezas
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Beers */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cervezas Destacadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las cervezas más populares y mejor valoradas
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                }`}
              >
                Todos
              </button>
              {beerCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'
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
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                }`}
              >
                Todos
              </button>
              {difficultyLevels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => setSelectedDifficulty(level.level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedDifficulty === level.level
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
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

          {/* Beers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBeers.map((beer, index) => (
              <motion.div
                key={beer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <a href={`/beers/${beer.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <WineIcon className="h-16 w-16 text-amber-600 dark:text-amber-400" />
                    </div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                        {beer.type}
                      </span>
                    </div>

                    {/* ABV Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {beer.abv}% ABV
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  </a>

                  {/* Content */}
                  <div className="p-6">
                    <a href={`/beers/${beer.id}`} className="block">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {beer.name}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {beer.category}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {beer.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {beer.rating} ({beer.reviews} reviews)
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {beer.description}
                    </p>
                    </a>

                    {/* Ingredients Preview */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ingredientes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {beer.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded"
                          >
                            {ingredient.name}
                          </span>
                        ))}
                        {beer.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{beer.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedBeer === beer.id && (
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
                            {beer.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="flex items-center justify-between">
                                <span>{ingredient.name}</span>
                                <span className="text-gray-500">{ingredient.amount}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Instructions */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Cómo Servir:
                          </p>
                          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {beer.instructions.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 font-bold">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Vaso:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {beer.glass}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Técnica:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {beer.technique}
                            </p>
                          </div>
                        </div>

                        {/* History */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Historia:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {beer.history}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <a
                        href={`/beers/${beer.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        Ver Detalles
                      </a>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
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
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Niveles de Complejidad
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Desde cervezas simples hasta creaciones especiales
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
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <Clock className="h-4 w-4" />
                      {level.time}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ejemplos:
                      </p>
                      <div className="space-y-1">
                        {level.examples.map((example, idx) => (
                          <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">{example}</p>
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

      {/* Popular Beer Styles */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Estilos Populares
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los estilos de cerveza más populares y demandados
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularBeerStyles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group-hover:scale-105">
                  <div className={`w-12 h-12 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <style.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {style.name}
                  </h3>
                  
                  <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {style.count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    cervezas
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
