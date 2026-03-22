'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const settingsTabs = [
  { href: '/admin/settings', label: 'Resumen', exact: true },
  { href: '/admin/settings/security', label: 'Seguridad', exact: false },
]

export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? ''

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div>
      <div className="mb-6">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>Admin</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="text-gray-900 dark:text-white font-medium">
            Configuración
          </span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Ajustes del sistema y del panel de administración
        </p>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-px">
          {settingsTabs.map((tab) => {
            const active = isActive(tab.href, tab.exact)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                  active
                    ? 'bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 border border-b-0 border-gray-200 dark:border-gray-700 -mb-px'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      {children}
    </div>
  )
}
