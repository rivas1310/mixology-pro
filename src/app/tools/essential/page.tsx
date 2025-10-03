'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Wrench, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Droplets,
  Zap,
  Award,
  BookOpen,
  BarChart3,
  ExternalLink,
  ChevronRight,
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
  Heart,
  Leaf,
  Wine,
  Sparkles,
  ShoppingCart,
  DollarSign,
  Shield,
  Package,
  Wrench as WrenchIcon,
  Clock as ClockIcon,
  Award as AwardIcon,
  BookOpen as BookOpenIcon
} from 'lucide-react'

const essentialTools = [
  {
    name: 'Boston Shaker',
    description: 'La coctelera más versátil y profesional',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    price: '$15-50',
    brands: ['Koriko', 'Barfly', 'Cocktail Kingdom'],
    features: ['Doble pared', 'Fácil separación', 'Buena mezcla', 'Durabilidad'],
    pros: ['Versátil', 'Duradera', 'Buena mezcla', 'Fácil de usar'],
    cons: ['Requiere práctica', 'Puede ser ruidosa'],
    maintenance: 'Lavar con agua caliente y secar inmediatamente',
    warranty: '2 años',
    availability: 'Disponible',
    rating: 4.9,
    reviews: 1247,
    isEssential: true
  },
  {
    name: 'Bar Spoon',
    description: 'Cuchara de bar profesional con espiral',
    icon: Clock,
    color: 'from-amber-500 to-orange-500',
    price: '$8-25',
    brands: ['Cocktail Kingdom', 'Barfly', 'Koriko'],
    features: ['12 pulgadas', 'Espiral decorativa', 'Disco medidor', 'Acero inoxidable'],
    pros: ['Versátil', 'Duradera', 'Buena mezcla', 'Diseño clásico'],
    cons: ['Precio elevado', 'Requiere cuidado'],
    maintenance: 'Lavar a mano, secar inmediatamente',
    warranty: '1 año',
    availability: 'Disponible',
    rating: 4.8,
    reviews: 892,
    isEssential: true
  },
  {
    name: 'Hawthorne Strainer',
    description: 'Colador profesional con resorte',
    icon: Award,
    color: 'from-green-500 to-emerald-500',
    price: '$8-20',
    brands: ['Barfly', 'Cocktail Kingdom', 'Koriko'],
    features: ['Resorte ajustable', 'Filtro fino', 'Mango ergonómico', 'Acero inoxidable'],
    pros: ['Filtra bien', 'Fácil de usar', 'Duradera', 'Versátil'],
    cons: ['Puede atascarse', 'Requiere limpieza'],
    maintenance: 'Limpiar con cepillo después de cada uso',
    warranty: '1 año',
    availability: 'Disponible',
    rating: 4.7,
    reviews: 2156,
    isEssential: true
  },
  {
    name: 'Japanese Jigger',
    description: 'Medidor de precisión japonesa',
    icon: BarChart3,
    color: 'from-purple-500 to-indigo-500',
    price: '$15-35',
    brands: ['Cocktail Kingdom', 'Koriko', 'Barfly'],
    features: ['Medidas internas', 'Precisión milimétrica', 'Fácil lectura', 'Diseño ergonómico'],
    pros: ['Precisión', 'Fácil de usar', 'Duradera', 'Diseño elegante'],
    cons: ['Precio elevado', 'Requiere cuidado'],
    maintenance: 'Lavar a mano, no usar lavavajillas',
    warranty: '1 año',
    availability: 'Disponible',
    rating: 4.6,
    reviews: 1456,
    isEssential: true
  },
  {
    name: 'Muddler',
    description: 'Herramienta para extraer sabores',
    icon: WrenchIcon,
    color: 'from-red-500 to-pink-500',
    price: '$10-30',
    brands: ['Cocktail Kingdom', 'Barfly', 'Koriko'],
    features: ['Madera o acero', 'Diseño ergonómico', 'Fácil limpieza', 'Durabilidad'],
    pros: ['Versátil', 'Duradera', 'Fácil de usar', 'Buena extracción'],
    cons: ['Puede manchar', 'Requiere cuidado'],
    maintenance: 'Lavar a mano, secar completamente',
    warranty: '1 año',
    availability: 'Disponible',
    rating: 4.5,
    reviews: 1234,
    isEssential: true
  },
  {
    name: 'Fine Strainer',
    description: 'Colador fino para cócteles claros',
    icon: Droplets,
    color: 'from-teal-500 to-cyan-500',
    price: '$5-15',
    brands: ['Barfly', 'Cocktail Kingdom', 'Koriko'],
    features: ['Malla fina', 'Mango ergonómico', 'Fácil limpieza', 'Acero inoxidable'],
    pros: ['Filtra bien', 'Fácil de usar', 'Duradera', 'Versátil'],
    cons: ['Puede atascarse', 'Requiere limpieza'],
    maintenance: 'Limpiar con cepillo después de cada uso',
    warranty: '1 año',
    availability: 'Disponible',
    rating: 4.4,
    reviews: 987,
    isEssential: false
  },
  {
    name: 'Julep Strainer',
    description: 'Colador para cócteles con hielo',
    icon: Snowflake,
    color: 'from-cyan-500 to-blue-500',
    price: '$8-18',
    brands: ['Cocktail Kingdom', 'Barfly', 'Koriko'],
    features: ['Diseño clásico', 'Fácil uso', 'Durabilidad', 'Acero inoxidable'],
    pros: ['Fácil de usar', 'Duradera', 'Diseño clásico', 'Versátil'],
    cons: ['Limitado', 'Precio elevado'],
    maintenance: 'Lavar a mano, secar inmediatamente',
    warranty: '1 año',
    availability: 'Disponible',
    rating: 4.3,
    reviews: 756,
    isEssential: false
  },
  {
    name: 'Pour Spouts',
    description: 'Picos de vertido para botellas',
    icon: Droplets,
    color: 'from-indigo-500 to-purple-500',
    price: '$3-12',
    brands: ['Barfly', 'Cocktail Kingdom', 'Koriko'],
    features: ['Fácil instalación', 'Control de flujo', 'Durabilidad', 'Limpieza fácil'],
    pros: ['Fácil de usar', 'Control preciso', 'Duradera', 'Económica'],
    cons: ['Puede perderse', 'Requiere limpieza'],
    maintenance: 'Limpiar regularmente, reemplazar si se daña',
    warranty: '6 meses',
    availability: 'Disponible',
    rating: 4.2,
    reviews: 543,
    isEssential: false
  }
]

const toolTypes = [
  {
    name: 'Cocteleras',
    description: 'Herramientas para agitar cócteles',
    count: 3,
    color: 'from-blue-500 to-cyan-500',
    examples: ['Boston Shaker', 'Cobbler Shaker', 'French Shaker'],
    characteristics: ['Versátiles', 'Duraderas', 'Buena mezcla']
  },
  {
    name: 'Cucharas',
    description: 'Herramientas para mezclar cócteles',
    count: 2,
    color: 'from-amber-500 to-orange-500',
    examples: ['Bar Spoon', 'Muddler Spoon'],
    characteristics: ['Precisas', 'Duraderas', 'Versátiles']
  },
  {
    name: 'Coladores',
    description: 'Herramientas para filtrar cócteles',
    count: 3,
    color: 'from-green-500 to-emerald-500',
    examples: ['Hawthorne Strainer', 'Fine Strainer', 'Julep Strainer'],
    characteristics: ['Eficientes', 'Fáciles de usar', 'Duraderas']
  },
  {
    name: 'Medidores',
    description: 'Herramientas para medir ingredientes',
    count: 2,
    color: 'from-purple-500 to-indigo-500',
    examples: ['Japanese Jigger', 'Measuring Cup'],
    characteristics: ['Precisos', 'Fáciles de usar', 'Duraderos']
  }
]

const maintenanceGuide = [
  {
    step: 1,
    title: 'Limpieza Diaria',
    description: 'Lavar todas las herramientas después de cada uso',
    icon: Clock,
    time: '5-10 min',
    frequency: 'Después de cada uso',
    details: 'Usar agua caliente y jabón suave, secar inmediatamente'
  },
  {
    step: 2,
    title: 'Limpieza Profunda',
    description: 'Limpieza semanal con productos especializados',
    icon: Settings,
    time: '15-30 min',
    frequency: 'Semanal',
    details: 'Usar limpiadores específicos para acero inoxidable'
  },
  {
    step: 3,
    title: 'Almacenamiento',
    description: 'Guardar en lugar seco y ventilado',
    icon: Package,
    time: '2-5 min',
    frequency: 'Siempre',
    details: 'Evitar humedad y cambios de temperatura extremos'
  },
  {
    step: 4,
    title: 'Inspección',
    description: 'Revisar herramientas regularmente',
    icon: CheckCircle,
    time: '10-15 min',
    frequency: 'Mensual',
    details: 'Verificar desgaste, corrosión y funcionamiento'
  }
]

const buyingGuide = [
  {
    tip: 'Calidad vs Precio',
    description: 'Invierte en herramientas de calidad que duren años',
    icon: DollarSign,
    importance: 'Alta',
    details: 'Las herramientas baratas se rompen fácilmente y afectan la calidad del cóctel'
  },
  {
    tip: 'Marcas Confiables',
    description: 'Elige marcas reconocidas en el mercado',
    icon: Shield,
    importance: 'Alta',
    details: 'Koriko, Cocktail Kingdom, y Barfly son marcas confiables'
  },
  {
    tip: 'Garantía',
    description: 'Verifica la garantía antes de comprar',
    icon: Award,
    importance: 'Media',
    details: 'Una buena garantía indica confianza en el producto'
  },
  {
    tip: 'Reseñas',
    description: 'Lee reseñas de otros bartenders',
    icon: Star,
    importance: 'Media',
    details: 'Las reseñas te ayudan a conocer la experiencia real de otros usuarios'
  }
]

export default function EssentialToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [expandedTool, setExpandedTool] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredTools = essentialTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.brands.some(brand => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || tool.name.includes(selectedType)
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <WrenchIcon className="h-12 w-12 text-green-600" />
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Herramientas Esenciales
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Las herramientas fundamentales que todo bartender debe tener. Desde lo básico hasta lo profesional
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar herramientas esenciales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Types */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tipos de Herramientas Esenciales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada tipo de herramienta tiene su propósito específico en la mixología
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {type.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {type.description}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {type.count}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        herramientas
                      </span>
                    </div>

                    {/* Examples */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Ejemplos:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {type.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Characteristics */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Características:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {type.characteristics.map((char, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Ver herramientas
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Tools */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Herramientas Esenciales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las herramientas fundamentales que todo bartender debe tener
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`}
            >
              Todas
            </button>
            {toolTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type.name
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30" />
                    <div className="w-full h-full flex items-center justify-center">
                      <WrenchIcon className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                    
                    {/* Essential Badge */}
                    {tool.isEssential && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Esencial
                        </span>
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                        {tool.price}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        {tool.rating}
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
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {tool.name}
                      </h3>
                      <button
                        onClick={() => setExpandedTool(expandedTool === tool.name ? null : tool.name)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Award className="h-4 w-4" />
                        {tool.brands[0]}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <BarChart3 className="h-4 w-4" />
                        {tool.rating} ({tool.reviews} reviews)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Shield className="h-4 w-4" />
                        {tool.warranty}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Características:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {tool.features.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            +{tool.features.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded Info */}
                    {expandedTool === tool.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                      >
                        {/* Pros and Cons */}
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
                              Ventajas:
                            </p>
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
                            <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-2">
                              Desventajas:
                            </p>
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

                        {/* Maintenance */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Mantenimiento:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tool.maintenance}
                          </p>
                        </div>

                        {/* Brands */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Marcas:
                          </p>
                          <div className="flex flex-wrap gap-1">
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
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                        <ShoppingCart className="h-4 w-4" />
                        Comprar
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Guide */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guía de Mantenimiento
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mantén tus herramientas esenciales en perfecto estado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceGuide.map((step, index) => (
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
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {step.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      {step.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Target className="h-4 w-4" />
                      {step.frequency}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {step.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guía de Compra
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Consejos para elegir las mejores herramientas esenciales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {buyingGuide.map((tip, index) => (
              <motion.div
                key={tip.tip}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <tip.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {tip.tip}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {tip.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-3">
                    <Award className="h-4 w-4" />
                    {tip.importance}
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tip.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
