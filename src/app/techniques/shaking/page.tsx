'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Zap, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Droplets,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Target,
  TrendingUp,
  Users,
  Bookmark,
  Share2,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
  Timer,
  Flame,
  Snowflake,
  Award,
  BookOpen,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Plus,
  Minus,
  Heart
} from 'lucide-react'

const shakingTechniques = [
  {
    name: 'Dry Shake',
    description: 'Agitar sin hielo para emulsificar ingredientes',
    difficulty: 'Principiante',
    time: '10-15 segundos',
    color: 'from-blue-500 to-cyan-500',
    steps: [
      'Añadir todos los ingredientes a la coctelera',
      'Agitar vigorosamente sin hielo',
      'Abrir y añadir hielo',
      'Agitar nuevamente (Wet Shake)',
      'Colar en el vaso servido'
    ],
    uses: ['Clara de huevo', 'Crema', 'Leche', 'Ingredientes espesos'],
    cocktails: ['Ramos Gin Fizz', 'Whiskey Sour', 'Pisco Sour'],
    tips: [
      'Usar para emulsificar claras de huevo',
      'Agitar con fuerza y rapidez',
      'Seguir siempre con un wet shake'
    ]
  },
  {
    name: 'Wet Shake',
    description: 'Agitar con hielo para enfriar y diluir',
    difficulty: 'Principiante',
    time: '10-15 segundos',
    color: 'from-green-500 to-emerald-500',
    steps: [
      'Llenar la coctelera con hielo',
      'Añadir todos los ingredientes',
      'Agitar vigorosamente',
      'Colar en el vaso servido'
    ],
    uses: ['Cócteles clásicos', 'Enfriamiento', 'Dilución'],
    cocktails: ['Daiquiri', 'Margarita', 'Cosmopolitan'],
    tips: [
      'Usar hielo fresco y limpio',
      'Agitar hasta que la coctelera se enfríe',
      'Colar inmediatamente'
    ]
  },
  {
    name: 'Reverse Shake',
    description: 'Técnica invertida para cócteles con crema',
    difficulty: 'Intermedio',
    time: '15-20 segundos',
    color: 'from-purple-500 to-pink-500',
    steps: [
      'Añadir ingredientes líquidos primero',
      'Agitar sin hielo (Dry Shake)',
      'Añadir hielo y agitar (Wet Shake)',
      'Colar en el vaso servido'
    ],
    uses: ['Cócteles con crema', 'Ingredientes espesos', 'Emulsificación'],
    cocktails: ['White Russian', 'Grasshopper', 'Brandy Alexander'],
    tips: [
      'Ideal para cócteles con crema',
      'Mezcla mejor los ingredientes espesos',
      'Crea una textura más suave'
    ]
  },
  {
    name: 'Hard Shake',
    description: 'Agitado vigoroso para cócteles complejos',
    difficulty: 'Avanzado',
    time: '20-30 segundos',
    color: 'from-red-500 to-orange-500',
    steps: [
      'Llenar la coctelera con hielo',
      'Añadir todos los ingredientes',
      'Agitar con movimientos amplios y vigorosos',
      'Cambiar de mano durante el agitado',
      'Colar en el vaso servido'
    ],
    uses: ['Cócteles complejos', 'Múltiples ingredientes', 'Texturas especiales'],
    cocktails: ['Ramos Gin Fizz', 'Clover Club', 'Aviation'],
    tips: [
      'Requiere práctica y fuerza',
      'Movimientos amplios y controlados',
      'Cambiar de mano para mejor mezcla'
    ]
  }
]

const shakingTools = [
  {
    name: 'Boston Shaker',
    description: 'Coctelera de dos piezas, la más versátil',
    icon: Zap,
    pros: ['Versátil', 'Fácil de usar', 'Buena mezcla'],
    cons: ['Requiere práctica', 'Puede ser ruidosa'],
    price: '$15-30',
    brands: ['Koriko', 'Barfly', 'Cocktail Kingdom']
  },
  {
    name: 'Cobbler Shaker',
    description: 'Coctelera de tres piezas con colador integrado',
    icon: Award,
    pros: ['Fácil de usar', 'Colador integrado', 'Silenciosa'],
    cons: ['Menos versátil', 'Mezcla limitada'],
    price: '$20-40',
    brands: ['Barfly', 'Cocktail Kingdom', 'Koriko']
  },
  {
    name: 'French Shaker',
    description: 'Coctelera de dos piezas con tapa',
    icon: Settings,
    pros: ['Elegante', 'Buena mezcla', 'Fácil de limpiar'],
    cons: ['Menos común', 'Precio elevado'],
    price: '$30-60',
    brands: ['Cocktail Kingdom', 'Koriko', 'Barfly']
  }
]

const shakingTips = [
  {
    tip: 'Hielo Fresco',
    description: 'Usar siempre hielo fresco y limpio',
    icon: Snowflake,
    importance: 'Alta',
    details: 'El hielo viejo o sucio puede afectar el sabor del cóctel'
  },
  {
    tip: 'Tiempo de Agitado',
    description: 'Agitar hasta que la coctelera se enfríe',
    icon: Timer,
    importance: 'Alta',
    details: 'Generalmente 10-15 segundos, hasta que sientas el frío en las manos'
  },
  {
    tip: 'Movimiento Circular',
    description: 'Usar movimientos circulares y vigorosos',
    icon: TrendingUp,
    importance: 'Media',
    details: 'Mezcla mejor los ingredientes y crea la dilución correcta'
  },
  {
    tip: 'Colar Inmediatamente',
    description: 'Colar el cóctel inmediatamente después del agitado',
    icon: Droplets,
    importance: 'Alta',
    details: 'Evita la sobre-dilución y mantiene la temperatura correcta'
  }
]

const commonMistakes = [
  {
    mistake: 'Agitar demasiado tiempo',
    description: 'Puede sobre-diluir el cóctel',
    solution: 'Agitar solo hasta que la coctelera se enfríe',
    icon: AlertCircle
  },
  {
    mistake: 'No usar hielo fresco',
    description: 'Afecta el sabor y la textura',
    solution: 'Siempre usar hielo recién hecho',
    icon: Snowflake
  },
  {
    mistake: 'Agitar con poca fuerza',
    description: 'No mezcla bien los ingredientes',
    solution: 'Usar movimientos vigorosos y controlados',
    icon: Zap
  },
  {
    mistake: 'No colar inmediatamente',
    description: 'Sobre-dilución del cóctel',
    solution: 'Colar tan pronto como termine el agitado',
    icon: Clock
  }
]

export default function ShakingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTechnique, setSelectedTechnique] = useState('all')
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredTechniques = shakingTechniques.filter(technique => {
    const matchesSearch = technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTechnique = selectedTechnique === 'all' || technique.name === selectedTechnique
    return matchesSearch && matchesTechnique
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="h-12 w-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Técnicas de Shaking
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Domina el arte del agitado en mixología. Desde el shake básico hasta técnicas avanzadas
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar técnicas de shaking..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shaking Techniques */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Técnicas de Shaking
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada técnica de shaking tiene su propósito específico en mixología
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedTechnique('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTechnique === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              Todas
            </button>
            {shakingTechniques.map((technique) => (
              <button
                key={technique.name}
                onClick={() => setSelectedTechnique(technique.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTechnique === technique.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
              >
                {technique.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTechniques.map((technique, index) => (
              <motion.div
                key={technique.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${technique.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">
                        {technique.name}
                      </h3>
                      <button
                        onClick={() => setExpandedTechnique(expandedTechnique === technique.name ? null : technique.name)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-blue-100 mb-4">
                      {technique.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {technique.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        {technique.difficulty}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Uses */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Usos:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {technique.uses.map((use, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cocktails */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Cócteles:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {technique.cocktails.map((cocktail, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded-full"
                          >
                            {cocktail}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedTechnique === technique.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
                      >
                        {/* Steps */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Pasos:
                          </h4>
                          <ol className="space-y-2">
                            {technique.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-semibold">
                                  {idx + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Tips */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Consejos:
                          </h4>
                          <ul className="space-y-2">
                            {technique.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                        <Play className="h-4 w-4" />
                        Ver Tutorial
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Bookmark className="h-4 w-4" />
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

      {/* Shaking Tools */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Herramientas de Shaking
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las cocteleras y herramientas esenciales para el agitado perfecto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shakingTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
                      {tool.price}
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                          Ventajas:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {tool.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                          Desventajas:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {tool.cons.map((con, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-red-500" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Marcas recomendadas:
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {tool.brands.map((brand, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                          >
                            {brand}
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

      {/* Tips and Common Mistakes */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Consejos Profesionales
              </h2>
              <div className="space-y-6">
                {shakingTips.map((tip, index) => (
                  <div key={tip.tip} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {tip.tip}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {tip.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tip.details}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                          tip.importance === 'Alta' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                          tip.importance === 'Media' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                          'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        }`}>
                          {tip.importance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Common Mistakes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Errores Comunes
              </h2>
              <div className="space-y-6">
                {commonMistakes.map((mistake, index) => (
                  <div key={mistake.mistake} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <mistake.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {mistake.mistake}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {mistake.description}
                        </p>
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                            <strong>Solución:</strong> {mistake.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
