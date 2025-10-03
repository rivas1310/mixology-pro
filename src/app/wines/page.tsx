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
  Star as StarIcon,
  Grape
} from 'lucide-react'

const wineCategories = [
  {
    id: 'red-wines',
    name: 'Vinos Tintos',
    icon: WineIcon,
    color: 'from-red-600 to-red-800',
    bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
    description: 'Vinos robustos, complejos y con cuerpo',
    count: 35,
    difficulty: 'Intermedio',
    time: '16-18°C',
    subcategories: ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Malbec'],
    examples: ['Château Margaux', 'Caymus Cabernet', 'Domaine de la Romanée-Conti', 'Catena Malbec']
  },
  {
    id: 'white-wines',
    name: 'Vinos Blancos',
    icon: DropletsIcon,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Vinos frescos, ligeros y aromáticos',
    count: 30,
    difficulty: 'Fácil',
    time: '8-12°C',
    subcategories: ['Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Pinot Grigio'],
    examples: ['Domaine Leflaive', 'Cloudy Bay', 'Dr. Loosen', 'Santa Margherita']
  },
  {
    id: 'rose-wines',
    name: 'Vinos Rosados',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    description: 'Vinos elegantes, versátiles y refrescantes',
    count: 15,
    difficulty: 'Fácil',
    time: '10-14°C',
    subcategories: ['Provence Rosé', 'Pinot Noir Rosé', 'Grenache Rosé', 'Sangiovese Rosé'],
    examples: ['Château d\'Esclans', 'Whispering Angel', 'Domaines Ott', 'Antinori']
  },
  {
    id: 'sparkling-wines',
    name: 'Vinos Espumosos',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    description: 'Vinos con burbujas, festivos y elegantes',
    count: 20,
    difficulty: 'Intermedio',
    time: '6-8°C',
    subcategories: ['Champagne', 'Prosecco', 'Cava', 'Cremant'],
    examples: ['Dom Pérignon', 'Krug', 'Veuve Clicquot', 'Freixenet']
  }
]

const featuredWines = [
  {
    id: 'champagne-dom-perignon',
    name: 'Dom Pérignon',
    category: 'Espumosos',
    type: 'Champagne',
    difficulty: 'Experto',
    time: '6-8°C',
    abv: 12.5,
    description: 'El champagne más prestigioso del mundo',
    image: '/images/wines/dom-perignon.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Chardonnay', amount: '50%', type: 'Uva' },
      { name: 'Pinot Noir', amount: '50%', type: 'Uva' },
      { name: 'Levadura', amount: '0.1%', type: 'Fermentación' },
      { name: 'Azúcar', amount: '0.3%', type: 'Dosage' }
    ],
    instructions: [
      'Enfriar a 6-8°C',
      'Abrir con cuidado',
      'Verter en copa flute',
      'Servir inmediatamente',
      'Disfrutar el bouquet'
    ],
    garnish: 'Sin decoración',
    glass: 'Copa Flute',
    technique: 'Doble Fermentación',
    history: 'Creado en 1921. El champagne más prestigioso de Moët & Chandon.',
    rating: 4.9,
    reviews: 2840,
    tips: [
      'Temperatura correcta',
      'Abrir con cuidado',
      'Copa adecuada',
      'Servir fresco'
    ]
  },
  {
    id: 'cabernet-sauvignon-napa',
    name: 'Caymus Cabernet Sauvignon',
    category: 'Tintos',
    type: 'Tinto',
    difficulty: 'Intermedio',
    time: '16-18°C',
    abv: 14.5,
    description: 'Cabernet Sauvignon de Napa Valley, robusto y elegante',
    image: '/images/wines/caymus-cabernet.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Cabernet Sauvignon', amount: '85%', type: 'Uva' },
      { name: 'Merlot', amount: '10%', type: 'Uva' },
      { name: 'Cabernet Franc', amount: '5%', type: 'Uva' },
      { name: 'Roble Francés', amount: '18 meses', type: 'Barrica' }
    ],
    instructions: [
      'Decantar 1 hora antes',
      'Servir a 16-18°C',
      'Usar copa Bordeaux',
      'Oxigenar suavemente',
      'Disfrutar con comida'
    ],
    garnish: 'Sin decoración',
    glass: 'Copa Bordeaux',
    technique: 'Decantación',
    history: 'Creado en 1972. Uno de los Cabernet más famosos de Napa Valley.',
    rating: 4.7,
    reviews: 1920,
    tips: [
      'Decantar correctamente',
      'Temperatura ideal',
      'Copa adecuada',
      'Maridaje perfecto'
    ]
  },
  {
    id: 'chardonnay-burgundy',
    name: 'Chardonnay de Burgundy',
    category: 'Blancos',
    type: 'Blanco',
    difficulty: 'Intermedio',
    time: '10-12°C',
    abv: 13.0,
    description: 'Chardonnay clásico de la región de Burgundy',
    image: '/images/wines/burgundy-chardonnay.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Chardonnay', amount: '100%', type: 'Uva' },
      { name: 'Roble Francés', amount: '12 meses', type: 'Barrica' },
      { name: 'Levadura', amount: '0.1%', type: 'Fermentación' },
      { name: 'Sulfitos', amount: 'Mínimo', type: 'Conservante' }
    ],
    instructions: [
      'Enfriar a 10-12°C',
      'Abrir 30 min antes',
      'Usar copa Chardonnay',
      'Servir suavemente',
      'Disfrutar el aroma'
    ],
    garnish: 'Sin decoración',
    glass: 'Copa Chardonnay',
    technique: 'Fermentación en Barrica',
    history: 'Tradición centenaria de Burgundy. El Chardonnay más elegante.',
    rating: 4.6,
    reviews: 1560,
    tips: [
      'Temperatura correcta',
      'Oxigenación previa',
      'Copa adecuada',
      'Maridaje delicado'
    ]
  },
  {
    id: 'prosecco-italy',
    name: 'Prosecco Superiore',
    category: 'Espumosos',
    type: 'Espumoso',
    difficulty: 'Fácil',
    time: '6-8°C',
    abv: 11.5,
    description: 'Prosecco italiano fresco y festivo',
    image: '/images/wines/prosecco-superiore.jpg',
    isClassic: false,
    ingredients: [
      { name: 'Glera', amount: '100%', type: 'Uva' },
      { name: 'Levadura', amount: '0.1%', type: 'Fermentación' },
      { name: 'Azúcar', amount: '0.5%', type: 'Dosage' },
      { name: 'Dióxido de Carbono', amount: 'Natural', type: 'Gas' }
    ],
    instructions: [
      'Enfriar a 6-8°C',
      'Abrir con cuidado',
      'Verter en copa flute',
      'Servir inmediatamente',
      'Disfrutar las burbujas'
    ],
    garnish: 'Sin decoración',
    glass: 'Copa Flute',
    technique: 'Método Charmat',
    history: 'Tradición italiana. El espumoso más popular del mundo.',
    rating: 4.4,
    reviews: 3240,
    tips: [
      'Temperatura fría',
      'Abrir cuidadosamente',
      'Copa flute',
      'Servir fresco'
    ]
  }
]

const difficultyLevels = [
  {
    level: 'Fácil',
    color: 'from-green-500 to-emerald-500',
    description: 'Vinos simples y accesibles',
    time: '8-12°C',
    icon: BookOpenIcon,
    examples: ['Prosecco', 'Pinot Grigio', 'Rosé']
  },
  {
    level: 'Intermedio',
    color: 'from-yellow-500 to-orange-500',
    description: 'Vinos con carácter y complejidad',
    time: '12-16°C',
    icon: Target,
    examples: ['Chardonnay', 'Merlot', 'Cava']
  },
  {
    level: 'Avanzado',
    color: 'from-orange-500 to-red-500',
    description: 'Vinos complejos y robustos',
    time: '16-18°C',
    icon: AwardIcon,
    examples: ['Cabernet Sauvignon', 'Barolo', 'Burgundy']
  },
  {
    level: 'Experto',
    color: 'from-red-500 to-purple-500',
    description: 'Vinos de colección y prestigio',
    time: '18-20°C',
    icon: StarIcon,
    examples: ['Champagne', 'Bordeaux', 'Tuscany']
  }
]

const popularWineTypes = [
  { name: 'Tinto', count: 45, icon: WineIcon, color: 'from-red-600 to-red-800' },
  { name: 'Blanco', count: 38, icon: DropletsIcon, color: 'from-yellow-400 to-amber-500' },
  { name: 'Rosado', count: 25, icon: Heart, color: 'from-pink-400 to-rose-500' },
  { name: 'Espumoso', count: 30, icon: Sparkles, color: 'from-purple-500 to-indigo-600' },
  { name: 'Dulce', count: 15, icon: StarIcon, color: 'from-amber-500 to-yellow-600' },
  { name: 'Fortificado', count: 12, icon: AwardIcon, color: 'from-brown-600 to-amber-800' }
]

export default function WinesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedWine, setExpandedWine] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredWines = featuredWines.filter(wine => {
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || wine.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || wine.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Vinos <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">del Mundo</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Descubre los mejores vinos de las regiones más prestigiosas del mundo
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar vinos, regiones, bodegas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">
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
              Categorías de Vino
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explora los diferentes tipos y estilos de vino
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wineCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <a
                  href={`/wines/${category.id}`}
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
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
                          vinos
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
                        Ver vinos
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
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

      {/* Featured Wines */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vinos Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los vinos más prestigiosos y mejor valorados
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                }`}
              >
                Todos
              </button>
              {wineCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
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
                Todos
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

          {/* Wines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredWines.map((wine, index) => (
              <motion.div
                key={wine.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <a href={`/wines/${wine.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-purple-100 dark:from-red-900/30 dark:to-purple-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <WineIcon className="h-16 w-16 text-red-600 dark:text-red-400" />
                    </div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        {wine.type}
                      </span>
                    </div>

                    {/* ABV Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {wine.abv}% ABV
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
                    <a href={`/wines/${wine.id}`} className="block">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {wine.name}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {wine.category}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {wine.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {wine.rating} ({wine.reviews} reviews)
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {wine.description}
                    </p>
                    </a>

                    {/* Ingredients Preview */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ingredientes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {wine.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded"
                          >
                            {ingredient.name}
                          </span>
                        ))}
                        {wine.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{wine.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedWine === wine.id && (
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
                            {wine.ingredients.map((ingredient, idx) => (
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
                            {wine.instructions.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-red-600 dark:text-red-400 font-bold">{idx + 1}.</span>
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
                              {wine.glass}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Técnica:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {wine.technique}
                            </p>
                          </div>
                        </div>

                        {/* History */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Historia:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {wine.history}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <a
                        href={`/wines/${wine.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
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
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              Desde vinos simples hasta creaciones de prestigio
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

      {/* Popular Wine Types */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tipos Populares
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los tipos de vino más populares y demandados
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularWineTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group-hover:scale-105">
                  <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {type.name}
                  </h3>
                  
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    {type.count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    vinos
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
