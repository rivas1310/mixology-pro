'use client'

import Link from 'next/link'
import { Bell, Palette, Globe, Shield, ChevronRight } from 'lucide-react'

const cards = [
  {
    href: '#',
    title: 'General',
    description: 'Configuración básica',
    detail: 'Nombre del sitio, descripción, idioma, zona horaria',
    icon: Globe,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600',
    disabled: true,
  },
  {
    href: '/admin/settings/security',
    title: 'Seguridad',
    description: 'Autenticación y sesión',
    detail: 'Contraseña del panel, cookies, buenas prácticas y cierre de sesión',
    icon: Shield,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
    disabled: false,
  },
  {
    href: '#',
    title: 'Notificaciones',
    description: 'Alertas y emails',
    detail: 'Configurar notificaciones por email, push y alertas',
    icon: Bell,
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
    iconColor: 'text-yellow-600',
    disabled: true,
  },
  {
    href: '#',
    title: 'Apariencia',
    description: 'Tema y colores',
    detail: 'Personalizar tema, colores, logo y diseño',
    icon: Palette,
    iconBg: 'bg-pink-100 dark:bg-pink-900/20',
    iconColor: 'text-pink-600',
    disabled: true,
  },
]

export default function AdminSettingsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        const inner = (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {card.title}
                  {!card.disabled && (
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{card.detail}</p>
            {card.disabled && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Próximamente</p>
            )}
          </>
        )

        if (card.disabled || card.href === '#') {
          return (
            <div
              key={card.title}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 opacity-75"
            >
              {inner}
            </div>
          )
        }

        return (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-shadow hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900/40"
          >
            {inner}
          </Link>
        )
      })}
    </div>
  )
}
