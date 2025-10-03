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
  Apple,
  Leaf,
  Zap,
  Heart,
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
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const ingredientCategories = [
  {
    id: 'fruits',
    name: 'Frutas',
    icon: Apple,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Frutas frescas y cítricos',
    count: 45,
    subcategories: ['Cítricos', 'Tropicales', 'Bayas', 'Frutas de temporada'],
    examples: ['Limón', 'Lima', 'Naranja', 'Piña', 'Mango', 'Fresa', 'Arándano']
  },
  {
    id: 'herbs',
    name: 'Hierbas',
    icon: Leaf,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    description: 'Hierbas aromáticas y frescas',
    count: 25,
    subcategories: ['Menta', 'Albahaca', 'Romero', 'Tomillo', 'Cilantro'],
    examples: ['Menta', 'Albahaca', 'Romero', 'Tomillo', 'Cilantro', 'Perejil']
  },
  {
    id: 'juices',
    name: 'Jugos',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Jugos naturales y concentrados',
    count: 30,
    subcategories: ['Cítricos', 'Tropicales', 'Vegetales', 'Concentrados'],
    examples: ['Jugo de Naranja', 'Jugo de Piña', 'Jugo de Lima', 'Tomate']
  },
  {
    id: 'syrups',
    name: 'Jarabes',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Jarabes dulces y aromáticos',
    count: 35,
    subcategories: ['Simples', 'Aromáticos', 'Especiales', 'Sin Azúcar'],
    examples: ['Jarabe Simple', 'Grenadina', 'Jarabe de Agave', 'Miel']
  },
  {
    id: 'bitters',
    name: 'Bitters',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Concentrados aromáticos',
    count: 20,
    subcategories: ['Aromatic', 'Citrus', 'Chocolate', 'Herbal'],
    examples: ['Angostura', 'Peychaud\'s', 'Orange', 'Chocolate']
  },
  {
    id: 'garnishes',
    name: 'Decoraciones',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    description: 'Elementos decorativos',
    count: 40,
    subcategories: ['Frutas', 'Hierbas', 'Flores', 'Especias'],
    examples: ['Rodaja de Lima', 'Cereza', 'Rama de Menta', 'Canela']
  },
  {
    id: 'mixers',
    name: 'Mixers',
    icon: BarChart3,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Bebidas mezcladoras',
    count: 25,
    subcategories: ['Tónicas', 'Sodas', 'Ginger Ale', 'Refrescos'],
    examples: ['Tónica', 'Ginger Ale', 'Coca Cola', 'Soda', 'Agua de Coco']
  },
  {
    id: 'spices',
    name: 'Especias',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Especias y condimentos',
    count: 30,
    subcategories: ['Dulces', 'Saladas', 'Picantes', 'Aromáticas'],
    examples: ['Canela', 'Nuez Moscada', 'Jengibre', 'Pimienta', 'Cardamomo']
  }
]

const featuredIngredients = [
  {
    id: '1',
    name: 'Limón',
    category: 'Frutas',
    type: 'Cítrico',
    origin: 'Mediterráneo',
    season: 'Todo el año',
    nutrition: {
      calories: 29,
      vitaminC: 53,
      acidity: 'Alta'
    },
    uses: ['Margarita', 'Limonada', 'Gin Tonic'],
    description: 'El cítrico más versátil en mixología',
    image: '/images/ingredients/lemon.jpg',
    isEssential: true,
    storage: 'Refrigerado',
    shelfLife: '2-3 semanas'
  },
  {
    id: '2',
    name: 'Menta',
    category: 'Hierbas',
    type: 'Aromática',
    origin: 'Europa',
    season: 'Primavera-Verano',
    nutrition: {
      calories: 44,
      vitaminC: 31,
      acidity: 'Baja'
    },
    uses: ['Mojito', 'Mint Julep', 'Mint Lemonade'],
    description: 'Hierba aromática esencial para cócteles refrescantes',
    image: '/images/ingredients/mint.jpg',
    isEssential: true,
    storage: 'Agua fresca',
    shelfLife: '1 semana'
  },
  {
    id: '3',
    name: 'Jarabe Simple',
    category: 'Jarabes',
    type: 'Dulce',
    origin: 'Universal',
    season: 'Todo el año',
    nutrition: {
      calories: 260,
      vitaminC: 0,
      acidity: 'Neutra'
    },
    uses: ['Old Fashioned', 'Whiskey Sour', 'Daiquiri'],
    description: 'Base dulce fundamental en mixología',
    image: '/images/ingredients/simple-syrup.jpg',
    isEssential: true,
    storage: 'Refrigerado',
    shelfLife: '1 mes'
  },
  {
    id: '4',
    name: 'Angostura Bitters',
    category: 'Bitters',
    type: 'Aromático',
    origin: 'Trinidad y Tobago',
    season: 'Todo el año',
    nutrition: {
      calories: 0,
      vitaminC: 0,
      acidity: 'Alta'
    },
    uses: ['Old Fashioned', 'Manhattan', 'Pink Gin'],
    description: 'El bitter más famoso del mundo',
    image: '/images/ingredients/angostura.jpg',
    isEssential: true,
    storage: 'Ambiente',
    shelfLife: 'Indefinido'
  }
]

const seasonalIngredients = [
  {
    name: 'Fresas',
    season: 'Primavera',
    months: ['Mar', 'Abr', 'May'],
    color: 'from-pink-500 to-red-500',
    uses: ['Strawberry Daiquiri', 'Strawberry Margarita']
  },
  {
    name: 'Mango',
    season: 'Verano',
    months: ['Jun', 'Jul', 'Ago'],
    color: 'from-yellow-500 to-orange-500',
    uses: ['Mango Margarita', 'Tropical Punch']
  },
  {
    name: 'Manzana',
    season: 'Otoño',
    months: ['Sep', 'Oct', 'Nov'],
    color: 'from-green-500 to-yellow-500',
    uses: ['Apple Martini', 'Hot Toddy']
  },
  {
    name: 'Granada',
    season: 'Invierno',
    months: ['Dic', 'Ene', 'Feb'],
    color: 'from-red-500 to-purple-500',
    uses: ['Pomegranate Martini', 'Winter Punch']
  }
]

const nutritionalInfo = [
  { name: 'Calorías', value: '29', unit: 'kcal/100g', icon: TrendingUp },
  { name: 'Vitamina C', value: '53', unit: 'mg/100g', icon: Award },
  { name: 'Acidez', value: 'Alta', unit: 'pH 2.0-2.5', icon: BarChart3 },
  { name: 'Sodio', value: '2', unit: 'mg/100g', icon: Droplets }
]

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredIngredients = featuredIngredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Guía Completa de <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Ingredientes</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Explora todos los ingredientes esenciales para la mixología: frutas, hierbas, jugos, jarabes y más
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar ingredientes, frutas, hierbas..."
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
              Categorías de Ingredientes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Organiza tus ingredientes por categorías para una mejor gestión en tu bar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredientCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/ingredients/${category.id}`}>
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {category.description}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.count}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ingredientes
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
                        Ver ingredientes
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ingredients */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ingredientes Esenciales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los ingredientes fundamentales que todo bartender debe tener en su bar
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              >
                Todos
              </button>
              {ingredientCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
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

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredIngredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Apple className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                    
                    {/* Essential Badge */}
                    {ingredient.isEssential && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Esencial
                        </span>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {ingredient.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {ingredient.name}
                      </h3>
                      <button
                        onClick={() => setExpandedIngredient(expandedIngredient === ingredient.id ? null : ingredient.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4" />
                        {ingredient.origin}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        {ingredient.season}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {ingredient.shelfLife}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {ingredient.description}
                    </p>

                    {/* Uses */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Usos:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.uses.map((use, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedIngredient === ingredient.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                      >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Calorías
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ingredient.nutrition.calories} kcal/100g
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Vitamina C
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ingredient.nutrition.vitaminC} mg/100g
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Almacenamiento: {ingredient.storage}
                          </span>
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

      {/* Seasonal Ingredients */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ingredientes de Temporada
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre los ingredientes frescos de cada estación para crear cócteles únicos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasonalIngredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${ingredient.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Apple className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {ingredient.name}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                        {ingredient.season}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <p className="font-semibold mb-2">Meses:</p>
                      <p>{ingredient.months.join(', ')}</p>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-semibold mb-2">Cócteles:</p>
                      <div className="space-y-1">
                        {ingredient.uses.map((use, idx) => (
                          <p key={idx} className="text-xs">{use}</p>
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
