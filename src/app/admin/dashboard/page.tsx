'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Wine, 
  Beer,
  Grape,
  FileText,
  Eye,
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCocktails: 0,
    totalIngredients: 0,
    totalSpirits: 0,
    totalBeers: 0,
    totalWines: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [cocktailsRes, ingredientsRes, spiritsRes, beersRes, winesRes] = await Promise.all([
          fetch('/api/admin/cocktails?limit=1'),
          fetch('/api/admin/ingredients?limit=1'),
          fetch('/api/admin/spirits?limit=1'),
          fetch('/api/admin/beers?limit=1'),
          fetch('/api/admin/wines?limit=1'),
        ])

        const safeTotal = async (res: Response) => {
          if (!res.ok) return 0
          try {
            const data = await res.json()
            return typeof data?.pagination?.total === 'number' ? data.pagination.total : 0
          } catch {
            return 0
          }
        }

        const [
          totalCocktails,
          totalIngredients,
          totalSpirits,
          totalBeers,
          totalWines,
        ] = await Promise.all([
          safeTotal(cocktailsRes),
          safeTotal(ingredientsRes),
          safeTotal(spiritsRes),
          safeTotal(beersRes),
          safeTotal(winesRes),
        ])

        setStats({
          totalCocktails,
          totalIngredients,
          totalSpirits,
          totalBeers,
          totalWines,
        })
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  const adminCategories = [
    {
      id: 'products',
      name: 'Todos los Productos',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      description: 'Ver, editar y eliminar todos los productos',
      href: '/admin/products',
      count: stats.totalCocktails + stats.totalSpirits + stats.totalBeers + stats.totalWines
    },
    {
      id: 'cocktails',
      name: 'Cócteles',
      icon: Wine,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      description: 'Gestiona recetas de cócteles',
      href: '/admin/cocktails',
      newHref: '/admin/cocktails/new',
      count: stats.totalCocktails
    },
    {
      id: 'spirits',
      name: 'Licores',
      icon: Wine,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
      description: 'Gestiona licores y destilados',
      href: '/admin/spirits',
      newHref: '/admin/spirits/new',
      count: stats.totalSpirits
    },
    {
      id: 'beers',
      name: 'Cervezas',
      icon: Beer,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
      description: 'Gestiona cervezas y cervezas artesanales',
      href: '/admin/beers',
      newHref: '/admin/beers/new',
      count: stats.totalBeers
    },
    {
      id: 'wines',
      name: 'Vinos',
      icon: Grape,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
      description: 'Gestiona vinos y bodegas',
      href: '/admin/wines',
      newHref: '/admin/wines/new',
      count: stats.totalWines
    },
    {
      id: 'ingredients',
      name: 'Ingredientes',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      description: 'Gestiona ingredientes y frutas',
      href: '/admin/ingredients',
      newHref: '/admin/ingredients/new',
      count: stats.totalIngredients
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Ver Todos los Productos
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalCocktails + stats.totalSpirits + stats.totalBeers + stats.totalWines}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCategories.map((category) => (
          <div key={category.id} className="group relative">
            <Link href={category.href}>
              <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer h-full`}>
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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

                  {/* Action */}
                  <div className="flex items-center justify-center gap-2 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <Eye className="h-4 w-4" />
                    Ver Todos
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}