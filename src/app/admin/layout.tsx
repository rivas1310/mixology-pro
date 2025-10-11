'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Wine,
  Beer,
  Grape,
  FileText,
  Users,
  Image,
  BarChart3,
  Settings,
  Menu,
  X,
  Shield,
  Beaker,
  Wrench
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Resumen general'
  },
  {
    title: 'Todos los Productos',
    href: '/admin/products',
    icon: Package,
    description: 'Ver, editar y eliminar'
  },
  {
    title: 'Cócteles',
    href: '/admin/cocktails',
    icon: Wine,
    description: 'Gestionar recetas'
  },
  {
    title: 'Licores',
    href: '/admin/spirits',
    icon: Package,
    description: 'Base de datos de licores'
  },
  {
    title: 'Cervezas',
    href: '/admin/beers',
    icon: Beer,
    description: 'Gestionar cervezas'
  },
  {
    title: 'Vinos',
    href: '/admin/wines',
    icon: Grape,
    description: 'Gestionar vinos'
  },
  {
    title: 'Ingredientes',
    href: '/admin/ingredients',
    icon: FileText,
    description: 'Frutas, jugos, etc.'
  },
  {
    title: 'Técnicas',
    href: '/admin/techniques',
    icon: Beaker,
    description: 'Métodos y recetas'
  },
  {
    title: 'Herramientas',
    href: '/admin/tools',
    icon: Wrench,
    description: 'Equipo profesional'
  },
  {
    title: 'Usuarios',
    href: '/admin/users',
    icon: Users,
    description: 'Gestión de usuarios'
  },
  {
    title: 'Imágenes',
    href: '/admin/media',
    icon: Image,
    description: 'Galería de imágenes'
  },
  {
    title: 'Estadísticas',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Reportes y métricas'
  },
  {
    title: 'Configuración',
    href: '/admin/settings',
    icon: Settings,
    description: 'Ajustes del sistema'
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Mixology Pro
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="truncate">{item.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Administrador
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@mixologypro.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Panel de Administración
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Gestiona recetas, licores y contenido
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Sistema Activo
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}