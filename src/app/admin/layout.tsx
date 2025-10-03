'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Wine, 
  Package, 
  Users, 
  Settings, 
  BarChart3,
  FileText,
  Image,
  LogOut,
  Menu,
  X,
  Shield,
  Sparkles
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Resumen general'
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
    title: 'Ingredientes',
    href: '/admin/ingredients',
    icon: FileText,
    description: 'Frutas, jugos, etc.'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mixology Pro
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {adminNavItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  pathname === item.href
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  pathname === item.href 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-400 group-hover:text-primary-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                </div>
                {pathname === item.href && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                Administrador
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                admin@mixologypro.com
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Panel de Administración
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Gestiona recetas, licores y contenido
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Sistema Activo
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
