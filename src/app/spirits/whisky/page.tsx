'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wine, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ExternalLink,
  Award,
  Clock,
  TrendingUp,
  ChevronRight,
  Flame,
  BookOpen,
  BarChart3,
  Heart,
  Share2,
  Download
} from 'lucide-react'

const whiskyTypes = [
  {
    name: 'Scotch Whisky',
    description: 'Whisky escocés con denominación de origen',
    count: 45,
    color: 'from-amber-500 to-orange-600',
    subcategories: ['Single Malt', 'Blended', 'Single Grain', 'Blended Malt']
  },
  {
    name: 'Bourbon',
    description: 'Whisky americano de maíz',
    count: 38,
    color: 'from-yellow-500 to-amber-600',
    subcategories: ['Straight Bourbon', 'Wheated Bourbon', 'High Rye Bourbon']
  },
  {
    name: 'Irish Whiskey',
    description: 'Whiskey irlandés triple destilado',
    count: 25,
    color: 'from-green-500 to-emerald-600',
    subcategories: ['Single Malt', 'Single Pot Still', 'Blended', 'Single Grain']
  },
  {
    name: 'Japanese Whisky',
    description: 'Whisky japonés con técnicas escocesas',
    count: 20,
    color: 'from-red-500 to-pink-600',
    subcategories: ['Single Malt', 'Blended', 'Grain Whisky']
  },
  {
    name: 'Rye Whiskey',
    description: 'Whiskey americano de centeno',
    count: 15,
    color: 'from-purple-500 to-indigo-600',
    subcategories: ['Straight Rye', 'Blended Rye', 'Canadian Rye']
  }
]

const featuredWhiskies = [
  {
    id: '1',
    name: 'Macallan 18 Year Old',
    type: 'Single Malt Scotch',
    region: 'Speyside, Escocia',
    abv: 43,
    age: 18,
    price: 450,
    rating: 4.9,
    reviews: 892,
    description: 'Un single malt excepcional con 18 años de añejamiento en barriles de jerez',
    image: '/images/whisky/macallan-18.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Macallan',
    isPremium: true,
    tastingNotes: ['Caramelo', 'Vainilla', 'Frutos secos', 'Especias'],
    awards: ['Gold Medal - International Wine & Spirit Competition']
  },
  {
    id: '2',
    name: 'Pappy Van Winkle 23 Year Old',
    type: 'Bourbon',
    region: 'Kentucky, USA',
    abv: 45.8,
    age: 23,
    price: 2500,
    rating: 4.8,
    reviews: 156,
    description: 'Uno de los bourbons más codiciados del mundo',
    image: '/images/whisky/pappy-van-winkle-23.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Pappy_Van_Winkle',
    isPremium: true,
    tastingNotes: ['Vainilla', 'Caramelo', 'Roble', 'Tabaco'],
    awards: ['Whisky of the Year - Whisky Magazine']
  },
  {
    id: '3',
    name: 'Yamazaki 12 Year Old',
    type: 'Single Malt Japanese',
    region: 'Osaka, Japón',
    abv: 43,
    age: 12,
    price: 120,
    rating: 4.7,
    reviews: 1247,
    description: 'El primer single malt japonés, precursor de la revolución del whisky japonés',
    image: '/images/whisky/yamazaki-12.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Yamazaki_Distillery',
    isPremium: true,
    tastingNotes: ['Miel', 'Frutas', 'Flores', 'Especias suaves'],
    awards: ['Double Gold - San Francisco World Spirits Competition']
  },
  {
    id: '4',
    name: 'Redbreast 21 Year Old',
    type: 'Single Pot Still Irish',
    region: 'Cork, Irlanda',
    abv: 46,
    age: 21,
    price: 180,
    rating: 4.6,
    reviews: 634,
    description: 'Un whiskey irlandés excepcional con triple destilación',
    image: '/images/whisky/redbreast-21.jpg',
    infoUrl: 'https://es.wikipedia.org/wiki/Redbreast_Whiskey',
    isPremium: true,
    tastingNotes: ['Frutos secos', 'Especias', 'Miel', 'Roble'],
    awards: ['Best Irish Whiskey - World Whiskies Awards']
  }
]

const whiskyRegions = [
  {
    name: 'Speyside',
    country: 'Escocia',
    description: 'Región con la mayor concentración de destilerías',
    count: 15,
    characteristics: ['Dulce', 'Frutal', 'Suave'],
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
  },
  {
    name: 'Islay',
    country: 'Escocia',
    description: 'Famosa por sus whiskies ahumados y medicinales',
    count: 8,
    characteristics: ['Ahumado', 'Medicinal', 'Intenso'],
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
  },
  {
    name: 'Kentucky',
    country: 'Estados Unidos',
    description: 'Cuna del bourbon americano',
    count: 12,
    characteristics: ['Dulce', 'Vainilla', 'Caramelo'],
    flag: '🇺🇸'
  },
  {
    name: 'Cork',
    country: 'Irlanda',
    description: 'Tradición de triple destilación',
    count: 6,
    characteristics: ['Suave', 'Frutal', 'Equilibrado'],
    flag: '🇮🇪'
  }
]

const productionSteps = [
  {
    step: 1,
    title: 'Malteado',
    description: 'El grano se germina y se seca para convertir el almidón en azúcares',
    icon: Flame,
    duration: '3-5 días'
  },
  {
    step: 2,
    title: 'Molienda',
    description: 'El grano malteado se muele para crear la harina',
    icon: BarChart3,
    duration: '1-2 horas'
  },
  {
    step: 3,
    title: 'Maceración',
    description: 'Se mezcla con agua caliente para extraer los azúcares',
    icon: Clock,
    duration: '4-6 horas'
  },
  {
    step: 4,
    title: 'Fermentación',
    description: 'Se añade levadura para convertir azúcares en alcohol',
    icon: TrendingUp,
    duration: '2-4 días'
  },
  {
    step: 5,
    title: 'Destilación',
    description: 'Se destila el mosto para concentrar el alcohol',
    icon: Award,
    duration: '6-8 horas'
  },
  {
    step: 6,
    title: 'Añejamiento',
    description: 'Se envejece en barriles de roble para desarrollar el sabor',
    icon: Wine,
    duration: '3-25+ años'
  }
]

export default function WhiskyPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredWhiskies = featuredWhiskies.filter(whisky => {
    const matchesSearch = whisky.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         whisky.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         whisky.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || whisky.type.includes(selectedType)
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Wine className="h-12 w-12 text-amber-600" />
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Whisky
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              El rey de los destilados. Explora el mundo del whisky con información detallada sobre regiones, marcas y técnicas de producción
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar whiskies, marcas, regiones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Whisky Types */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tipos de Whisky
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada tipo de whisky tiene sus propias características y métodos de producción únicos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whiskyTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {type.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {type.description}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {type.count}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        whiskies
                      </span>
                    </div>

                    {/* Subcategories */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Variedades:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {type.subcategories.map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded-full"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Explorar whiskies
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Whiskies */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Whiskies Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los whiskies más prestigiosos y mejor valorados del mundo
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'
              }`}
            >
              Todos
            </button>
            {whiskyTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type.name
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Whiskies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredWhiskies.map((whisky, index) => (
              <motion.div
                key={whisky.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <Wine className="h-16 w-16 text-amber-600 dark:text-amber-400" />
                    </div>
                    
                    {/* Premium Badge */}
                    {whisky.isPremium && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Age Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full">
                        {whisky.age} años
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {whisky.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {whisky.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {whisky.type}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4" />
                        {whisky.region}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        {whisky.abv}% ABV
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {whisky.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Notas de Cata:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {whisky.tastingNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${whisky.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {whisky.reviews} reviews
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href={whisky.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Más Info
                      </a>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <BookOpen className="h-4 w-4" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Proceso de Producción
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre cómo se crea el whisky desde el grano hasta la botella
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 font-medium">
                    <Clock className="h-4 w-4" />
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Regiones del Whisky
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada región tiene sus propias características y tradiciones únicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whiskyRegions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:scale-105">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{region.flag}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {region.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {region.country}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {region.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {region.count}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        destilerías
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Características:
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {region.characteristics.map((char, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded-full"
                          >
                            {char}
                          </span>
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
