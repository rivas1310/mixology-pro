'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Clock,
  Users,
  Wine,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react'

const mockCocktails = [
  {
    id: '1',
    name: 'Margarita Clásica',
    category: 'CLASSIC',
    difficulty: 'EASY',
    prepTime: 3,
    rating: 4.8,
    reviews: 1247,
    isAlcoholic: true,
    abv: 22,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Old Fashioned',
    category: 'CLASSIC',
    difficulty: 'MEDIUM',
    prepTime: 5,
    rating: 4.9,
    reviews: 2156,
    isAlcoholic: true,
    abv: 28,
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Virgin Mojito',
    category: 'MOCKTAIL',
    difficulty: 'EASY',
    prepTime: 3,
    rating: 4.4,
    reviews: 567,
    isAlcoholic: false,
    abv: 0,
    status: 'draft',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  }
]

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'CLASSIC', label: 'Clásicos' },
  { value: 'TROPICAL', label: 'Tropicales' },
  { value: 'MODERN', label: 'Modernos' },
  { value: 'MOCKTAIL', label: 'Sin Alcohol' }
]

const difficulties = [
  { value: 'all', label: 'Todas las dificultades' },
  { value: 'EASY', label: 'Fácil' },
  { value: 'MEDIUM', label: 'Medio' },
  { value: 'HARD', label: 'Difícil' },
  { value: 'EXPERT', label: 'Experto' }
]

const statuses = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'Borrador' },
  { value: 'archived', label: 'Archivado' }
]

export default function CocktailsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredCocktails = mockCocktails.filter(cocktail => {
    const matchesSearch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cocktail.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || cocktail.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === 'all' || cocktail.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Cócteles
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Administra recetas, ingredientes y técnicas
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Upload className="h-4 w-4" />
            Importar
          </button>
          <a
            href="/admin/cocktails/new"
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuevo Cóctel
          </a>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cócteles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cóctel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dificultad
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tiempo
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCocktails.map((cocktail, index) => (
                <motion.tr
                  key={cocktail.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl flex items-center justify-center">
                        <Wine className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {cocktail.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {cocktail.isAlcoholic ? `${cocktail.abv}% ABV` : 'Sin alcohol'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">
                      {cocktail.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      cocktail.difficulty === 'EASY' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                      cocktail.difficulty === 'MEDIUM' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                      cocktail.difficulty === 'HARD' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' :
                      'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    }`}>
                      {cocktail.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      {cocktail.prepTime} min
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {cocktail.rating}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ({cocktail.reviews})
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      cocktail.status === 'published' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                      cocktail.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {cocktail.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
