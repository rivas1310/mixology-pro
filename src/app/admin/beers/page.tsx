'use client'

import Link from 'next/link'
import { Plus, Beer } from 'lucide-react'

export default function AdminBeersPage() {
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

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <Beer className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gestión de Cervezas
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Esta sección te permite administrar tu catálogo completo de cervezas
        </p>
        <Link
          href="/admin/beers/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Agregar Primera Cerveza
        </Link>
      </div>
    </div>
  )
}
