'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Plus,
  Wine,
  Beer,
  Package,
  AlertTriangle,
  Star,
  Coffee
} from 'lucide-react'

interface Product {
  id: string
  name: string
  type: 'cocktail' | 'beer' | 'wine' | 'spirit'
  description?: string
  image?: string
  category?: string
  abv?: number
  rating?: number
  reviewCount?: number
  isFeatured?: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Cargar todos los productos
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        console.log('Cargando productos reales...')
        
        // Cargar cócteles reales
        const cocktailsResponse = await fetch('/api/admin/cocktails')
        let cocktails = []
        
        if (cocktailsResponse.ok) {
          const cocktailsData = await cocktailsResponse.json()
          console.log('Cócteles API response:', cocktailsData)
          
          // La API devuelve { cocktails: [...], pagination: {...} }
          if (cocktailsData.cocktails && Array.isArray(cocktailsData.cocktails)) {
            cocktails = cocktailsData.cocktails.map((cocktail: any) => ({
              ...cocktail,
              type: 'cocktail' as const,
              reviewCount: cocktail._count?.reviews || 0
            }))
          }
        } else {
          console.error('Error cargando cócteles:', cocktailsResponse.status)
        }

        // Cargar cervezas
        const beersResponse = await fetch('/api/admin/beers')
        let beers = []
        
        if (beersResponse.ok) {
          const beersData = await beersResponse.json()
          console.log('Cervezas API response:', beersData)
          
          if (beersData.beers && Array.isArray(beersData.beers)) {
            beers = beersData.beers.map((beer: any) => ({
              ...beer,
              type: 'beer' as const,
              reviewCount: beer._count?.reviews || 0
            }))
          }
        }

        // Cargar vinos
        const winesResponse = await fetch('/api/admin/wines')
        let wines = []
        
        if (winesResponse.ok) {
          const winesData = await winesResponse.json()
          console.log('Vinos API response:', winesData)
          
          if (winesData.wines && Array.isArray(winesData.wines)) {
            wines = winesData.wines.map((wine: any) => ({
              ...wine,
              type: 'wine' as const,
              reviewCount: wine._count?.reviews || 0
            }))
          }
        }

        // Cargar licores
        const spiritsResponse = await fetch('/api/admin/spirits')
        let spirits = []
        
        if (spiritsResponse.ok) {
          const spiritsData = await spiritsResponse.json()
          console.log('Licores API response:', spiritsData)
          
          if (spiritsData.spirits && Array.isArray(spiritsData.spirits)) {
            spirits = spiritsData.spirits.map((spirit: any) => ({
              ...spirit,
              type: 'spirit' as const,
              reviewCount: spirit._count?.reviews || 0
            }))
          }
        }

        // Combinar todos los productos
        const allProducts: Product[] = [...cocktails, ...beers, ...wines, ...spirits]
        
        // Ordenar por fecha de creación (más recientes primero)
        allProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        
        console.log('Productos cargados:', allProducts)
        setProducts(allProducts)
        
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || product.type === selectedType
    return matchesSearch && matchesType
  })

  // Eliminar producto
  const handleDelete = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/${product.type}s/${product.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== product.id))
        setShowDeleteModal(false)
        setSelectedProduct(null)
      } else {
        console.error('Error deleting product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando productos...</p>
        </div>
      </div>
    )
  }

  console.log('Rendering products page. Products:', products)
  console.log('Filtered products:', filteredProducts)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gestión de Productos
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Administra todos los productos: cócteles, cervezas, vinos y licores
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Cócteles
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {products.filter(p => p.type === 'cocktail').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Coffee className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Cervezas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {products.filter(p => p.type === 'beer').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Beer className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Vinos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {products.filter(p => p.type === 'wine').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Wine className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Licores
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {products.filter(p => p.type === 'spirit').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="cocktail">Cócteles</option>
              <option value="beer">Cervezas</option>
              <option value="wine">Vinos</option>
              <option value="spirit">Licores</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ABV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product, index) => {
                const getIcon = (type: string) => {
                  switch (type) {
                    case 'cocktail': return <Coffee className="h-6 w-6 text-white" />
                    case 'beer': return <Beer className="h-6 w-6 text-white" />
                    case 'wine': return <Wine className="h-6 w-6 text-white" />
                    case 'spirit': return <Package className="h-6 w-6 text-white" />
                    default: return <Package className="h-6 w-6 text-white" />
                  }
                }

                const getSmallIcon = (type: string) => {
                  switch (type) {
                    case 'cocktail': return <Coffee className="h-3 w-3 mr-1" />
                    case 'beer': return <Beer className="h-3 w-3 mr-1" />
                    case 'wine': return <Wine className="h-3 w-3 mr-1" />
                    case 'spirit': return <Package className="h-3 w-3 mr-1" />
                    default: return <Package className="h-3 w-3 mr-1" />
                  }
                }

                const getColor = (type: string) => {
                  switch (type) {
                    case 'cocktail': return 'from-purple-500 to-pink-500'
                    case 'beer': return 'from-amber-500 to-orange-500'
                    case 'wine': return 'from-red-500 to-rose-500'
                    case 'spirit': return 'from-blue-500 to-indigo-500'
                    default: return 'from-gray-500 to-gray-600'
                  }
                }

                const getBgColor = (type: string) => {
                  switch (type) {
                    case 'cocktail': return 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                    case 'beer': return 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20'
                    case 'wine': return 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20'
                    case 'spirit': return 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
                    default: return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20'
                  }
                }

                const getLabel = (type: string) => {
                  switch (type) {
                    case 'cocktail': return 'Cócteles'
                    case 'beer': return 'Cervezas'
                    case 'wine': return 'Vinos'
                    case 'spirit': return 'Licores'
                    default: return 'Producto'
                  }
                }
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                        ) : (
                          <div className={`w-12 h-12 bg-gradient-to-br ${getColor(product.type)} rounded-lg flex items-center justify-center mr-4`}>
                            {getIcon(product.type)}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          {product.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {product.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${getBgColor(product.type)}`}>
                        {getSmallIcon(product.type)}
                        {getLabel(product.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {product.category || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {product.abv ? `${product.abv}%` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {product.rating ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {product.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            console.log('Editing product:', { id: product.id, type: product.type, name: product.name })
                            // Redirigir a la página de edición según el tipo
                            if (product.type === 'cocktail') {
                              router.push(`/admin/cocktails/${product.id}/edit`)
                            } else if (product.type === 'beer') {
                              router.push(`/admin/beers/${product.id}/edit`)
                            } else if (product.type === 'wine') {
                              router.push(`/admin/wines/${product.id}/edit`)
                            } else if (product.type === 'spirit') {
                              router.push(`/admin/spirits/${product.id}/edit`)
                            } else {
                              console.error('Unknown product type:', product.type)
                              toast.error('Tipo de producto no reconocido')
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (product.type === 'cocktail') {
                              router.push(`/cocktails/${product.category}/${product.id}`)
                            } else if (product.category) {
                              router.push(`/${product.type}s/${product.category}/${product.id}`)
                            } else {
                              toast.error('No se pudo abrir la vista pública: falta categoría')
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          title="Ver en público"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product)
                            setShowDeleteModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedType !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza agregando tu primer producto'
              }
            </p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirmar eliminación
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro de que quieres eliminar <strong>{selectedProduct.name}</strong>? 
              Esta acción no se puede deshacer.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedProduct(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(selectedProduct)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
