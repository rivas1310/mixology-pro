'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, Users, Star, ArrowRight, Filter } from 'lucide-react'
import { useApp } from '@/app/providers'
import { COCKTAIL_CATEGORIES } from '@/lib/constants'

const featuredCocktails = [
  {
    id: '1',
    name: 'Margarita Clásica',
    description: 'El cóctel mexicano más famoso del mundo',
    image: '/images/cocktails/margarita.jpg',
    category: 'CLASSIC',
    difficulty: 'EASY',
    prepTime: 3,
    rating: 4.8,
    reviews: 1247,
    ingredients: ['Tequila', 'Cointreau', 'Lima', 'Sal'],
    story: 'Creada en 1938 por Carlos "Danny" Herrera en Tijuana, México, para una cliente alérgica al alcohol que no podía beber cócteles tradicionales.',
    trivia: 'La sal en el borde no es solo decorativa: neutraliza la acidez del limón y realza el sabor del tequila.',
    isAlcoholic: true,
    abv: 22
  },
  {
    id: '2',
    name: 'Old Fashioned',
    description: 'El cóctel más antiguo del mundo',
    image: '/images/cocktails/old-fashioned.jpg',
    category: 'CLASSIC',
    difficulty: 'MEDIUM',
    prepTime: 5,
    rating: 4.9,
    reviews: 2156,
    ingredients: ['Whisky Bourbon', 'Azúcar', 'Angostura Bitters', 'Naranja'],
    story: 'Inventado en el siglo XIX en Louisville, Kentucky, es considerado el primer cóctel de la historia.',
    trivia: 'Originalmente se servía con azúcar en cubos, no jarabe simple. La técnica de "muddling" es crucial.',
    isAlcoholic: true,
    abv: 28
  },
  {
    id: '3',
    name: 'Mojito Cubano',
    description: 'Frescura cubana en cada sorbo',
    image: '/images/cocktails/mojito.jpg',
    category: 'TROPICAL',
    difficulty: 'EASY',
    prepTime: 4,
    rating: 4.7,
    reviews: 1893,
    ingredients: ['Ron Blanco', 'Menta', 'Lima', 'Azúcar', 'Soda'],
    story: 'Originario de Cuba en el siglo XVI, fue popularizado por Ernest Hemingway en La Bodeguita del Medio.',
    trivia: 'La clave está en el "muddling" suave de la menta para liberar sus aceites sin amargar la bebida.',
    isAlcoholic: true,
    abv: 15
  },
  {
    id: '4',
    name: 'Negroni',
    description: 'El aperitivo italiano perfecto',
    image: '/images/cocktails/negroni.jpg',
    category: 'CLASSIC',
    difficulty: 'EASY',
    prepTime: 2,
    rating: 4.6,
    reviews: 987,
    ingredients: ['Gin', 'Campari', 'Vermut Rosso', 'Naranja'],
    story: 'Creado en 1919 en Florencia por el Conde Camillo Negroni, quien pidió que fortalecieran su Americano.',
    trivia: 'Se sirve siempre "on the rocks" y se considera el cóctel perfecto por su equilibrio de sabores.',
    isAlcoholic: true,
    abv: 24
  },
  {
    id: '5',
    name: 'Piña Colada',
    description: 'El sabor del Caribe',
    image: '/images/cocktails/pina-colada.jpg',
    category: 'TROPICAL',
    difficulty: 'MEDIUM',
    prepTime: 6,
    rating: 4.5,
    reviews: 1456,
    ingredients: ['Ron Blanco', 'Crema de Coco', 'Piña', 'Hielo'],
    story: 'Inventada en 1954 en el Hotel Caribe Hilton de San Juan, Puerto Rico, por Ramón "Monchito" Marrero.',
    trivia: 'Puerto Rico declaró la Piña Colada como su bebida nacional oficial en 1978.',
    isAlcoholic: true,
    abv: 18
  },
  {
    id: '6',
    name: 'Virgin Mojito',
    description: 'Toda la frescura sin alcohol',
    image: '/images/cocktails/virgin-mojito.jpg',
    category: 'MOCKTAIL',
    difficulty: 'EASY',
    prepTime: 3,
    rating: 4.4,
    reviews: 567,
    ingredients: ['Menta', 'Lima', 'Azúcar', 'Soda', 'Jarabe de Lima'],
    story: 'Versión sin alcohol del clásico cubano, perfecta para cualquier momento del día.',
    trivia: 'Los mocktails están ganando popularidad en bares de alta gama, con técnicas de mixología aplicadas.',
    isAlcoholic: false,
    abv: 0
  }
]

const categories = [
  { id: 'all', name: 'Todos', count: featuredCocktails.length },
  ...COCKTAIL_CATEGORIES.map(cat => ({
    id: cat.value,
    name: cat.label,
    count: featuredCocktails.filter(c => c.category === cat.value).length
  }))
]

export function FeaturedCocktails() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const { favorites, toggleFavorite } = useApp()

  const filteredCocktails = selectedCategory === 'all' 
    ? featuredCocktails 
    : featuredCocktails.filter(cocktail => cocktail.category === selectedCategory)

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cócteles Destacados
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubre las recetas más populares y técnicas profesionales para crear cócteles perfectos
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                }`}
              >
                {category.name} ({category.count})
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
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCocktails.map((cocktail, index) => (
            <motion.div
              key={cocktail.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20" />
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
                  <span className="text-6xl">🍹</span>
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(cocktail.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    favorites.includes(cocktail.id)
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(cocktail.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-semibold rounded-full text-gray-700 dark:text-gray-300">
                    {categories.find(c => c.id === cocktail.category)?.name}
                  </span>
                </div>

                {/* ABV Badge */}
                {cocktail.isAlcoholic && (
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded">
                      {cocktail.abv}% ABV
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {cocktail.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {cocktail.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {cocktail.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {cocktail.prepTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {cocktail.reviews} reviews
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {cocktail.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {cocktail.ingredients.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">
                        +{cocktail.ingredients.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 group">
                  Ver Receta
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-primary-600 hover:text-white text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300">
            Ver Todos los Cócteles
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

