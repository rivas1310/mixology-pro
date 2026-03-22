'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Droplets,
  Apple,
  Leaf,
  Zap,
  Heart,
  Award,
  BookOpen,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Plus,
  Minus,
  Info,
  Calendar,
  MapPin,
  TrendingUp,
  ArrowLeft,
  Package
} from 'lucide-react'

interface Ingredient {
  id: string
  name: string
  category: string
  type: string
  origin: string
  season: string
  nutrition: {
    calories: number
    vitaminC?: number
    fiber?: number
    vitaminA?: number
    iron?: number
    alcohol?: number
    sugar?: number
    protein?: number
    fat?: number
    carbs?: number
    acidity?: string
  }
  description: string
  uses: string[]
  image?: string
  rating: number
  isPremium: boolean
  price: number
  unit: string
}

const categoryConfig = {
  fruits: {
    name: 'Frutas',
    icon: Apple,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Frutas frescas y cítricos para cócteles',
    subcategories: ['Cítricos', 'Tropicales', 'Bayas', 'Frutas de temporada']
  },
  herbs: {
    name: 'Hierbas',
    icon: Leaf,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    description: 'Hierbas aromáticas y frescas para coctelería',
    subcategories: [
      'Aromáticas',
      'Amargas / Tónicas',
      'Medicinales / Terapéuticas',
      'Especiadas / Calientes',
      'Mentoladas / Balsámicas',
      'Rituales / Tradicionales',
      'Verdes / Frescas'
    ]
  },
  juices: {
    name: 'Jugos',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Jugos naturales y concentrados',
    subcategories: ['Cítricos', 'Tropicales', 'Vegetales', 'Concentrados']
  },
  syrups: {
    name: 'Jarabes',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Jarabes dulces y aromáticos',
    subcategories: ['Simples', 'Aromáticos', 'Especiales', 'Sin Azúcar']
  },
  bitters: {
    name: 'Bitters',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Concentrados aromáticos',
    subcategories: ['Aromatic', 'Citrus', 'Chocolate', 'Herbal']
  },
  garnishes: {
    name: 'Decoraciones',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Elementos decorativos',
    subcategories: ['Frutas', 'Hierbas', 'Flores', 'Especias']
  },
  mixers: {
    name: 'Mixers',
    icon: BarChart3,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-orange-900/20',
    description: 'Bebidas mezcladoras',
    subcategories: ['Tónicas', 'Sodas', 'Ginger Ale', 'Refrescos']
  },
  spices: {
    name: 'Especias',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-amber-900/20',
    description: 'Especias y condimentos',
    subcategories: ['Dulces', 'Saladas', 'Picantes', 'Aromáticas']
  },
  dairy: {
    name: 'Lácteos',
    icon: Heart,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    description: 'Productos lácteos y cremas',
    subcategories: ['Leche', 'Crema', 'Yogurt', 'Quesos']
  },
  nuts: {
    name: 'Frutos Secos',
    icon: Award,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    description: 'Nueces y semillas',
    subcategories: ['Nueces', 'Almendras', 'Pistachos', 'Semillas']
  },
  vegetables: {
    name: 'Vegetales',
    icon: Leaf,
    color: 'from-green-500 to-lime-600',
    bgColor: 'from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20',
    description: 'Vegetales frescos',
    subcategories: ['Hojas', 'Raíces', 'Bulbos', 'Tallos']
  },
  flowers: {
    name: 'Flores',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-pink-900/20',
    description: 'Flores comestibles',
    subcategories: ['Rosas', 'Lavanda', 'Violetas', 'Hibisco']
  },
  chocolate: {
    name: 'Chocolate',
    icon: Award,
    color: 'from-amber-600 to-orange-700',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Productos de cacao',
    subcategories: ['Chocolate Negro', 'Chocolate Blanco', 'Cacao', 'Polvos']
  },
  alcohol: {
    name: 'Alcohol',
    icon: Zap,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Bebidas alcohólicas',
    subcategories: ['Licores', 'Vinos', 'Cervezas', 'Destilados']
  },
  sweeteners: {
    name: 'Endulzantes',
    icon: Star,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Azúcares y edulcorantes',
    subcategories: ['Azúcares', 'Mieles', 'Edulcorantes', 'Naturales']
  },
  salts: {
    name: 'Sales',
    icon: Award,
    color: 'from-gray-400 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20',
    description: 'Sales y minerales',
    subcategories: ['Marina', 'Himalaya', 'Especiadas', 'Ahumadas']
  },
  oils: {
    name: 'Aceites',
    icon: Droplets,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Aceites y grasas',
    subcategories: ['Oliva', 'Coco', 'Sésamo', 'Esenciales']
  },
  teas: {
    name: 'Tés',
    icon: BookOpen,
    color: 'from-green-600 to-emerald-700',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Tés e infusiones',
    subcategories: ['Negro', 'Verde', 'Herbales', 'Frutales']
  },
  spirits: {
    name: 'Licores',
    icon: Heart,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    description: 'Licores y destilados',
    subcategories: ['Dulces', 'Secos', 'Aromáticos', 'Cremosos']
  }
}


export default function CategoryIngredientsPage() {
  const params = useParams()
  const category = params?.category as string
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')

  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig]

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setLoading(true)
        console.log('Loading ingredients for category:', category)
        
        // Obtener TODOS los ingredientes y filtrar en el cliente
        // porque la base de datos tiene categorías en diferentes formatos
        const response = await fetch(`/api/admin/ingredients?limit=1000`)
        console.log('API Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Total ingredients from API:', data.ingredients?.length || 0)
          
          const ingredientsData = data.ingredients || []
          
          // Filtrar por categoría (soportando múltiples formatos)
          const categoryUpper = category.toUpperCase()
          const categorySpanish = categoryInfo.name
          
          const filteredData = ingredientsData.filter((ing: any) => {
            const ingCategory = ing.category?.toUpperCase() || ''
            return ingCategory === categoryUpper || 
                   ing.category === categorySpanish ||
                   ingCategory === categorySpanish.toUpperCase()
          })
          
          console.log('Filtered ingredients for category:', filteredData.length)
          
          // Transformar datos de la API al formato del componente
          const transformedIngredients: Ingredient[] = filteredData.map((ing: any) => ({
            id: ing.id,
            name: ing.name,
            category: categoryInfo.name,
            type: ing.type,
            origin: ing.origin || 'No especificado',
            season: ing.season || 'Todo el año',
            nutrition: ing.nutrition || { calories: 0 },
            description: ing.description || 'Sin descripción',
            uses: ['Cócteles', 'Decoración', 'Mixología'],
            image: ing.image,
            rating: 4.5,
            isPremium: ing.isEssential || false,
            price: 2.50,
            unit: 'unidad'
          }))
          
          console.log('Final transformed ingredients:', transformedIngredients)
          setIngredients(transformedIngredients)
        }
      } catch (error) {
        console.error('Error loading ingredients:', error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryInfo) {
      loadIngredients()
    }
  }, [category, categoryInfo])

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingredient.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              ingredient.type.toLowerCase().includes(selectedSubcategory.toLowerCase())
    
    return matchesSearch && matchesSubcategory
  })

  // Agrupar ingredientes por subcategoría para mostrar mejor organización
  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    const subcategory = ingredient.type
    if (!acc[subcategory]) {
      acc[subcategory] = []
    }
    acc[subcategory].push(ingredient)
    return acc
  }, {} as Record<string, Ingredient[]>)

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 dark:from-zinc-950 dark:via-violet-950/45 dark:to-cyan-950/35 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Categoría no encontrada
          </h1>
          <p className="text-xl text-violet-700 dark:text-violet-200 mb-8">
            La categoría &quot;{category}&quot; no existe.
          </p>
          <Link
            href="/ingredients"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Ingredientes
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 dark:from-zinc-950 dark:via-violet-950/45 dark:to-cyan-950/35 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-violet-700 dark:text-violet-200">Cargando ingredientes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 dark:from-zinc-950 dark:via-violet-950/45 dark:to-cyan-950/35">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-cyan-500/15 to-pink-500/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/ingredients"
            className="flex items-center gap-2 text-violet-700 dark:text-violet-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Ingredientes
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className={`relative w-20 h-20 bg-gradient-to-br ${categoryInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <categoryInfo.icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-lg text-violet-700 dark:text-violet-200 mb-6">
              {categoryInfo.description}
            </p>
            <div className="flex justify-center gap-4 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" /> {ingredients.length} Ingredientes
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" /> Premium
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white/70 dark:bg-zinc-950/35 backdrop-blur border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-600/80 dark:text-violet-300/90" />
                <input
                  type="text"
                  placeholder={`Buscar en ${categoryInfo.name.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-violet-200/80 dark:border-violet-800/40 rounded-xl bg-white/80 dark:bg-zinc-900/60 text-gray-900 dark:text-zinc-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
                />
              </div>

              {/* Subcategory Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-600/80 dark:text-violet-300/90" />
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-violet-200/80 dark:border-violet-800/40 rounded-xl bg-white/80 dark:bg-zinc-900/60 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm appearance-none"
                >
                  <option value="all">Todas las Subcategorías</option>
                  {categoryInfo.subcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-600/80 dark:text-violet-300/90" />
                <select className="w-full pl-12 pr-4 py-3 text-lg border border-violet-200/80 dark:border-violet-800/40 rounded-xl bg-white/80 dark:bg-zinc-900/60 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm appearance-none">
                  <option value="name">Ordenar por Nombre</option>
                  <option value="rating">Ordenar por Rating</option>
                  <option value="price">Ordenar por Precio</option>
                  <option value="type">Ordenar por Tipo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-12 bg-white/70 dark:bg-zinc-950/35 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Subcategorías de {categoryInfo.name}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryInfo.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? 'all' : subcategory)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedSubcategory === subcategory
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-violet-200/60 dark:border-violet-800/35 bg-white/70 dark:bg-zinc-900/50 text-gray-700 dark:text-zinc-200 hover:border-violet-300 dark:hover:border-violet-600'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-sm mb-1">{subcategory}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ingredients.filter(ing => ing.type.toLowerCase().includes(subcategory.toLowerCase())).length} ingredientes
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubcategory === 'all' ? `${categoryInfo.name} Disponibles` : `${selectedSubcategory} - ${categoryInfo.name}`}
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredIngredients.length} ingredientes encontrados
            </span>
          </div>

          {filteredIngredients.length === 0 ? (
            <div className="text-center py-20">
              <categoryInfo.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron ingredientes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay ingredientes disponibles en esta categoría'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : selectedSubcategory === 'all' ? (
            // Mostrar agrupado por subcategorías cuando se selecciona "all"
            <div className="space-y-12">
              {Object.entries(groupedIngredients).map(([subcategory, subcategoryIngredients], groupIndex) => (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {subcategory}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {subcategoryIngredients.length} ingredientes en esta subcategoría
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subcategoryIngredients.map((ingredient, index) => (
                      <motion.div
                        key={ingredient.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                    <div className="bg-gradient-to-br from-violet-50/90 via-white/80 to-cyan-50/60 dark:from-violet-950/70 dark:via-zinc-950/70 dark:to-cyan-950/35 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-violet-200/60 dark:border-violet-800/30 flex overflow-hidden">
                          {/* Image - Left Side */}
                          <div className="relative w-1/3 flex-shrink-0">
                            {ingredient.image ? (
                              <img
                                src={ingredient.image}
                                alt={ingredient.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
                                <categoryInfo.icon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            
                            {/* Type Badge */}
                            <div className="absolute top-4 left-4 right-4">
                              <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full block text-center">
                                {ingredient.type}
                              </span>
                            </div>
                          </div>

                          {/* Content - Right Side */}
                          <div className="p-6 flex-1">
                            <div className="mb-4">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {ingredient.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {ingredient.origin}
                              </p>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                              {ingredient.description}
                            </p>

                            {/* Nutrition Info */}
                            {ingredient.nutrition && Object.keys(ingredient.nutrition).length > 0 && (
                              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                  Información Nutricional:
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {ingredient.nutrition.calories && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600 dark:text-gray-400">Calorías:</span>
                                      <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.calories} kcal</span>
                                    </div>
                                  )}
                                  {ingredient.nutrition.vitaminC && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600 dark:text-gray-400">Vitamina C:</span>
                                      <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.vitaminC} mg</span>
                                    </div>
                                  )}
                                  {ingredient.nutrition.fiber && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600 dark:text-gray-400">Fibra:</span>
                                      <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.fiber} g</span>
                                    </div>
                                  )}
                                  {ingredient.nutrition.sugar && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600 dark:text-gray-400">Azúcar:</span>
                                      <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.sugar} g</span>
                                    </div>
                                  )}
                                  {ingredient.nutrition.acidity && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-600 dark:text-gray-400">Acidez:</span>
                                      <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.acidity}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Uses */}
                            <div>
                              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                Usos en Coctelería:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {ingredient.uses.map((use, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                                  >
                                    {use}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Mostrar ingredientes filtrados por subcategoría
            <div className="space-y-6">
              {filteredIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-violet-50/90 via-white/80 to-cyan-50/60 dark:from-violet-950/70 dark:via-zinc-950/70 dark:to-cyan-950/35 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-violet-200/60 dark:border-violet-800/30 flex overflow-hidden">
                    {/* Image - Left Side */}
                    <div className="relative w-1/3 flex-shrink-0">
                      {ingredient.image ? (
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.bgColor} flex items-center justify-center`}>
                          <categoryInfo.icon className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 right-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full block text-center">
                          {ingredient.type}
                        </span>
                      </div>
                    </div>

                    {/* Content - Right Side */}
                    <div className="p-6 flex-1">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {ingredient.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {ingredient.origin}
                        </p>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {ingredient.description}
                      </p>

                      {/* Nutrition Info */}
                      {ingredient.nutrition && Object.keys(ingredient.nutrition).length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Información Nutricional:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {ingredient.nutrition.calories && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Calorías:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.calories} kcal</span>
                              </div>
                            )}
                            {ingredient.nutrition.vitaminC && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Vitamina C:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.vitaminC} mg</span>
                              </div>
                            )}
                            {ingredient.nutrition.fiber && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Fibra:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.fiber} g</span>
                              </div>
                            )}
                            {ingredient.nutrition.sugar && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Azúcar:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.sugar} g</span>
                              </div>
                            )}
                            {ingredient.nutrition.acidity && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Acidez:</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{ingredient.nutrition.acidity}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Uses */}
                      <div>
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Usos en Coctelería:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.uses.map((use, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
