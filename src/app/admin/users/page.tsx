'use client'

import { Users, UserPlus, Search } from 'lucide-react'

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
          <UserPlus className="h-5 w-5" />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Gestión de Usuarios
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Administra permisos, roles y accesos de usuarios
        </p>
      </div>
    </div>
  )
}
