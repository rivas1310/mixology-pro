'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Beaker,
  Star,
  Clock,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface Technique {
  id: string
  name: string
  category: string
  subcategory?: string
  difficulty?: string
  timeRequired?: string
  image?: string
  isFeatured: boolean
  createdAt: string
}

export default function AdminTechniquesPage() {
  const router = useRouter()
  const [techniques, setTechniques] = useState<Technique[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: string; name: string }>({
    show: false,
    id: '',
    name: ''
  })

  useEffect(() => {
    loadTechniques()
  }, [])

  const loadTechniques = async () => {
    try {
      const response = await fetch('/api/admin/techniques')
      if (response.ok) {
        const data = await response.json()
        setTechniques(data.techniques || [])
      }
    } catch (error) {
      console.error('Error loading techniques:', error)
      toast.error('Error cargando técnicas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/techniques/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Técnica eliminada exitosamente')
        loadTechniques()
        setDeleteModal({ show: false, id: '', name: '' })
      } else {
        toast.error('Error eliminando técnica')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión')
    }
  }

  const filteredTechniques = techniques.filter(technique =>
    technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technique.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Beaker className="h-10 w-10 text-purple-600" />
            Técnicas de Coctelería
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gestiona las técnicas y métodos de preparación
          </p>
        </div>
        
        <Link href="/admin/techniques/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Técnica
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar técnicas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </motion.div>

      {/* Techniques Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
                {technique.image ? (
                  <img
                    src={technique.image}
                    alt={technique.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Beaker className="h-16 w-16 text-white" />
                  </div>
                )}
                
                {technique.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Destacada
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {technique.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                    {technique.category}
                  </span>
                  {technique.subcategory && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                      {technique.subcategory}
                    </span>
                  )}
                </div>

                {technique.difficulty && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <BarChart3 className="h-4 w-4" />
                    Dificultad: {technique.difficulty}
                  </div>
                )}

                {technique.timeRequired && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Clock className="h-4 w-4" />
                    {technique.timeRequired}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => router.push(`/techniques/${technique.category.toLowerCase()}/${technique.id}`)}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Ver
                  </button>
                  <button
                    onClick={() => router.push(`/admin/techniques/${technique.id}/edit`)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteModal({ show: true, id: technique.id, name: technique.name })}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTechniques.length === 0 && (
          <div className="text-center py-12">
            <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {searchTerm ? 'No se encontraron técnicas' : 'No hay técnicas creadas'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Eliminar técnica?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar &quot;{deleteModal.name}&quot;? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, id: '', name: '' })}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteModal.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

