'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wine, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ExternalLink,
  Award,
  Clock,
  TrendingUp,
  ChevronRight,
  Flame,
  Droplets,
  Zap,
  Heart,
  BookOpen,
  BarChart3
} from 'lucide-react'

const spiritCategories = [
  // DESTILADOS (Bebidas espirituosas puras)
  {
    id: 'whisky',
    name: 'Whisky',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'El rey de los destilados',
    count: 150,
    type: 'destilado',
    subcategories: ['Scotch', 'Bourbon', 'Irish', 'Japanese', 'Rye']
  },
  {
    id: 'tequila',
    name: 'Tequila',
    icon: Flame,
    color: 'from-green-500 to-yellow-600',
    bgColor: 'from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20',
    description: 'El espíritu de México',
    count: 80,
    type: 'destilado',
    subcategories: ['Blanco', 'Reposado', 'Añejo', 'Extra Añejo']
  },
  {
    id: 'vodka',
    name: 'Vodka',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Pureza y versatilidad',
    count: 120,
    type: 'destilado',
    subcategories: ['Premium', 'Flavored', 'Grain', 'Potato']
  },
  {
    id: 'rum',
    name: 'Ron',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'El sabor del Caribe',
    count: 90,
    type: 'destilado',
    subcategories: ['White', 'Gold', 'Dark', 'Spiced', 'Aged']
  },
  {
    id: 'gin',
    name: 'Gin',
    icon: Award,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    description: 'Botánicos y aromas',
    count: 70,
    type: 'destilado',
    subcategories: ['London Dry', 'Plymouth', 'Old Tom', 'Navy Strength']
  },
  {
    id: 'cognac',
    name: 'Cognac',
    icon: Star,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    description: 'Elegancia francesa',
    count: 60,
    type: 'destilado',
    subcategories: ['VS', 'VSOP', 'XO', 'Hors d\'Age']
  },
  // LICORES (Bebidas alcohólicas con azúcar)
  {
    id: 'liqueurs',
    name: 'Licores',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    description: 'Bebidas alcohólicas con azúcar',
    count: 200,
    type: 'licor',
    subcategories: ['Cointreau', 'Grand Marnier', 'Baileys', 'Kahlúa', 'Amaretto']
  },
  {
    id: 'vermouth',
    name: 'Vermut',
    icon: BookOpen,
    color: 'from-red-500 to-crimson-600',
    bgColor: 'from-red-50 to-crimson-50 dark:from-red-900/20 dark:to-crimson-900/20',
    description: 'Vino aromatizado con hierbas',
    count: 45,
    type: 'licor',
    subcategories: ['Sweet', 'Dry', 'Bianco', 'Rosso']
  },
  {
    id: 'bitters',
    name: 'Bitters',
    icon: Droplets,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Concentrados aromáticos',
    count: 80,
    type: 'licor',
    subcategories: ['Angostura', 'Peychaud\'s', 'Orange', 'Chocolate']
  }
]

const featuredSpirits = [
  {
    id: '1',
    name: 'Johnnie Walker Blue Label',
    category: 'Scotch Whisky',
    region: 'Escocia',
    abv: 40,
    price: 250,
    rating: 4.9,
    reviews: 1247,
    description: 'El blend más prestigioso de Johnnie Walker',
    image: '/images/spirits/johnnie-walker-blue.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Johnnie_Walker',
    isPremium: true,
    tags: ['Premium', 'Blend', 'Escocia']
  },
  {
    id: '2',
    name: 'Don Julio 1942',
    category: 'Tequila Añejo',
    region: 'Jalisco, México',
    abv: 40,
    price: 180,
    rating: 4.8,
    reviews: 892,
    description: 'Tequila ultra-premium con 18 meses de añejamiento',
    image: '/images/spirits/don-julio-1942.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Don_Julio',
    isPremium: true,
    tags: ['Premium', 'Añejo', 'México']
  },
  {
    id: '3',
    name: 'Grey Goose',
    category: 'Vodka Premium',
    region: 'Francia',
    abv: 40,
    price: 45,
    rating: 4.7,
    reviews: 2156,
    description: 'Vodka francés de trigo de invierno',
    image: '/images/spirits/grey-goose.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Grey_Goose',
    isPremium: true,
    tags: ['Premium', 'Francia', 'Trigo']
  },
  {
    id: '4',
    name: 'Havana Club 7 Años',
    category: 'Ron Añejo',
    region: 'Cuba',
    abv: 40,
    price: 35,
    rating: 4.6,
    reviews: 1456,
    description: 'Ron cubano con 7 años de añejamiento',
    image: '/images/spirits/havana-club-7.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Havana_Club',
    isPremium: false,
    tags: ['Añejo', 'Cuba', 'Clásico']
  }
]

const regions = [
  { name: 'Escocia', count: 45, flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { name: 'México', count: 38, flag: '🇲🇽' },
  { name: 'Francia', count: 32, flag: '🇫🇷' },
  { name: 'Japón', count: 28, flag: '🇯🇵' },
  { name: 'Cuba', count: 25, flag: '🇨🇺' },
  { name: 'Estados Unidos', count: 42, flag: '🇺🇸' }
]

export default function SpiritsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredSpirits = featuredSpirits.filter(spirit => {
    const matchesSearch = spirit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spirit.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spirit.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || spirit.category.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Guía Completa de <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Destilados y Licores</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Explora el mundo de los destilados (bebidas espirituosas puras) y licores (bebidas alcohólicas con azúcar) con información detallada, marcas, regiones y enlaces informativos
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar licores, marcas, regiones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors">
                  Buscar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Destilados */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Wine className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Destilados
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Bebidas espirituosas puras</strong> obtenidas por destilación de materias primas fermentadas (cereales, frutas, etc.).
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Whisky, Tequila, Vodka, Ron, Gin, Cognac</li>
                  <li>• Sin azúcar añadido</li>
                  <li>• Mayor graduación alcohólica</li>
                  <li>• Sabor puro de la materia prima</li>
                </ul>
              </div>

              {/* Licores */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-8 border border-pink-200 dark:border-pink-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Licores
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Bebidas alcohólicas con azúcar</strong> y aromatizantes, generalmente de menor graduación alcohólica.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Cointreau, Grand Marnier, Baileys, Kahlúa</li>
                  <li>• Con azúcar y aromatizantes</li>
                  <li>• Menor graduación alcohólica</li>
                  <li>• Sabores dulces y aromáticos</li>
                </ul>
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
              Destilados y Licores
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Descubre los diferentes tipos de <strong>destilados</strong> (bebidas espirituosas puras) y <strong>licores</strong> (bebidas alcohólicas con azúcar) y sus características únicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spiritCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-400 to-transparent rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-400 to-transparent rounded-full blur-xl" />
                  </div>

                  {/* Icon */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.type === 'destilado' 
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                          : 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                      }`}>
                        {category.type === 'destilado' ? 'DESTILADO' : 'LICOR'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {category.count}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        licores
                      </span>
                    </div>

                    {/* Subcategories */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Tipos:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full">
                            +{category.subcategories.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Explorar licores
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300" />
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

      {/* Featured Spirits */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Licores Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los destilados más populares y mejor valorados por la comunidad
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                }`}
              >
                Todos
              </button>
              {spiritCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                  }`}
                >
                  {category.name}
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

          {/* Spirits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredSpirits.map((spirit, index) => (
              <motion.div
                key={spirit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Wine className="h-16 w-16 text-primary-600 dark:text-primary-400" />
                    </div>
                    
                    {/* Premium Badge */}
                    {spirit.isPremium && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {spirit.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {spirit.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {spirit.category}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4" />
                        {spirit.region}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        {spirit.abv}% ABV
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {spirit.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {spirit.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Price and Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${spirit.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {spirit.reviews} reviews
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href={spirit.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Más Info
                      </a>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <BookOpen className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Regiones Destacadas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explora los destilados por su origen geográfico
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className="text-4xl mb-3">{region.flag}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {region.name}
                  </h3>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {region.count}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    licores
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
