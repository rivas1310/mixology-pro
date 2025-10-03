'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wine, 
  Zap, 
  Droplets, 
  Flame,
  ExternalLink,
  Star,
  MapPin
} from 'lucide-react'

const spiritCategories = [
  {
    id: 'whisky',
    name: 'Whisky',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    description: 'El rey de los destilados',
    subcategories: [
      {
        name: 'Scotch Whisky',
        brands: [
          { name: 'Johnnie Walker', url: 'https://es.wikipedia.org/wiki/Johnnie_Walker', region: 'Escocia' },
          { name: 'Chivas Regal', url: 'https://es.wikipedia.org/wiki/Chivas_Regal', region: 'Escocia' },
          { name: 'Macallan', url: 'https://es.wikipedia.org/wiki/Macallan', region: 'Escocia' },
          { name: 'Glenfiddich', url: 'https://es.wikipedia.org/wiki/Glenfiddich', region: 'Escocia' }
        ]
      },
      {
        name: 'Bourbon',
        brands: [
          { name: 'Jack Daniel\'s', url: 'https://es.wikipedia.org/wiki/Jack_Daniels', region: 'Tennessee' },
          { name: 'Jim Beam', url: 'https://es.wikipedia.org/wiki/Jim_Beam', region: 'Kentucky' },
          { name: 'Woodford Reserve', url: 'https://es.wikipedia.org/wiki/Woodford_Reserve', region: 'Kentucky' },
          { name: 'Maker\'s Mark', url: 'https://es.wikipedia.org/wiki/Maker%27s_Mark', region: 'Kentucky' }
        ]
      }
    ]
  },
  {
    id: 'tequila',
    name: 'Tequila',
    icon: Flame,
    color: 'from-green-500 to-yellow-600',
    description: 'El espíritu de México',
    subcategories: [
      {
        name: 'Premium',
        brands: [
          { name: 'Don Julio', url: 'https://es.wikipedia.org/wiki/Don_Julio', region: 'Jalisco' },
          { name: 'Patrón', url: 'https://es.wikipedia.org/wiki/Patrón', region: 'Jalisco' },
          { name: 'Herradura', url: 'https://es.wikipedia.org/wiki/Herradura', region: 'Jalisco' },
          { name: 'Casa Noble', url: 'https://es.wikipedia.org/wiki/Casa_Noble', region: 'Jalisco' }
        ]
      },
      {
        name: 'Reposado',
        brands: [
          { name: 'José Cuervo', url: 'https://es.wikipedia.org/wiki/José_Cuervo', region: 'Jalisco' },
          { name: 'Sauza', url: 'https://es.wikipedia.org/wiki/Sauza', region: 'Jalisco' },
          { name: '1800', url: 'https://es.wikipedia.org/wiki/1800_Tequila', region: 'Jalisco' }
        ]
      }
    ]
  },
  {
    id: 'vodka',
    name: 'Vodka',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    description: 'Pureza y versatilidad',
    subcategories: [
      {
        name: 'Premium',
        brands: [
          { name: 'Grey Goose', url: 'https://es.wikipedia.org/wiki/Grey_Goose', region: 'Francia' },
          { name: 'Absolut', url: 'https://es.wikipedia.org/wiki/Absolut', region: 'Suecia' },
          { name: 'Beluga', url: 'https://es.wikipedia.org/wiki/Beluga', region: 'Rusia' },
          { name: 'Ketel One', url: 'https://es.wikipedia.org/wiki/Ketel_One', region: 'Países Bajos' }
        ]
      }
    ]
  },
  {
    id: 'rum',
    name: 'Ron',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    description: 'El sabor del Caribe',
    subcategories: [
      {
        name: 'Premium',
        brands: [
          { name: 'Bacardi', url: 'https://es.wikipedia.org/wiki/Bacardi', region: 'Cuba' },
          { name: 'Havana Club', url: 'https://es.wikipedia.org/wiki/Havana_Club', region: 'Cuba' },
          { name: 'Captain Morgan', url: 'https://es.wikipedia.org/wiki/Captain_Morgan', region: 'Jamaica' },
          { name: 'Mount Gay', url: 'https://es.wikipedia.org/wiki/Mount_Gay', region: 'Barbados' }
        ]
      }
    ]
  }
]

export function SpiritsShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Guía Completa de Licores
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explora las mejores marcas y destilados del mundo con información detallada y enlaces informativos
          </p>
        </motion.div>

        <div className="space-y-16">
          {spiritCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.color} p-8 text-white`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <category.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{category.name}</h3>
                    <p className="text-white/90">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {subcategory.name}
                    </h4>
                    
                    <div className="space-y-3">
                      {subcategory.brands.map((brand, brandIndex) => (
                        <motion.div
                          key={brandIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: (categoryIndex * 0.2) + (subIndex * 0.1) + (brandIndex * 0.05) }}
                          className="group"
                        >
                          <a
                            href={brand.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 group-hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg flex items-center justify-center">
                                <Wine className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                  {brand.name}
                                </h5>
                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                  <MapPin className="h-3 w-3" />
                                  {brand.region}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                            </div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas más información?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Nuestra base de datos incluye más de 1000 licores y destilados con información detallada, 
              maridajes recomendados y técnicas de servicio.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Explorar Base de Datos Completa
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

