'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Star, 
  Search, 
  Filter, 
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
  BookOpen as BookOpenIcon,
  Wine as WineIcon,
  Droplets as DropletsIcon,
  Zap as ZapIcon,
  Star as StarIcon
} from 'lucide-react'

const tropicalCategories = [
  {
    name: 'Tiki Classics',
    description: 'Los cócteles tiki más famosos y auténticos',
    icon: Flame,
    color: 'from-orange-500 to-red-500',
    count: 12,
    difficulty: 'Intermedio',
    time: '6-10 min',
    characteristics: ['Exótico', 'Complejo', 'Aromático', 'Tradicional'],
    examples: ['Mai Tai', 'Zombie', 'Navy Grog', 'Fog Cutter']
  },
  {
    name: 'Caribeños',
    description: 'Cócteles del Caribe, frescos y tropicales',
    icon: DropletsIcon,
    color: 'from-blue-500 to-cyan-500',
    count: 15,
    difficulty: 'Fácil',
    time: '4-7 min',
    characteristics: ['Refrescante', 'Frutal', 'Ligero', 'Veraniego'],
    examples: ['Piña Colada', 'Mojito', 'Cuba Libre', 'Daiquiri']
  },
  {
    name: 'Hawaianos',
    description: 'Cócteles inspirados en las islas hawaianas',
    icon: StarIcon,
    color: 'from-yellow-500 to-orange-500',
    count: 8,
    difficulty: 'Fácil',
    time: '3-6 min',
    characteristics: ['Tropical', 'Colorido', 'Dulce', 'Frutal'],
    examples: ['Blue Hawaiian', 'Hawaiian Sunset', 'Tropical Breeze', 'Island Punch']
  },
  {
    name: 'Modernos',
    description: 'Cócteles tropicales con toque contemporáneo',
    icon: ZapIcon,
    color: 'from-purple-500 to-pink-500',
    count: 10,
    difficulty: 'Intermedio',
    time: '5-8 min',
    characteristics: ['Innovador', 'Equilibrado', 'Elegante', 'Único'],
    examples: ['Tropical Martini', 'Coconut Old Fashioned', 'Passion Fruit Sour', 'Mango Margarita']
  }
]

const featuredTropicalCocktails = [
  {
    id: '1',
    name: 'Mai Tai',
    type: 'Tiki Classic',
    difficulty: 'Intermedio',
    time: '6 min',
    abv: 22,
    description: 'El cóctel tiki más famoso, complejo y aromático',
    image: '/images/tropical/mai-tai.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Ron Oscuro', amount: '30ml', type: 'Spirit' },
      { name: 'Ron Blanco', amount: '30ml', type: 'Spirit' },
      { name: 'Curaçao', amount: '15ml', type: 'Liqueur' },
      { name: 'Jugo de Lima', amount: '30ml', type: 'Citrus' },
      { name: 'Orgeat', amount: '15ml', type: 'Syrup' },
      { name: 'Hielo', amount: 'Cubos', type: 'Ice' }
    ],
    instructions: [
      'Llenar vaso mezclador con hielo',
      'Añadir ron oscuro y ron blanco',
      'Añadir curaçao y jugo de lima',
      'Añadir orgeat',
      'Agitar vigorosamente por 15 segundos',
      'Colar en vaso con hielo',
      'Decorar con menta y lima'
    ],
    garnish: 'Menta y lima',
    glass: 'Vaso Tiki',
    technique: 'Shake',
    history: 'Creado en 1944 por Victor Bergeron en Trader Vic\'s. El cóctel tiki más famoso.',
    rating: 4.8,
    reviews: 2156,
    tips: [
      'Usar orgeat de calidad',
      'Agitar vigorosamente',
      'Servir en vaso tiki',
      'Decorar abundantemente'
    ]
  },
  {
    id: '2',
    name: 'Piña Colada',
    type: 'Caribeño',
    difficulty: 'Fácil',
    time: '4 min',
    abv: 18,
    description: 'El cóctel tropical más popular, cremoso y refrescante',
    image: '/images/tropical/pina-colada.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Ron Blanco', amount: '60ml', type: 'Spirit' },
      { name: 'Crema de Coco', amount: '30ml', type: 'Cream' },
      { name: 'Jugo de Piña', amount: '90ml', type: 'Juice' },
      { name: 'Hielo', amount: 'Cubos', type: 'Ice' }
    ],
    instructions: [
      'Añadir todos los ingredientes a la licuadora',
      'Añadir hielo hasta llenar',
      'Licuar por 30 segundos',
      'Verter en vaso alto',
      'Decorar con piña y cereza'
    ],
    garnish: 'Piña y cereza',
    glass: 'Vaso Alto',
    technique: 'Blend',
    history: 'Creado en 1954 en Puerto Rico. El cóctel nacional de Puerto Rico.',
    rating: 4.7,
    reviews: 3245,
    tips: [
      'Usar crema de coco de calidad',
      'Licuar bien el hielo',
      'Servir inmediatamente',
      'Decorar con fruta fresca'
    ]
  },
  {
    id: '3',
    name: 'Blue Hawaiian',
    type: 'Hawaiano',
    difficulty: 'Fácil',
    time: '3 min',
    abv: 16,
    description: 'Cóctel azul tropical, refrescante y colorido',
    image: '/images/tropical/blue-hawaiian.jpg',
    isClassic: false,
    ingredients: [
      { name: 'Ron Blanco', amount: '45ml', type: 'Spirit' },
      { name: 'Blue Curaçao', amount: '30ml', type: 'Liqueur' },
      { name: 'Crema de Coco', amount: '30ml', type: 'Cream' },
      { name: 'Jugo de Piña', amount: '60ml', type: 'Juice' },
      { name: 'Hielo', amount: 'Cubos', type: 'Ice' }
    ],
    instructions: [
      'Añadir todos los ingredientes a la licuadora',
      'Añadir hielo hasta llenar',
      'Licuar por 20 segundos',
      'Verter en vaso alto',
      'Decorar con piña y cereza'
    ],
    garnish: 'Piña y cereza',
    glass: 'Vaso Alto',
    technique: 'Blend',
    history: 'Creado en 1957 por Harry Yee en Hawaii. Popularizado por Elvis Presley.',
    rating: 4.6,
    reviews: 1876,
    tips: [
      'Usar Blue Curaçao auténtico',
      'Licuar bien el hielo',
      'Servir frío',
      'Decorar con fruta tropical'
    ]
  },
  {
    id: '4',
    name: 'Zombie',
    type: 'Tiki Classic',
    difficulty: 'Avanzado',
    time: '8 min',
    abv: 28,
    description: 'El cóctel tiki más potente y complejo',
    image: '/images/tropical/zombie.jpg',
    isClassic: true,
    ingredients: [
      { name: 'Ron Blanco', amount: '30ml', type: 'Spirit' },
      { name: 'Ron Oscuro', amount: '30ml', type: 'Spirit' },
      { name: 'Ron 151', amount: '15ml', type: 'Spirit' },
      { name: 'Curaçao', amount: '15ml', type: 'Liqueur' },
      { name: 'Jugo de Lima', amount: '30ml', type: 'Citrus' },
      { name: 'Jugo de Piña', amount: '30ml', type: 'Juice' },
      { name: 'Grenadine', amount: '10ml', type: 'Syrup' },
      { name: 'Hielo', amount: 'Cubos', type: 'Ice' }
    ],
    instructions: [
      'Llenar vaso mezclador con hielo',
      'Añadir todos los rones',
      'Añadir curaçao y jugos',
      'Añadir grenadine',
      'Agitar vigorosamente por 20 segundos',
      'Colar en vaso tiki con hielo',
      'Decorar con menta y fruta'
    ],
    garnish: 'Menta y fruta tropical',
    glass: 'Vaso Tiki',
    technique: 'Shake',
    history: 'Creado en 1934 por Donn Beach. El cóctel más potente del mundo tiki.',
    rating: 4.9,
    reviews: 1456,
    tips: [
      'Usar ron 151 con cuidado',
      'Agitar vigorosamente',
      'Servir en vaso tiki',
      'Decorar abundantemente'
    ]
  }
]

const tropicalGlassware = [
  {
    name: 'Vaso Tiki',
    description: 'El vaso tradicional para cócteles tiki',
    icon: Flame,
    capacity: '300-400ml',
    material: 'Cerámica',
    price: '$20-60',
    brands: ['Tiki Farm', 'Mug Tiki', 'Tiki Oasis'],
    pros: ['Auténtico', 'Decorativo', 'Tradicional'],
    cons: ['Frágil', 'Difícil limpieza']
  },
  {
    name: 'Vaso Alto',
    description: 'Vaso alto para cócteles tropicales',
    icon: DropletsIcon,
    capacity: '350-450ml',
    material: 'Cristal',
    price: '$15-40',
    brands: ['Libbey', 'Schott Zwiesel', 'Riedel'],
    pros: ['Versátil', 'Fácil limpieza', 'Resistente'],
    cons: ['No específico', 'Menos decorativo']
  },
  {
    name: 'Copa Hurricane',
    description: 'Copa en forma de huracán para cócteles tropicales',
    icon: StarIcon,
    capacity: '400-500ml',
    material: 'Cristal',
    price: '$25-50',
    brands: ['Libbey', 'Schott Zwiesel', 'Riedel'],
    pros: ['Elegante', 'Capacidad grande', 'Decorativo'],
    cons: ['Frágil', 'Precio elevado']
  }
]

const tropicalTechniques = [
  {
    technique: 'Blending',
    description: 'Licuar ingredientes con hielo',
    icon: ZapIcon,
    time: '20-30 segundos',
    difficulty: 'Fácil',
    details: 'Licuar todos los ingredientes con hielo hasta obtener consistencia suave'
  },
  {
    technique: 'Shaking',
    description: 'Agitar vigorosamente con hielo',
    icon: ClockIcon,
    time: '15-20 segundos',
    difficulty: 'Intermedio',
    details: 'Agitar con fuerza para mezclar ingredientes y enfriar'
  },
  {
    technique: 'Layering',
    description: 'Crear capas de colores',
    icon: DropletsIcon,
    time: '30-45 segundos',
    difficulty: 'Avanzado',
    details: 'Verter ingredientes en capas para crear efectos visuales'
  },
  {
    technique: 'Garnishing',
    description: 'Decorar con frutas tropicales',
    icon: StarIcon,
    time: '15-30 segundos',
    difficulty: 'Fácil',
    details: 'Decorar abundantemente con frutas tropicales frescas'
  }
]

const tropicalHistory = [
  {
    year: '1934',
    event: 'Nacimiento del Tiki',
    description: 'Donn Beach crea el primer bar tiki en Hollywood',
    icon: BookOpenIcon
  },
  {
    year: '1944',
    event: 'Mai Tai',
    description: 'Victor Bergeron crea el Mai Tai en Trader Vic\'s',
    icon: AwardIcon
  },
  {
    year: '1954',
    event: 'Piña Colada',
    description: 'Creada en Puerto Rico, se convierte en cóctel nacional',
    icon: StarIcon
  },
  {
    year: '1960',
    event: 'Popularización',
    description: 'Los cócteles tropicales se popularizan en Estados Unidos',
    icon: WineIcon
  }
]

export default function TropicalCocktailsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedCocktail, setExpandedCocktail] = useState<string | null>(null)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const filteredCocktails = featuredTropicalCocktails.filter(cocktail => {
    const matchesSearch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cocktail.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cocktail.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cocktail.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Flame className="h-12 w-12 text-orange-600" />
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Cócteles Tropicales
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Los cócteles más exóticos y refrescantes. Desde clásicos tiki hasta creaciones modernas
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cócteles tropicales, ingredientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tropical Categories */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorías Tropicales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cada categoría tiene sus propias características y técnicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tropicalCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.count}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          cócteles
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {category.time}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          tiempo
                        </div>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mb-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.difficulty === 'Fácil' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                        category.difficulty === 'Intermedio' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                        'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                      }`}>
                        {category.difficulty}
                      </span>
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
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded"
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
                        Ver cócteles
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tropical Cocktails */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cócteles Tropicales Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los cócteles tropicales más populares y mejor valorados
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
              }`}
            >
              Todos
            </button>
            {tropicalCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Cocktails Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCocktails.map((cocktail, index) => (
              <motion.div
                key={cocktail.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">
                        {cocktail.name}
                      </h3>
                      <button
                        onClick={() => setExpandedCocktail(expandedCocktail === cocktail.id ? null : cocktail.id)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-orange-100 mb-4">
                      {cocktail.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {cocktail.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        {cocktail.difficulty}
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        {cocktail.abv}% ABV
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Ingredients */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Ingredientes:
                      </h4>
                      <div className="space-y-2">
                        {cocktail.ingredients.map((ingredient, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">{ingredient.name}</span>
                            <span className="text-gray-500 dark:text-gray-400">{ingredient.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Preparación:
                      </h4>
                      <ol className="space-y-2">
                        {cocktail.instructions.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full flex items-center justify-center text-xs font-semibold">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expanded Info */}
                    {expandedCocktail === cocktail.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6"
                      >
                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Vaso:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {cocktail.glass}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Técnica:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {cocktail.technique}
                            </p>
                          </div>
                        </div>

                        {/* History */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Historia:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cocktail.history}
                          </p>
                        </div>

                        {/* Tips */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Consejos:
                          </p>
                          <ul className="space-y-1">
                            {cocktail.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                        <Play className="h-4 w-4" />
                        Ver Tutorial
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

      {/* Tropical Glassware */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vasos Tropicales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Los vasos perfectos para cócteles tropicales y tiki
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tropicalGlassware.map((glass, index) => (
              <motion.div
                key={glass.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <glass.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {glass.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {glass.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {glass.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {glass.capacity} • {glass.material}
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                          Ventajas:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {glass.pros.map((pro, idx) => (
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
                          {glass.cons.map((con, idx) => (
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
                        {glass.brands.map((brand, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs rounded"
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

      {/* Tropical Techniques */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Técnicas Tropicales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Las técnicas esenciales para preparar cócteles tropicales perfectos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tropicalTechniques.map((technique, index) => (
              <motion.div
                key={technique.technique}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <technique.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {technique.technique}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {technique.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        {technique.time}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Target className="h-4 w-4" />
                        {technique.difficulty}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {technique.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tropical History */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Historia de los Cócteles Tropicales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              La evolución de los cócteles más exóticos y refrescantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tropicalHistory.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <event.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {event.year}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {event.event}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {event.description}
                    </p>
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
