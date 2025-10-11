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
    description: 'Hierbas aromáticas y frescas para coctelería',
    count: 25,
    subcategories: [
      'Aromáticas',
      'Amargas / Tónicas',
      'Medicinales / Terapéuticas',
      'Especiadas / Calientes',
      'Mentoladas / Balsámicas',
      'Rituales / Tradicionales',
      'Verdes / Frescas'
    ],
    examples: ['Menta', 'Romero', 'Albahaca', 'Genciana', 'Manzanilla', 'Jengibre', 'Cedrón']
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
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
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
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-orange-900/20',
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
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-amber-900/20',
    description: 'Especias y condimentos',
    count: 30,
    subcategories: ['Dulces', 'Saladas', 'Picantes', 'Aromáticas'],
    examples: ['Canela', 'Nuez Moscada', 'Jengibre', 'Pimienta', 'Cardamomo']
  },
  {
    id: 'dairy',
    name: 'Lácteos',
    icon: Heart,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    description: 'Productos lácteos y cremas',
    count: 15,
    subcategories: ['Leche', 'Crema', 'Yogurt', 'Quesos'],
    examples: ['Leche', 'Crema de Leche', 'Yogurt Griego', 'Queso Crema', 'Mantequilla']
  },
  {
    id: 'nuts',
    name: 'Frutos Secos',
    icon: Award,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    description: 'Nueces y semillas',
    count: 20,
    subcategories: ['Nueces', 'Almendras', 'Pistachos', 'Semillas'],
    examples: ['Nuez', 'Almendra', 'Pistacho', 'Semilla de Chía', 'Coco']
  },
  {
    id: 'vegetables',
    name: 'Vegetales',
    icon: Leaf,
    color: 'from-green-500 to-lime-600',
    bgColor: 'from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20',
    description: 'Vegetales frescos',
    count: 25,
    subcategories: ['Hojas', 'Raíces', 'Bulbos', 'Tallos'],
    examples: ['Lechuga', 'Zanahoria', 'Cebolla', 'Apio', 'Pepino']
  },
  {
    id: 'flowers',
    name: 'Flores',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Flores comestibles',
    count: 12,
    subcategories: ['Rosas', 'Lavanda', 'Violetas', 'Hibisco'],
    examples: ['Pétalos de Rosa', 'Lavanda', 'Violeta', 'Hibisco', 'Caléndula']
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    icon: Award,
    color: 'from-amber-600 to-orange-700',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Productos de cacao',
    count: 18,
    subcategories: ['Chocolate Negro', 'Chocolate Blanco', 'Cacao', 'Polvos'],
    examples: ['Chocolate Negro', 'Chocolate Blanco', 'Cacao en Polvo', 'Chocolate Líquido']
  },
  {
    id: 'alcohol',
    name: 'Alcohol',
    icon: Zap,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Bebidas alcohólicas',
    count: 50,
    subcategories: ['Licores', 'Vinos', 'Cervezas', 'Destilados'],
    examples: ['Vodka', 'Gin', 'Ron', 'Tequila', 'Vino Tinto', 'Cerveza']
  },
  {
    id: 'sweeteners',
    name: 'Endulzantes',
    icon: Star,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Azúcares y edulcorantes',
    count: 22,
    subcategories: ['Azúcares', 'Mieles', 'Edulcorantes', 'Naturales'],
    examples: ['Azúcar Blanco', 'Azúcar Moreno', 'Miel', 'Stevia', 'Agave']
  },
  {
    id: 'salts',
    name: 'Sales',
    icon: Award,
    color: 'from-gray-400 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20',
    description: 'Sales y minerales',
    count: 15,
    subcategories: ['Marina', 'Himalaya', 'Especiadas', 'Ahumadas'],
    examples: ['Sal Marina', 'Sal del Himalaya', 'Sal Ahumada', 'Sal de Ajo']
  },
  {
    id: 'oils',
    name: 'Aceites',
    icon: Droplets,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Aceites y grasas',
    count: 12,
    subcategories: ['Oliva', 'Coco', 'Sésamo', 'Esenciales'],
    examples: ['Aceite de Oliva', 'Aceite de Coco', 'Aceite de Sésamo', 'Aceite de Lavanda']
  },
  {
    id: 'teas',
    name: 'Tés',
    icon: BookOpen,
    color: 'from-green-600 to-emerald-700',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Tés e infusiones',
    count: 28,
    subcategories: ['Negro', 'Verde', 'Herbales', 'Frutales'],
    examples: ['Té Negro', 'Té Verde', 'Té de Manzanilla', 'Té de Frutas']
  },
  {
    id: 'spirits',
    name: 'Licores',
    icon: Heart,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    description: 'Licores y destilados',
    count: 40,
    subcategories: ['Dulces', 'Secos', 'Aromáticos', 'Cremosos'],
    examples: ['Baileys', 'Kahlúa', 'Cointreau', 'Grand Marnier', 'Amaretto']
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
      fiber: 2.8
    },
    description: 'Fruta cítrica ácida y refrescante, esencial en la coctelería clásica.',
    uses: ['Cócteles clásicos', 'Decoración', 'Aromatización'],
    image: '/images/ingredients/lemon.jpg',
    rating: 4.8,
    isPremium: false,
    price: 0.50,
    unit: 'unidad'
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
      vitaminA: 101,
      iron: 5.5
    },
    description: 'Hierba aromática refrescante, perfecta para mojitos y cócteles tropicales.',
    uses: ['Mojito', 'Julep', 'Decoración'],
    image: '/images/ingredients/mint.jpg',
    rating: 4.6,
    isPremium: false,
    price: 1.20,
    unit: 'manojo'
  },
  {
    id: '3',
    name: 'Angostura Bitters',
    category: 'Bitters',
    type: 'Aromático',
    origin: 'Trinidad y Tobago',
    season: 'Todo el año',
    nutrition: {
      calories: 0,
      alcohol: 44.7
    },
    description: 'Bitters clásico con notas de especias, esencial en muchos cócteles.',
    uses: ['Old Fashioned', 'Manhattan', 'Pink Gin'],
    image: '/images/ingredients/angostura.jpg',
    rating: 4.9,
    isPremium: true,
    price: 15.99,
    unit: 'botella'
  }
]

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredIngredients, setFilteredIngredients] = useState(featuredIngredients)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term === '') {
      setFilteredIngredients(featuredIngredients)
    } else {
      const filtered = featuredIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(term.toLowerCase()) ||
        ingredient.category.toLowerCase().includes(term.toLowerCase()) ||
        ingredient.type.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredIngredients(filtered)
    }
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setFilteredIngredients(featuredIngredients)
    } else {
      const filtered = featuredIngredients.filter(ingredient =>
        ingredient.category.toLowerCase() === category.toLowerCase()
      )
      setFilteredIngredients(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Apple className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ingredientes para Cócteles
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Explora nuestra colección completa de ingredientes premium para crear los mejores cócteles
            </p>
            <div className="flex justify-center gap-4 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Apple className="h-4 w-4" /> {ingredientCategories.reduce((sum, cat) => sum + cat.count, 0)} Ingredientes
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
                  placeholder="Buscar ingredientes..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none"
                >
                  <option value="all">Todas las Categorías</option>
                  {ingredientCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
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
                  <option value="category">Ordenar por Categoría</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Categorías de Ingredientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ingredientCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/ingredients/${category.id}`}>
                  <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer h-full`}>
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
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2 mb-4">
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
                        {category.examples.slice(0, 2).map((example, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                          >
                            {example}
                          </span>
                        ))}
                        {category.examples.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{category.examples.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-center gap-2 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      <span>Ver ingredientes</span>
                      <ChevronRight className="h-4 w-4" />
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ingredientes Destacados
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredIngredients.length} ingredientes encontrados
            </span>
          </div>

          {filteredIngredients.length === 0 ? (
            <div className="text-center py-20">
              <Apple className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron ingredientes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay ingredientes disponibles'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {ingredient.image ? (
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                          <Apple className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Premium Badge */}
                      {ingredient.isPremium && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-semibold rounded-full flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Premium
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
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {ingredient.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {ingredient.type}
                          </p>
                        </div>
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
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {ingredient.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {ingredient.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${ingredient.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          por {ingredient.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}