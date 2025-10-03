'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, Award, Users } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'Bartender Jefe - Hotel Ritz Madrid',
    avatar: '/images/avatars/carlos.jpg',
    rating: 5,
    content: 'Mixology Pro ha revolucionado mi forma de trabajar. Las recetas son precisas, las técnicas están perfectamente explicadas y la base de datos de licores es impresionante. Es mi herramienta de referencia diaria.',
    experience: '15 años de experiencia'
  },
  {
    id: 2,
    name: 'Sofia Rodriguez',
    role: 'Mixóloga - Bar Speakeasy Barcelona',
    avatar: '/images/avatars/sofia.jpg',
    rating: 5,
    content: 'La función de búsqueda por ingredientes es genial. Cuando tengo ingredientes limitados, siempre encuentro algo increíble que preparar. Los enlaces informativos me han ayudado a entender mejor cada licor.',
    experience: '8 años de experiencia'
  },
  {
    id: 3,
    name: 'Diego Herrera',
    role: 'Propietario - Cocktail Bar México',
    avatar: '/images/avatars/diego.jpg',
    rating: 5,
    content: 'La calculadora de costos me ha ayudado a optimizar mis márgenes. Además, las historias de los cócteles son fascinantes y mis clientes siempre preguntan por ellas. ¡Es como tener un maestro mixólogo en el bolsillo!',
    experience: '12 años de experiencia'
  },
  {
    id: 4,
    name: 'Ana Martínez',
    role: 'Instructora de Mixología - Escuela de Hostelería',
    avatar: '/images/avatars/ana.jpg',
    rating: 5,
    content: 'Uso Mixology Pro en todas mis clases. Los estudiantes adoran las animaciones y las explicaciones paso a paso. Es la herramienta más completa que he visto para enseñar mixología.',
    experience: '10 años de experiencia'
  },
  {
    id: 5,
    name: 'Roberto Silva',
    role: 'Bartender - Restaurante Michelin',
    avatar: '/images/avatars/roberto.jpg',
    rating: 5,
    content: 'La calidad de las recetas es excepcional. Cada cóctel tiene su historia, técnica y variaciones. Me ha ayudado a crear cócteles únicos que han impresionado a los críticos gastronómicos.',
    experience: '18 años de experiencia'
  },
  {
    id: 6,
    name: 'Isabella Chen',
    role: 'Consultora de Bebidas - Asia Pacific',
    avatar: '/images/avatars/isabella.jpg',
    rating: 5,
    content: 'Como consultora internacional, necesito acceso rápido a información precisa sobre licores globales. Mixology Pro me da exactamente eso, con enlaces a fuentes confiables y datos actualizados.',
    experience: '14 años de experiencia'
  }
]

const stats = [
  { icon: Users, value: '10,000+', label: 'Bartenders Activos' },
  { icon: Star, value: '4.9/5', label: 'Rating Promedio' },
  { icon: Award, value: '500+', label: 'Bares Asociados' }
]

export function Testimonials() {
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
            Lo que dicen los Profesionales
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Más de 10,000 bartenders y mixólogos confían en Mixology Pro para su trabajo diario
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="h-12 w-12 text-primary-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary-600 dark:text-primary-400">
                      {testimonial.experience}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para unirte a la comunidad?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Únete a más de 10,000 bartenders profesionales que ya están usando Mixology Pro 
              para crear experiencias excepcionales.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Comenzar Gratis
              <Star className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

