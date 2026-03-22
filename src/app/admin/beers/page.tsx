'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Beer, Edit, Trash2, Search } from 'lucide-react'
import toast from 'react-hot-toast'

interface BeerItem {
  id: string
  name: string
  brand?: string
  category?: string
  abv?: number
}

export default function AdminBeersPage() {
  const [beers, setBeers] = useState<BeerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/admin/beers?limit=200')
        const data = await response.json()
        setBeers(data.beers || [])
      } catch (error) {
        console.error(error)
        toast.error('Error cargando cervezas')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return
    try {
      const response = await fetch(`/api/admin/beers/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error eliminando cerveza')
      setBeers((prev) => prev.filter((beer) => beer.id !== id))
      toast.success('Cerveza eliminada')
    } catch (error) {
      console.error(error)
      toast.error('No se pudo eliminar')
    }
  }

  const filtered = beers.filter((beer) => {
    const q = search.toLowerCase()
    return (
      beer.name.toLowerCase().includes(q) ||
      (beer.brand || '').toLowerCase().includes(q) ||
      (beer.category || '').toLowerCase().includes(q)
    )
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cervezas</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona tu catálogo de cervezas
          </p>
        </div>
        <Link
          href="/admin/beers/new"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nueva Cerveza
        </Link>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar cervezas..."
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
              {filtered.map((beer) => (
                <tr key={beer.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{beer.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{beer.brand || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{beer.category || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{beer.abv ?? '-'}{beer.abv ? '%' : ''}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/beers/${beer.id}/edit`} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDelete(beer.id, beer.name)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">No hay cervezas para mostrar.</div>
          )}
        </div>
      )}
    </div>
  )
}
