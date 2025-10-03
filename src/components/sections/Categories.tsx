'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wine, 
  Sun, 
  Sparkles, 
  Droplets, 
  Zap, 
  Heart,
  ArrowRight 
} from 'lucide-react'

const categories = [
  {
    id: 'classic',
    name: 'Clásicos',
    description: 'Los cócteles que definieron la mixología',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    count: 150,
    examples: ['Old Fashioned', 'Manhattan', 'Martini', 'Negroni']
  },
  {
    id: 'tropical',
    name: 'Tropicales',
    description: 'Sabores del Caribe y el Pacífico',
    icon: Sun,
    color: 'from-yellow-500 to-pink-600',
    bgColor: 'from-yellow-50 to-pink-50 dark:from-yellow-900/20 dark:to-pink-900/20',
    count: 120,
    examples: ['Piña Colada', 'Mojito', 'Daiquiri', 'Mai Tai']
  },
  {
    id: 'modern',
    name: 'Modernos',
    description: 'Innovación en cada sorbo',
    icon: Sparkles,
    color: 'from-purple-500 to-blue-600',
    bgColor: 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20',
    count: 200,
    examples: ['Espresso Martini', 'Aperol Spritz', 'Paper Plane', 'Last Word']
  },
  {
    id: 'mocktail',
    name: 'Sin Alcohol',
    description: 'Frescura sin comprometer el sabor',
    icon: Droplets,
    color: 'from-green-500 to-teal-600',
    bgColor: 'from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20',
    count: 80,
    examples: ['Virgin Mojito', 'Shirley Temple', 'Arnold Palmer', 'Virgin Mary']
  },
  {
    id: 'shots',
    name: 'Shots',
    description: 'Intensidad en pequeñas dosis',
    icon: Zap,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    count: 60,
    examples: ['Tequila Shot', 'Jägerbomb', 'Kamikaze', 'B-52']
  },
  {
    id: 'hot',
    name: 'Bebidas Calientes',
    description: 'Calidez para cualquier ocasión',
    icon: Heart,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    count: 40,
    examples: ['Hot Toddy', 'Irish Coffee', 'Mulled Wine', 'Hot Buttered Rum']
  }
]

export function Categories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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
            Explora por Categorías
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Encuentra el cóctel perfecto para cualquier ocasión y paladar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer`}>
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
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>

                  {/* Count */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {category.count}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      recetas
                    </span>
                  </div>

                  {/* Examples */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Ejemplos populares:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.examples.slice(0, 2).map((example, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {example}
                        </span>
                      ))}
                      {category.examples.length > 2 && (
                        <span className="px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 rounded-full">
                          +{category.examples.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Ver todas las recetas
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/25">
            Explorar Todas las Categorías
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

