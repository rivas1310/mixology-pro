'use client'

import { Image, Upload } from 'lucide-react'

export default function AdminMediaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Galería de Imágenes</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona todas las imágenes del sistema
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
          <Upload className="h-5 w-5" />
          Subir Imagen
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Galería de Imágenes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Administra y organiza todas las imágenes de tus productos
        </p>
      </div>
    </div>
  )
}
