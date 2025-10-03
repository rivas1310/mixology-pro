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
  ExternalLink
} from 'lucide-react'

const beerCategories = [
  {
    id: 'lagers',
    name: 'Lagers',
    icon: Wine,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    description: 'Cervezas doradas, refrescantes y fáciles de beber',
    count: 25,
    examples: ['Pilsner', 'Helles', 'Dunkel', 'Bock'],
    characteristics: ['Dorada', 'Refrescante', 'Ligera', 'Cristalina']
  },
  {
    id: 'ales',
    name: 'Ales',
    icon: Star,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Cervezas con más cuerpo y sabor, fermentación alta',
    count: 30,
    examples: ['IPA', 'Pale Ale', 'Stout', 'Porter'],
    characteristics: ['Cuerpo', 'Aromática', 'Compleja', 'Sabrosa']
  },
  {
    id: 'wheat',
    name: 'Trigo',
    icon: Droplets,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Cervezas de trigo, suaves y refrescantes',
    count: 15,
    examples: ['Hefeweizen', 'Witbier', 'Weissbier', 'American Wheat'],
    characteristics: ['Suave', 'Refrescante', 'Frutal', 'Espumosa']
  },
  {
    id: 'specialty',
    name: 'Especiales',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
    description: 'Cervezas artesanales y de temporada',
    count: 20,
    examples: ['Sour', 'Barrel Aged', 'Imperial', 'Fruit Beer'],
    characteristics: ['Artesanal', 'Única', 'Compleja', 'Limitada']
  }
]

const featuredBeers = [
  {
    id: 'corona-extra',
    name: 'Corona Extra',
    type: 'Lager',
    abv: 4.5,
    ibu: 18,
    description: 'La cerveza mexicana más popular del mundo',
    image: '/images/beers/corona-extra.jpg',
    origin: 'México',
    brewery: 'Grupo Modelo',
    rating: 4.2,
    reviews: 15420,
    price: '$2.50',
    characteristics: ['Refrescante', 'Ligera', 'Dorada', 'Cítrica'],
    foodPairing: ['Tacos', 'Pescado', 'Lima', 'Mariscos']
  },
  {
    id: 'guinness',
    name: 'Guinness Draught',
    type: 'Stout',
    abv: 4.2,
    ibu: 45,
    description: 'La stout irlandesa más famosa del mundo',
    image: '/images/beers/guinness.jpg',
    origin: 'Irlanda',
    brewery: 'Guinness',
    rating: 4.6,
    reviews: 8920,
    price: '$3.20',
    characteristics: ['Cremosa', 'Oscura', 'Robusta', 'Espumosa'],
    foodPairing: ['Carne', 'Chocolate', 'Ostras', 'Quesos']
  },
  {
    id: 'heineken',
    name: 'Heineken',
    type: 'Lager',
    abv: 5.0,
    ibu: 23,
    description: 'Cerveza holandesa premium, suave y refrescante',
    image: '/images/beers/heineken.jpg',
    origin: 'Holanda',
    brewery: 'Heineken',
    rating: 4.1,
    reviews: 12350,
    price: '$2.80',
    characteristics: ['Suave', 'Dorada', 'Refrescante', 'Premium'],
    foodPairing: ['Pizza', 'Pasta', 'Aperitivos', 'Quesos suaves']
  },
  {
    id: 'stella-artois',
    name: 'Stella Artois',
    type: 'Lager',
    abv: 5.0,
    ibu: 20,
    description: 'Cerveza belga premium, elegante y refinada',
    image: '/images/beers/stella-artois.jpg',
    origin: 'Bélgica',
    brewery: 'AB InBev',
    rating: 4.3,
    reviews: 9870,
    price: '$3.00',
    characteristics: ['Elegante', 'Refinada', 'Dorada', 'Suave'],
    foodPairing: ['Mariscos', 'Pescado', 'Ensaladas', 'Aperitivos']
  }
]

const beerStyles = [
  {
    style: 'Lager',
    description: 'Fermentación baja, sabor limpio y refrescante',
    temperature: '2-4°C',
    glass: 'Vaso alto',
    icon: Wine,
    color: 'from-amber-500 to-yellow-500'
  },
  {
    style: 'Ale',
    description: 'Fermentación alta, más cuerpo y sabor',
    temperature: '4-7°C',
    glass: 'Copa tulipán',
    icon: Star,
    color: 'from-orange-500 to-red-500'
  },
  {
    style: 'Stout',
    description: 'Cerveza oscura, robusta y cremosa',
    temperature: '6-8°C',
    glass: 'Copa stout',
    icon: Award,
    color: 'from-gray-600 to-black'
  },
  {
    style: 'IPA',
    description: 'Amarga, aromática y con mucho lúpulo',
    temperature: '4-6°C',
    glass: 'Copa IPA',
    icon: Zap,
    color: 'from-orange-400 to-amber-500'
  }
]

export function BeerShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cervezas del Mundo
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubre las mejores cervezas artesanales y comerciales del mundo
          </p>
        </motion.div>

        {/* Beer Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {beerCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <a
                href={`/beers/${category.id}`}
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
                        cervezas
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
                          className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded"
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
                      Ver cervezas
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Featured Beers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Cervezas Destacadas
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Las cervezas más populares y mejor valoradas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredBeers.map((beer, index) => (
            <motion.div
              key={beer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Image */}
                <a href={`/beers/${beer.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Wine className="h-16 w-16 text-amber-600 dark:text-amber-400" />
                    </div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                        {beer.type}
                      </span>
                    </div>

                    {/* ABV Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {beer.abv}% ABV
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
                  <a href={`/beers/${beer.id}`} className="block">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {beer.name}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {beer.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {beer.origin}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        {beer.ibu} IBU
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        {beer.rating} ({beer.reviews} reviews)
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {beer.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {beer.brewery}
                      </span>
                    </div>
                  </a>

                  {/* Characteristics */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Características:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {beer.characteristics.slice(0, 3).map((char, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded"
                        >
                          {char}
                        </span>
                      ))}
                      {beer.characteristics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                          +{beer.characteristics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`/beers/${beer.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
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

        {/* Beer Styles Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Guía de Estilos de Cerveza
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aprende sobre los diferentes estilos y cómo servirlos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beerStyles.map((style, index) => (
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
