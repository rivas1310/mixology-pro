'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
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

const cocktailCategories = [
  {
    id: 'soft',
    name: 'Soft Drinks',
    icon: DropletsIcon,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Cócteles sin alcohol, refrescantes y saludables',
    count: 25,
    difficulty: 'Fácil',
    time: '3-5 min',
    subcategories: ['Mocktails', 'Smoothies', 'Jugos', 'Tés'],
    examples: ['Virgin Mojito', 'Shirley Temple', 'Piña Colada Sin Alcohol', 'Limonada de Fresa']
  },
  {
    id: 'hard',
    name: 'Hard Drinks',
    icon: WineIcon,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Cócteles con alcohol, clásicos y modernos',
    count: 50,
    difficulty: 'Intermedio',
    time: '5-10 min',
    subcategories: ['Clásicos', 'Modernos', 'Tropicales', 'De Temporada'],
    examples: ['Old Fashioned', 'Whiskey Sour', 'Mai Tai', 'Cosmopolitan']
  },
  {
    id: 'martinis',
    name: 'Martinis',
    icon: StarIcon,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Cócteles elegantes y sofisticados',
    count: 30,
    difficulty: 'Intermedio',
    time: '4-8 min',
    subcategories: ['Dry Martini', 'Wet Martini', 'Dirty Martini', 'Vodka Martini'],
    examples: ['Dry Martini', 'Dirty Martini', 'Vesper', 'Gibson']
  },
  {
    id: 'tropical',
    name: 'Tropicales',
    icon: Flame,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Cócteles exóticos y refrescantes',
    count: 35,
    difficulty: 'Fácil',
    time: '4-7 min',
    subcategories: ['Tiki', 'Caribeños', 'Hawaianos', 'Tropicales'],
    examples: ['Piña Colada', 'Mai Tai', 'Blue Hawaiian', 'Zombie']
  },
  {
    id: 'sours',
    name: 'Sours',
    icon: ZapIcon,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Cócteles ácidos y equilibrados',
    count: 20,
    difficulty: 'Intermedio',
    time: '5-8 min',
    subcategories: ['Whiskey Sour', 'Gin Sour', 'Pisco Sour', 'Amaretto Sour'],
    examples: ['Whiskey Sour', 'Pisco Sour', 'Amaretto Sour', 'Lemon Drop']
  },
  {
    id: 'highballs',
    name: 'Highballs',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Cócteles largos y refrescantes',
    count: 25,
    difficulty: 'Fácil',
    time: '2-4 min',
    subcategories: ['Gin Tonic', 'Cuba Libre', 'Moscow Mule', 'Dark & Stormy'],
    examples: ['Gin Tonic', 'Cuba Libre', 'Moscow Mule', 'Dark & Stormy']
  },
  {
    id: 'shots',
    name: 'Shots',
    icon: Target,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Bebidas cortas y potentes',
    count: 40,
    difficulty: 'Fácil',
    time: '1-3 min',
    subcategories: ['Tequila Shots', 'Vodka Shots', 'Whiskey Shots', 'Layered Shots'],
    examples: ['Tequila Shot', 'Kamikaze', 'B-52', 'Jägerbomb']
  },
  {
    id: 'dessert',
    name: 'Dessert Cocktails',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Cócteles dulces y cremosos',
    count: 15,
    difficulty: 'Intermedio',
    time: '5-10 min',
    subcategories: ['Creamy', 'Chocolate', 'Fruit', 'Coffee'],
    examples: ['White Russian', 'Grasshopper', 'Chocolate Martini', 'Irish Coffee']
  }
]

const featuredCocktails = [
  {
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
    reviews: 2156
  },
  {
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
    garnish: 'Aceituna',
    glass: 'Copa Martini',
    technique: 'Stir',
    history: 'Creado en 1860. El cóctel más elegante del mundo.',
    rating: 4.8,
    reviews: 1892
  },
  {
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
    reviews: 3245
  },
  {
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
    reviews: 1876
  }
]

const difficultyLevels = [
  {
    level: 'Fácil',
    color: 'from-green-500 to-emerald-500',
    description: 'Cócteles simples y rápidos',
    time: '2-5 min',
    icon: BookOpenIcon,
    examples: ['Gin Tonic', 'Cuba Libre', 'Mojito']
  },
  {
    level: 'Intermedio',
    color: 'from-yellow-500 to-orange-500',
    description: 'Cócteles que requieren técnica',
    time: '5-10 min',
    icon: Target,
    examples: ['Old Fashioned', 'Martini', 'Whiskey Sour']
  },
  {
    level: 'Avanzado',
    color: 'from-orange-500 to-red-500',
    description: 'Cócteles complejos y elaborados',
    time: '10-15 min',
    icon: AwardIcon,
    examples: ['Ramos Gin Fizz', 'Clover Club', 'Aviation']
  },
  {
    level: 'Experto',
    color: 'from-red-500 to-purple-500',
    description: 'Cócteles de alta complejidad',
    time: '15+ min',
    icon: StarIcon,
    examples: ['Zombie', 'Navy Grog', 'Fog Cutter']
  }
]

const popularIngredients = [
  { name: 'Gin', count: 45, icon: WineIcon, color: 'from-blue-500 to-cyan-500' },
  { name: 'Vodka', count: 38, icon: DropletsIcon, color: 'from-gray-500 to-slate-500' },
  { name: 'Ron', count: 42, icon: Flame, color: 'from-yellow-500 to-orange-500' },
  { name: 'Tequila', count: 35, icon: ZapIcon, color: 'from-green-500 to-emerald-500' },
  { name: 'Whiskey', count: 40, icon: StarIcon, color: 'from-amber-500 to-yellow-500' },
  { name: 'Limón', count: 60, icon: Heart, color: 'from-yellow-400 to-yellow-600' }
]

export default function CocktailsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedCocktail, setExpandedCocktail] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredCocktails = featuredCocktails.filter(cocktail => {
    const matchesSearch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cocktail.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cocktail.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cocktail.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || cocktail.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Cócteles <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Profesionales</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              La colección más completa de cócteles organizados por categorías: Soft, Hard, Martinis, Tropicales y más
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cócteles, ingredientes, técnicas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors">
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
              Categorías de Cócteles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Organiza los cócteles por tipo y dificultad para una mejor experiencia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cocktailCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <a 
                  href={`/cocktails/${category.id}`}
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
                          cócteles
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
                        Ver cócteles
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
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

      {/* Featured Cocktails */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cócteles Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los cócteles más populares y mejor valorados por la comunidad
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
              >
                Todos
              </button>
              {cocktailCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
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
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
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
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
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

          {/* Cocktails Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCocktails.map((cocktail, index) => (
              <motion.div
                key={cocktail.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <a href={`/cocktails/${cocktail.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <WineIcon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                    </div>
                    
                    {/* Classic Badge */}
                    {cocktail.isClassic && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Clásico
                        </span>
                      </div>
                    )}

                    {/* ABV Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {cocktail.abv}% ABV
                      </span>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        cocktail.difficulty === 'Fácil' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                        cocktail.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                        cocktail.difficulty === 'Avanzado' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' :
                        'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}>
                        {cocktail.difficulty}
                      </span>
                    </div>

                  </div>
                  </a>

                  {/* Content */}
                  <div className="p-6">
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="absolute top-52 right-6 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300 z-10"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    
                    <a href={`/cocktails/${cocktail.id}`} className="block">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {cocktail.name}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {cocktail.category}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {cocktail.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {cocktail.rating} ({cocktail.reviews} reviews)
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {cocktail.description}
                    </p>
                    </a>

                    {/* Info Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setExpandedCocktail(expandedCocktail === cocktail.id ? null : cocktail.id)
                      }}
                      className="absolute top-6 right-6 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full transition-colors z-10"
                    >
                      <Info className="h-4 w-4" />
                    </button>

                    {/* Ingredients Preview */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ingredientes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cocktail.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                          >
                            {ingredient.name}
                          </span>
                        ))}
                        {cocktail.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{cocktail.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedCocktail === cocktail.id && (
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
                            {cocktail.ingredients.map((ingredient, idx) => (
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
                            Preparación:
                          </p>
                          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {cocktail.instructions.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 font-bold">{idx + 1}.</span>
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
                              {cocktail.glass}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Técnica:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {cocktail.technique}
                            </p>
                          </div>
                        </div>

                        {/* History */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Historia:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cocktail.history}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <a
                        href={`/cocktails/${cocktail.id}`}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        Ver Receta
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
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              Desde cócteles simples hasta creaciones de alta complejidad
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
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Timer className="h-4 w-4" />
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

      {/* Popular Ingredients */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ingredientes Populares
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los ingredientes más utilizados en la mixología profesional
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularIngredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group-hover:scale-105">
                  <div className={`w-12 h-12 bg-gradient-to-br ${ingredient.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <ingredient.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {ingredient.name}
                  </h3>
                  
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {ingredient.count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    cócteles
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
