'use client'

import Link from 'next/link'
import { Plus, Grape } from 'lucide-react'

export default function AdminWinesPage() {
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

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <Grape className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gestión de Vinos
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Esta sección te permite administrar tu catálogo completo de vinos
        </p>
        <Link
          href="/admin/wines/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Agregar Primer Vino
        </Link>
      </div>
    </div>
  )
}
