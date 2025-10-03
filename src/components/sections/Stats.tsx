'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wine, 
  Users, 
  Star, 
  Award, 
  Clock, 
  TrendingUp 
} from 'lucide-react'

const stats = [
  {
    icon: Wine,
    value: '500+',
    label: 'Recetas Profesionales',
    description: 'Cócteles clásicos y modernos',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Users,
    value: '10K+',
    label: 'Bartenders Activos',
    description: 'Comunidad profesional',
    color: 'from-accent-500 to-accent-600'
  },
  {
    icon: Star,
    value: '4.9',
    label: 'Rating Promedio',
    description: 'Calidad garantizada',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Award,
    value: '50+',
    label: 'Técnicas Avanzadas',
    description: 'Mixología profesional',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Clock,
    value: '< 3min',
    label: 'Tiempo Promedio',
    description: 'Preparación eficiente',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Satisfacción',
    description: 'Clientes satisfechos',
    color: 'from-blue-500 to-cyan-500'
  }
]

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Números que Hablan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            La plataforma más confiable para profesionales de la mixología
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-semibold">
            <Wine className="h-5 w-5" />
            Actualizado diariamente con nuevas recetas
          </div>
        </motion.div>
      </div>
    </section>
  )
}

