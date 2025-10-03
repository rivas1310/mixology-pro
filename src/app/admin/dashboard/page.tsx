'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  BarChart3, 
  Users, 
  Wine, 
  Apple, 
  Beer,
  Grape,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import { CloudflareImage } from '@/components/ui/CloudflareImage'

const adminCategories = [
  {
    id: 'cocktails',
    name: 'Cócteles',
    icon: Wine,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    description: 'Gestiona recetas de cócteles',
    count: 0,
    href: '/admin/cocktails',
    newHref: '/admin/cocktails/new'
  },
  {
    id: 'ingredients',
    name: 'Ingredientes',
    icon: Apple,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Gestiona ingredientes y frutas',
    count: 0,
    href: '/admin/ingredients',
    newHref: '/admin/ingredients/new'
  },
  {
    id: 'spirits',
    name: 'Licores',
    icon: Wine,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    description: 'Gestiona licores y destilados',
    count: 0,
    href: '/admin/spirits',
    newHref: '/admin/spirits/new'
  },
  {
    id: 'beers',
    name: 'Cervezas',
    icon: Beer,
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    description: 'Gestiona cervezas y cervezas artesanales',
    count: 0,
    href: '/admin/beers',
    newHref: '/admin/beers/new'
  },
  {
    id: 'wines',
    name: 'Vinos',
    icon: Grape,
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Gestiona vinos y bodegas',
    count: 0,
    href: '/admin/wines',
    newHref: '/admin/wines/new'
  }
]

const recentItems = [
  {
    id: '1',
    name: 'Margarita Clásica',
    type: 'Cóctel',
    category: 'Clásico',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1000&auto=format&fit=crop',
    createdAt: '2024-01-15',
    status: 'published'
  },
  {
    id: '2',
    name: 'Limón',
    type: 'Ingrediente',
    category: 'Fruta',
    image: 'https://images.unsplash.com/photo-1616061996276-d32745771972?q=80&w=1000&auto=format&fit=crop',
    createdAt: '2024-01-14',
    status: 'published'
  },
  {
    id: '3',
    name: 'Johnnie Walker Black',
    type: 'Licor',
    category: 'Whiskey',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1000&auto=format&fit=crop',
    createdAt: '2024-01-13',
    status: 'draft'
  }
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCocktails: 0,
    totalIngredients: 0,
    totalSpirits: 0,
    totalBeers: 0,
    totalWines: 0,
    totalUsers: 0
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de estadísticas
    const loadStats = async () => {
      try {
        // Aquí cargarías las estadísticas reales desde las APIs
        setStats({
          totalCocktails: 45,
          totalIngredients: 120,
          totalSpirits: 85,
          totalBeers: 60,
          totalWines: 40,
          totalUsers: 1250
        })
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gestiona todos los contenidos de tu plataforma
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/test-upload"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Probar Subida
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Cócteles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCocktails}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <Wine className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Ingredientes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalIngredients}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <Apple className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Licores</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSpirits}</p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
              <Wine className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Cervezas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBeers}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl">
              <Beer className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Vinos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalWines}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
              <Grape className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Usuarios</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {adminCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="group relative"
          >
            <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden`}>
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {category.description}
                </p>

                {/* Count */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.count}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    elementos
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={category.href}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Ver Todos
                  </Link>
                  
                  <Link
                    href={category.newHref}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Elementos Recientes
        </h2>
        
        <div className="space-y-4">
          {recentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                <CloudflareImage
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.type} • {item.category}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'published' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                }`}>
                  {item.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
                
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
