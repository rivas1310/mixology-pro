'use client'

import { Settings, Save, Bell, Shield, Palette, Globe } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Ajustes generales del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">General</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configuración básica</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Nombre del sitio, descripción, idioma, zona horaria
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Seguridad</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Permisos y accesos</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Autenticación, roles, permisos de usuarios
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alertas y emails</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Configurar notificaciones por email, push y alertas
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
              <Palette className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Apariencia</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tema y colores</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Personalizar tema, colores, logo y diseño
          </p>
        </div>
      </div>
    </div>
  )
}
