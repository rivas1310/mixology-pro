'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Search, 
  X, 
  Check, 
  Wine, 
  Apple, 
  Droplets,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

const ingredientCategories = [
  {
    id: 'spirits',
    name: 'Licores',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    ingredients: [
      { name: 'Tequila', selected: false },
      { name: 'Vodka', selected: false },
      { name: 'Ron', selected: false },
      { name: 'Whisky', selected: false },
      { name: 'Gin', selected: false },
      { name: 'Cognac', selected: false },
      { name: 'Brandy', selected: false },
      { name: 'Mezcal', selected: false }
    ]
  },
  {
    id: 'fruits',
    name: 'Frutas',
    icon: Apple,
    color: 'from-green-500 to-emerald-600',
    ingredients: [
      { name: 'Limón', selected: false },
      { name: 'Lima', selected: false },
      { name: 'Naranja', selected: false },
      { name: 'Piña', selected: false },
      { name: 'Mango', selected: false },
      { name: 'Fresa', selected: false },
      { name: 'Arándano', selected: false },
      { name: 'Maracuyá', selected: false }
    ]
  },
  {
    id: 'mixers',
    name: 'Mixers',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    ingredients: [
      { name: 'Tónica', selected: false },
      { name: 'Ginger Ale', selected: false },
      { name: 'Coca Cola', selected: false },
      { name: 'Soda', selected: false },
      { name: 'Jugo de Naranja', selected: false },
      { name: 'Jugo de Piña', selected: false },
      { name: 'Cranberry', selected: false },
      { name: 'Agua de Coco', selected: false }
    ]
  }
]

const mockCocktails = [
  {
    id: '1',
    name: 'Margarita',
    match: 100,
    ingredients: ['Tequila', 'Lima', 'Cointreau'],
    difficulty: 'Fácil',
    time: '3 min'
  },
  {
    id: '2',
    name: 'Mojito',
    match: 85,
    ingredients: ['Ron', 'Menta', 'Lima', 'Soda'],
    difficulty: 'Fácil',
    time: '4 min'
  },
  {
    id: '3',
    name: 'Cosmopolitan',
    match: 75,
    ingredients: ['Vodka', 'Cranberry', 'Lima', 'Cointreau'],
    difficulty: 'Medio',
    time: '5 min'
  }
]

export function IngredientsSearch() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev: string[]) => 
      prev.indexOf(ingredient) !== -1
        ? prev.filter((item: string) => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  const searchCocktails = () => {
    if (selectedIngredients.length === 0) return
    
    setIsSearching(true)
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockCocktails)
      setIsSearching(false)
    }, 1000)
  }

  const clearSearch = () => {
    setSelectedIngredients([])
    setSearchResults([])
  }

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Qué puedes preparar?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Selecciona los ingredientes que tienes disponibles y descubre qué cócteles puedes preparar
          </p>
          
          {/* Botón de prueba temporal */}
          <div className="mt-8">
            <a 
              href="/ingredients/fruits/test"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/ingredients/fruits/test';
              }}
            >
              🧪 PRUEBA: Ir a Frutas (Click Aquí)
            </a>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Ingredient Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {ingredientCategories.map((category, index) => (
              <div key={category.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <a 
                    href="/ingredients/fruits/test"
                    className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/ingredients/fruits/test';
                    }}
                  >
                    Ver más
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
                
                <div className="space-y-2">
                  {category.ingredients.map((ingredient, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleIngredient(ingredient.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        selectedIngredients.indexOf(ingredient.name) !== -1
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-2 border-primary-300 dark:border-primary-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <span className="font-medium">{ingredient.name}</span>
                      {selectedIngredients.indexOf(ingredient.name) !== -1 && (
                        <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200">
                    Ingredientes Seleccionados ({selectedIngredients.length})
                  </h3>
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Limpiar
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedIngredients.map((ingredient: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {ingredient}
                      <button
                        onClick={() => toggleIngredient(ingredient)}
                        className="hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <button
                  onClick={searchCocktails}
                  disabled={isSearching}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Buscar Cócteles
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cócteles que puedes preparar
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((cocktail: any, index: number) => (
                  <motion.div
                    key={cocktail.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <Link href={`/cocktails/${cocktail.id}`} className="block">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {cocktail.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {cocktail.match}% match
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ingredientes:</p>
                          <div className="flex flex-wrap gap-1">
                            {cocktail.ingredients.map((ingredient: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Dificultad: {cocktail.difficulty}</span>
                          <span>Tiempo: {cocktail.time}</span>
                        </div>
                      </div>
                    </Link>

                    <Link 
                      href={`/cocktails/${cocktail.id}`}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Ver Receta
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {selectedIngredients.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Selecciona ingredientes para comenzar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Elige los ingredientes que tienes disponibles para encontrar cócteles que puedas preparar
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

