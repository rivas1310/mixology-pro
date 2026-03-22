'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Grape, Trash2, Search, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

interface WineItem {
  id: string
  name: string
  brand?: string
  category?: string
  abv?: number
}

export default function AdminWinesPage() {
  const [wines, setWines] = useState<WineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/admin/wines?limit=200')
        const data = await response.json()
        setWines(data.wines || [])
      } catch (error) {
        console.error(error)
        toast.error('Error cargando vinos')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return
    try {
      const response = await fetch(`/api/admin/wines/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error eliminando vino')
      setWines((prev) => prev.filter((wine) => wine.id !== id))
      toast.success('Vino eliminado')
    } catch (error) {
      console.error(error)
      toast.error('No se pudo eliminar')
    }
  }

  const filtered = wines.filter((wine) => {
    const q = search.toLowerCase()
    return (
      wine.name.toLowerCase().includes(q) ||
      (wine.brand || '').toLowerCase().includes(q) ||
      (wine.category || '').toLowerCase().includes(q)
    )
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vinos</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona tu catálogo de vinos
          </p>
        </div>
        <Link
          href="/admin/wines/new"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nuevo Vino
        </Link>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar vinos..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto" />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Nombre</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Marca</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">Categoría</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-gray-500">ABV</th>
                <th className="px-4 py-3 text-right text-xs uppercase text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((wine) => (
                <tr key={wine.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{wine.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{wine.brand || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{wine.category || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{wine.abv ?? '-'}{wine.abv ? '%' : ''}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/wines/${wine.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDelete(wine.id, wine.name)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">No hay vinos para mostrar.</div>
          )}
        </div>
      )}
    </div>
  )
}
