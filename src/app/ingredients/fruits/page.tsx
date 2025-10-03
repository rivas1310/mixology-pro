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
  ChevronRight,
  Heart,
  Leaf,
  Apple,
  Sparkles,
  ArrowLeft,
  Plus,
  Minus,
  X,
  Check,
  Info,
  Lightbulb,
  Calendar,
  MapPin,
  Globe,
  Target,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

// Subcategorías de frutas
const fruitSubcategories = [
  {
    id: 'citrus',
    name: 'Cítricos',
    icon: Droplets,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Frutas ácidas y refrescantes',
    count: 8,
    fruits: [
      { name: 'Limón', season: 'Todo el año', uses: ['Margarita', 'Lemon Drop', 'Whiskey Sour'], acidity: 'Alta' },
      { name: 'Lima', season: 'Todo el año', uses: ['Mojito', 'Daiquiri', 'Caipirinha'], acidity: 'Alta' },
      { name: 'Naranja', season: 'Invierno', uses: ['Mimosa', 'Screwdriver', 'Orange Blossom'], acidity: 'Media' },
      { name: 'Pomelo', season: 'Invierno', uses: ['Grapefruit Martini', 'Paloma'], acidity: 'Media' },
      { name: 'Mandarina', season: 'Invierno', uses: ['Mandarin Martini', 'Tangerine Sour'], acidity: 'Media' },
      { name: 'Bergamota', season: 'Otoño', uses: ['Earl Grey Martini', 'Bergamot Sour'], acidity: 'Alta' },
      { name: 'Kumquat', season: 'Invierno', uses: ['Kumquat Margarita', 'Kumquat Sour'], acidity: 'Alta' },
      { name: 'Yuzu', season: 'Otoño', uses: ['Yuzu Martini', 'Yuzu Sour'], acidity: 'Muy Alta' }
    ]
  },
  {
    id: 'tropical',
    name: 'Tropicales',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Frutas exóticas y dulces',
    count: 12,
    fruits: [
      { name: 'Piña', season: 'Verano', uses: ['Piña Colada', 'Mai Tai', 'Zombie'], acidity: 'Media' },
      { name: 'Mango', season: 'Verano', uses: ['Mango Margarita', 'Tropical Punch'], acidity: 'Baja' },
      { name: 'Papaya', season: 'Verano', uses: ['Papaya Daiquiri', 'Tropical Smoothie'], acidity: 'Baja' },
      { name: 'Coco', season: 'Todo el año', uses: ['Piña Colada', 'Coco Loco'], acidity: 'Neutra' },
      { name: 'Maracuyá', season: 'Verano', uses: ['Passion Fruit Martini', 'Passion Fruit Daiquiri'], acidity: 'Alta' },
      { name: 'Guayaba', season: 'Verano', uses: ['Guava Margarita', 'Tropical Punch'], acidity: 'Media' },
      { name: 'Lichi', season: 'Verano', uses: ['Lychee Martini', 'Lychee Bellini'], acidity: 'Baja' },
      { name: 'Rambután', season: 'Verano', uses: ['Tropical Punch', 'Exotic Martini'], acidity: 'Baja' },
      { name: 'Dragon Fruit', season: 'Verano', uses: ['Dragon Fruit Margarita', 'Tropical Smoothie'], acidity: 'Baja' },
      { name: 'Carambola', season: 'Verano', uses: ['Star Fruit Martini', 'Tropical Punch'], acidity: 'Media' },
      { name: 'Tamarindo', season: 'Verano', uses: ['Tamarind Margarita', 'Tropical Punch'], acidity: 'Alta' },
      { name: 'Jaca', season: 'Verano', uses: ['Jackfruit Smoothie', 'Tropical Punch'], acidity: 'Baja' }
    ]
  },
  {
    id: 'berries',
    name: 'Bayas',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Frutas pequeñas y antioxidantes',
    count: 10,
    fruits: [
      { name: 'Fresa', season: 'Primavera', uses: ['Strawberry Daiquiri', 'Strawberry Margarita'], acidity: 'Media' },
      { name: 'Arándano', season: 'Verano', uses: ['Blueberry Martini', 'Blueberry Daiquiri'], acidity: 'Media' },
      { name: 'Frambuesa', season: 'Verano', uses: ['Raspberry Martini', 'Raspberry Daiquiri'], acidity: 'Media' },
      { name: 'Mora', season: 'Verano', uses: ['Blackberry Martini', 'Blackberry Daiquiri'], acidity: 'Media' },
      { name: 'Grosella', season: 'Verano', uses: ['Currant Martini', 'Tropical Punch'], acidity: 'Alta' },
      { name: 'Zarzamora', season: 'Verano', uses: ['Blackberry Martini', 'Berry Punch'], acidity: 'Media' },
      { name: 'Açaí', season: 'Verano', uses: ['Açaí Smoothie', 'Tropical Punch'], acidity: 'Baja' },
      { name: 'Goji', season: 'Verano', uses: ['Goji Martini', 'Superfood Smoothie'], acidity: 'Baja' },
      { name: 'Cranberry', season: 'Otoño', uses: ['Cosmopolitan', 'Cranberry Martini'], acidity: 'Alta' },
      { name: 'Elderberry', season: 'Verano', uses: ['Elderflower Martini', 'Berry Punch'], acidity: 'Media' }
    ]
  },
  {
    id: 'stone',
    name: 'Hueso',
    icon: Heart,
    color: 'from-orange-400 to-red-500',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Frutas con hueso central',
    count: 6,
    fruits: [
      { name: 'Durazno', season: 'Verano', uses: ['Peach Bellini', 'Peach Margarita'], acidity: 'Baja' },
      { name: 'Ciruela', season: 'Verano', uses: ['Plum Martini', 'Plum Daiquiri'], acidity: 'Media' },
      { name: 'Cereza', season: 'Verano', uses: ['Cherry Martini', 'Cherry Daiquiri'], acidity: 'Media' },
      { name: 'Albaricoque', season: 'Verano', uses: ['Apricot Martini', 'Apricot Daiquiri'], acidity: 'Media' },
      { name: 'Nectarina', season: 'Verano', uses: ['Nectarine Martini', 'Nectarine Daiquiri'], acidity: 'Media' },
      { name: 'Mango', season: 'Verano', uses: ['Mango Margarita', 'Tropical Punch'], acidity: 'Baja' }
    ]
  },
  {
    id: 'pome',
    name: 'Pomáceas',
    icon: Apple,
    color: 'from-red-500 to-red-700',
    bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
    description: 'Frutas con semillas centrales',
    count: 4,
    fruits: [
      { name: 'Manzana', season: 'Otoño', uses: ['Apple Martini', 'Hot Toddy'], acidity: 'Baja' },
      { name: 'Pera', season: 'Otoño', uses: ['Pear Martini', 'Pear Daiquiri'], acidity: 'Baja' },
      { name: 'Nashi', season: 'Otoño', uses: ['Asian Pear Martini', 'Pear Daiquiri'], acidity: 'Baja' },
      { name: 'Membrillo', season: 'Otoño', uses: ['Quince Martini', 'Quince Daiquiri'], acidity: 'Media' }
    ]
  },
  {
    id: 'melons',
    name: 'Melones',
    icon: Apple,
    color: 'from-green-400 to-green-600',
    bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    description: 'Frutas refrescantes y acuosas',
    count: 5,
    fruits: [
      { name: 'Sandía', season: 'Verano', uses: ['Watermelon Martini', 'Watermelon Daiquiri'], acidity: 'Baja' },
      { name: 'Melón', season: 'Verano', uses: ['Melon Martini', 'Melon Daiquiri'], acidity: 'Baja' },
      { name: 'Honeydew', season: 'Verano', uses: ['Honeydew Martini', 'Melon Daiquiri'], acidity: 'Baja' },
      { name: 'Cantaloupe', season: 'Verano', uses: ['Cantaloupe Martini', 'Melon Daiquiri'], acidity: 'Baja' },
      { name: 'Charentais', season: 'Verano', uses: ['Charentais Martini', 'Melon Daiquiri'], acidity: 'Baja' }
    ]
  }
]

// Temporadas
const seasons = [
  { name: 'Primavera', months: 'Mar-May', color: 'from-green-400 to-emerald-500', fruits: ['Fresa', 'Cereza', 'Naranja', 'Limón', 'Lima'] },
  { name: 'Verano', months: 'Jun-Ago', color: 'from-yellow-400 to-orange-500', fruits: ['Piña', 'Mango', 'Melón', 'Sandía', 'Durazno'] },
  { name: 'Otoño', months: 'Sep-Nov', color: 'from-red-500 to-orange-600', fruits: ['Manzana', 'Pera', 'Uva', 'Higo', 'Granada'] },
  { name: 'Invierno', months: 'Dic-Feb', color: 'from-blue-400 to-purple-500', fruits: ['Naranja', 'Mandarina', 'Kiwi', 'Granada', 'Coco'] }
]

export default function FruitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [selectedSeason, setSelectedSeason] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedFruit, setExpandedFruit] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Obtener todas las frutas de todas las subcategorías
  const allFruits = fruitSubcategories.reduce((acc: any[], subcategory: any) => {
    const fruitsWithSubcategory = subcategory.fruits.map((fruit: any) => ({
      ...fruit,
      subcategory: subcategory.name,
      subcategoryId: subcategory.id,
      subcategoryColor: subcategory.color
    }))
    return [...acc, ...fruitsWithSubcategory]
  }, [])

  // Filtrar frutas
  const filteredFruits = allFruits.filter((fruit: any) => {
    const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fruit.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fruit.uses.some((use: string) => use.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubcategory = selectedSubcategory === 'all' || fruit.subcategoryId === selectedSubcategory
    const matchesSeason = selectedSeason === 'all' || fruit.season === selectedSeason
    return matchesSearch && matchesSubcategory && matchesSeason
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-yellow-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Link href="/ingredients" className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Ingredientes
            </Link>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frutas <span className="bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">Frescas</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Descubre todas las frutas para tus cócteles: cítricos, tropicales, bayas y más
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar frutas, cócteles, temporadas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subcategorías */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorías de Frutas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explora las diferentes categorías de frutas para tus cócteles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fruitSubcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <button
                  onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory.id ? 'all' : subcategory.id)}
                  className={`w-full relative bg-gradient-to-br ${subcategory.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer ${
                    selectedSubcategory === subcategory.id ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-400 to-transparent rounded-full blur-xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-400 to-transparent rounded-full blur-lg" />
                  </div>

                  {/* Icon */}
                  <div className={`relative w-12 h-12 bg-gradient-to-br ${subcategory.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <subcategory.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {subcategory.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {subcategory.description}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {subcategory.count}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        frutas
                      </span>
                    </div>

                    {/* Examples */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ejemplos:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {subcategory.fruits.slice(0, 3).map((fruit, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {fruit.name}
                          </span>
                        ))}
                        {subcategory.fruits.length > 3 && (
                          <span className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full">
                            +{subcategory.fruits.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedSubcategory === subcategory.id ? 'Seleccionado' : 'Ver frutas'}
                      </span>
                      <ChevronRight className={`h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all duration-300 ${
                        selectedSubcategory === subcategory.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frutas Filtradas */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedSubcategory === 'all' ? 'Todas las Frutas' : fruitSubcategories.find(s => s.id === selectedSubcategory)?.name}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {filteredFruits.length} frutas encontradas
            </p>
          </motion.div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSeason('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSeason === 'all'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              >
                Todas las temporadas
              </button>
              {seasons.map((season) => (
                <button
                  key={season.name}
                  onClick={() => setSelectedSeason(season.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedSeason === season.name
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                  }`}
                >
                  {season.name}
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

          {/* Frutas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFruits.map((fruit: any, index: number) => (
              <motion.div
                key={`${fruit.subcategoryId}-${fruit.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Header con subcategoría */}
                  <div className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 bg-gradient-to-r ${fruit.subcategoryColor} text-white text-xs font-semibold rounded-full`}>
                        {fruit.subcategory}
                      </span>
                      <button
                        onClick={() => setExpandedFruit(expandedFruit === `${fruit.subcategoryId}-${fruit.name}` ? null : `${fruit.subcategoryId}-${fruit.name}`)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 pt-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {fruit.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        {fruit.season}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Target className="h-4 w-4" />
                        Acidez: {fruit.acidity}
                      </div>
                    </div>

                    {/* Uses */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Cócteles:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {fruit.uses.slice(0, 2).map((use: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded"
                          >
                            {use}
                          </span>
                        ))}
                        {fruit.uses.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{fruit.uses.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedFruit === `${fruit.subcategoryId}-${fruit.name}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                      >
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Todos los Cócteles:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {fruit.uses.map((use: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                              >
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Temporada:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {fruit.season}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Acidez:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {fruit.acidity}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                        <BookOpen className="h-4 w-4" />
                        Ver Usos
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Temporadas */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frutas por Temporada
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre qué frutas están en temporada cada estación del año
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasons.map((season, index) => (
              <motion.div
                key={season.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${season.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {season.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {season.months}
                    </p>
                    
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Frutas de Temporada:
                      </p>
                      <div className="space-y-1">
                        {season.fruits.map((fruit, idx) => (
                          <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">{fruit}</p>
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