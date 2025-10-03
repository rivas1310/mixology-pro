'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wine, 
  Star, 
  Clock, 
  Award,
  ChevronRight,
  Zap,
  Flame,
  Droplets,
  Heart,
  BookOpen,
  BarChart3,
  ExternalLink,
  Grape,
  Leaf,
  Sparkles
} from 'lucide-react'

const wineCategories = [
  {
    id: 'red-wines',
    name: 'Vinos Tintos',
    icon: Wine,
    color: 'from-red-600 to-red-800',
    bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
    description: 'Vinos robustos, complejos y con cuerpo',
    count: 35,
    examples: ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Malbec'],
    characteristics: ['Robusto', 'Complejo', 'Tánico', 'Cuerpo']
  },
  {
    id: 'white-wines',
    name: 'Vinos Blancos',
    icon: Droplets,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Vinos frescos, ligeros y aromáticos',
    count: 30,
    examples: ['Chardonnay', 'Sauvignon Blanc', 'Riesling', 'Pinot Grigio'],
    characteristics: ['Fresco', 'Ligero', 'Aromático', 'Ácido']
  },
  {
    id: 'rose-wines',
    name: 'Vinos Rosados',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    description: 'Vinos elegantes, versátiles y refrescantes',
    count: 15,
    examples: ['Provence Rosé', 'Pinot Noir Rosé', 'Grenache Rosé', 'Sangiovese Rosé'],
    characteristics: ['Elegante', 'Versátil', 'Refrescante', 'Frutal']
  },
  {
    id: 'sparkling-wines',
    name: 'Vinos Espumosos',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    description: 'Vinos con burbujas, festivos y elegantes',
    count: 20,
    examples: ['Champagne', 'Prosecco', 'Cava', 'Cremant'],
    characteristics: ['Festivo', 'Elegante', 'Burbujas', 'Refrescante']
  }
]

const featuredWines = [
  {
    id: 'champagne-dom-perignon',
    name: 'Dom Pérignon',
    type: 'Champagne',
    vintage: '2015',
    abv: 12.5,
    description: 'El champagne más prestigioso del mundo',
    image: '/images/wines/dom-perignon.jpg',
    origin: 'Champagne, Francia',
    winery: 'Moët & Chandon',
    rating: 4.9,
    reviews: 2840,
    price: '$250.00',
    characteristics: ['Prestigioso', 'Elegante', 'Complejo', 'Lujoso'],
    foodPairing: ['Ostras', 'Caviar', 'Foie Gras', 'Trufas']
  },
  {
    id: 'cabernet-sauvignon-napa',
    name: 'Caymus Cabernet Sauvignon',
    type: 'Tinto',
    vintage: '2020',
    abv: 14.5,
    description: 'Cabernet Sauvignon de Napa Valley, robusto y elegante',
    image: '/images/wines/caymus-cabernet.jpg',
    origin: 'Napa Valley, California',
    winery: 'Caymus Vineyards',
    rating: 4.7,
    reviews: 1920,
    price: '$85.00',
    characteristics: ['Robusto', 'Tánico', 'Frutal', 'Elegante'],
    foodPairing: ['Carne roja', 'Cordero', 'Quesos curados', 'Chocolate']
  },
  {
    id: 'chardonnay-burgundy',
    name: 'Chardonnay de Burgundy',
    type: 'Blanco',
    vintage: '2021',
    abv: 13.0,
    description: 'Chardonnay clásico de la región de Burgundy',
    image: '/images/wines/burgundy-chardonnay.jpg',
    origin: 'Burgundy, Francia',
    winery: 'Domaine Leflaive',
    rating: 4.6,
    reviews: 1560,
    price: '$120.00',
    characteristics: ['Mineral', 'Elegante', 'Complejo', 'Refinado'],
    foodPairing: ['Pescado', 'Mariscos', 'Pollo', 'Quesos suaves']
  },
  {
    id: 'prosecco-italy',
    name: 'Prosecco Superiore',
    type: 'Espumoso',
    vintage: '2022',
    abv: 11.5,
    description: 'Prosecco italiano fresco y festivo',
    image: '/images/wines/prosecco-superiore.jpg',
    origin: 'Veneto, Italia',
    winery: 'Bottega',
    rating: 4.4,
    reviews: 3240,
    price: '$25.00',
    characteristics: ['Fresco', 'Frutal', 'Ligero', 'Festivo'],
    foodPairing: ['Aperitivos', 'Pasta', 'Pizza', 'Postres']
  }
]

const wineRegions = [
  {
    region: 'Bordeaux',
    country: 'Francia',
    description: 'La región más prestigiosa del mundo',
    icon: Star,
    color: 'from-red-600 to-red-800',
    famousWines: ['Château Margaux', 'Château Latour', 'Château Lafite']
  },
  {
    region: 'Napa Valley',
    country: 'Estados Unidos',
    description: 'El corazón del vino californiano',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    famousWines: ['Caymus', 'Opus One', 'Screaming Eagle']
  },
  {
    region: 'Tuscany',
    country: 'Italia',
    description: 'La cuna del vino italiano',
    icon: Grape,
    color: 'from-green-600 to-emerald-700',
    famousWines: ['Chianti Classico', 'Brunello di Montalcino', 'Super Tuscan']
  },
  {
    region: 'Rioja',
    country: 'España',
    description: 'La joya del vino español',
    icon: Award,
    color: 'from-amber-600 to-orange-700',
    famousWines: ['Marqués de Riscal', 'Vega Sicilia', 'La Rioja Alta']
  }
]

const wineStyles = [
  {
    style: 'Tinto',
    description: 'Vinos con piel de uva, robustos y tánicos',
    temperature: '16-18°C',
    glass: 'Copa Bordeaux',
    icon: Wine,
    color: 'from-red-600 to-red-800'
  },
  {
    style: 'Blanco',
    description: 'Vinos sin piel, frescos y aromáticos',
    temperature: '8-12°C',
    glass: 'Copa Chardonnay',
    icon: Droplets,
    color: 'from-yellow-400 to-amber-500'
  },
  {
    style: 'Rosado',
    description: 'Vinos con contacto mínimo con piel',
    temperature: '10-14°C',
    glass: 'Copa Rosé',
    icon: Heart,
    color: 'from-pink-400 to-rose-500'
  },
  {
    style: 'Espumoso',
    description: 'Vinos con burbujas de dióxido de carbono',
    temperature: '6-8°C',
    glass: 'Copa Flute',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600'
  }
]

export function WineShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vinos del Mundo
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubre los mejores vinos de las regiones más prestigiosas del mundo
          </p>
        </motion.div>

        {/* Wine Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {wineCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <a
                href={`/wines/${category.id}`}
                className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer block`}
              >
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.count}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        vinos
                      </div>
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Características:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {category.characteristics.map((char, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Ejemplos:
                    </p>
                    <div className="space-y-1">
                      {category.examples.map((example, idx) => (
                        <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">{example}</p>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Ver vinos
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Featured Wines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Vinos Destacados
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Los vinos más prestigiosos y mejor valorados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredWines.map((wine, index) => (
            <motion.div
              key={wine.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Image */}
                <a href={`/wines/${wine.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-purple-100 dark:from-red-900/30 dark:to-purple-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Wine className="h-16 w-16 text-red-600 dark:text-red-400" />
                    </div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        {wine.type}
                      </span>
                    </div>

                    {/* Vintage Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {wine.vintage}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </a>

                {/* Content */}
                <div className="p-6">
                  <a href={`/wines/${wine.id}`} className="block">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {wine.name}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {wine.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {wine.origin}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        {wine.abv}% ABV
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {wine.rating} ({wine.reviews} reviews)
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-red-600 dark:text-red-400">
                        {wine.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {wine.winery}
                      </span>
                    </div>
                  </a>

                  {/* Characteristics */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Características:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {wine.characteristics.slice(0, 3).map((char, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded"
                        >
                          {char}
                        </span>
                      ))}
                      {wine.characteristics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                          +{wine.characteristics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`/wines/${wine.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <BookOpen className="h-4 w-4" />
                      Ver Detalles
                    </a>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wine Regions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Regiones Vinícolas
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Las regiones más prestigiosas del mundo del vino
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {wineRegions.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${region.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <region.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {region.region}
                  </h4>
                  
                  <p className="text-red-600 dark:text-red-400 text-sm font-semibold mb-2">
                    {region.country}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {region.description}
                  </p>
                  
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Vinos Famosos:
                    </p>
                    <div className="space-y-1">
                      {region.famousWines.map((wine, idx) => (
                        <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">{wine}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wine Styles Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Guía de Estilos de Vino
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aprende sobre los diferentes estilos y cómo servirlos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wineStyles.map((style, index) => (
            <motion.div
              key={style.style}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${style.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <style.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {style.style}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {style.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      {style.temperature}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {style.glass}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
