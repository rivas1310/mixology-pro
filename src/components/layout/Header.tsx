'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, Moon, Sun, Wine, Search, ChevronDown } from 'lucide-react'
import { useApp } from '@/contexts/AppProvider'
import { COCKTAIL_CATEGORIES } from '@/lib/constants'

const navItems = [
  { name: 'Cervezas', href: '/beers' },
  { name: 'Vinos', href: '/wines' },
  { name: 'Licores', href: '/spirits' },
  { name: 'Técnicas', href: '/techniques' },
  { name: 'Herramientas', href: '/tools' },
  { name: 'Ingredientes', href: '/ingredients' },
]

const cocktailDropdownItems = [
  { name: 'Todos', href: '/cocktails' },
  ...COCKTAIL_CATEGORIES.map((c) => ({
    name: c.label,
    href: `/cocktails/${encodeURIComponent(c.value)}`,
  })),
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCocktailDropdownOpen, setIsCocktailDropdownOpen] = useState(false)
  const [isCocktailMobileOpen, setIsCocktailMobileOpen] = useState(false)
  const pathname = usePathname()
  const path = pathname ?? ''
  const { theme, setTheme, favorites } = useApp()
  const cocktailDropdownRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cocktailDropdownRef.current &&
        !cocktailDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCocktailDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsCocktailDropdownOpen(false)
    setIsCocktailMobileOpen(false)
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-beige/80 bg-white/95 backdrop-blur-sm dark:border-primary-700 dark:bg-primary-900/95">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-1 items-center space-x-2">
            <Wine className="h-5 w-5 text-olive dark:text-gold-light" />
            <span className="font-display text-lg font-semibold text-primary-800 dark:text-cream-100">
              Mixology
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-5 md:flex">
            <div
              ref={cocktailDropdownRef}
              className="relative"
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] transition-colors ${
                  path.startsWith('/cocktails')
                    ? 'border-b border-gold text-gold-dark'
                    : 'text-primary-700 hover:text-gold-dark dark:text-gray-300 dark:hover:text-gold-light'
                }`}
                onClick={() => setIsCocktailDropdownOpen((prev) => !prev)}
                aria-expanded={isCocktailDropdownOpen}
                aria-label="Abrir categorías de cocktails"
              >
                Cocktails
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${isCocktailDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isCocktailDropdownOpen && (
                <div className="absolute left-0 top-8 max-h-[min(70vh,420px)] min-w-[200px] overflow-y-auto border border-beige bg-white p-1 shadow-sm dark:border-primary-700 dark:bg-primary-900">
                  {cocktailDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 text-xs uppercase tracking-[0.06em] transition-colors ${
                        path === item.href
                          ? 'bg-cream text-gold-dark dark:bg-primary-800 dark:text-gold-light'
                          : 'text-primary-700 hover:bg-cream-50 dark:text-gray-300 dark:hover:bg-primary-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs tracking-[0.08em] uppercase transition-colors ${
                  path === item.href
                    ? 'border-b border-gold text-gold-dark'
                    : 'text-primary-700 hover:text-gold-dark dark:text-gray-300 dark:hover:text-gold-light'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end space-x-3">
            <button
              aria-label="Buscar bebidas"
              className="hidden p-2 text-primary-600 transition-colors hover:text-gold-dark md:flex dark:text-gray-300 dark:hover:text-gold-light"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/favorites"
              className="relative p-2 text-primary-600 transition-colors hover:text-gold-dark dark:text-gray-300 dark:hover:text-gold-light"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-800 text-xs font-medium text-cream-50">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 text-primary-600 transition-colors hover:text-gold-dark dark:text-gray-300 dark:hover:text-gold-light"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary-700 md:hidden dark:text-gray-300"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="space-y-1 border-t border-beige py-4 md:hidden dark:border-primary-700">
            <div className="border-b border-beige/70 pb-2 dark:border-primary-700">
              <button
                type="button"
                onClick={() => setIsCocktailMobileOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${
                  path.startsWith('/cocktails') ? 'bg-cream text-gold-dark' : 'text-primary-700'
                }`}
                aria-expanded={isCocktailMobileOpen}
              >
                Cocktails
                <ChevronDown className={`h-4 w-4 transition-transform ${isCocktailMobileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCocktailMobileOpen && (
                <div className="mt-1 space-y-1 pl-3">
                  {cocktailDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 text-sm transition-colors ${
                        path === item.href ? 'bg-cream text-gold-dark' : 'text-primary-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-sm transition-colors ${
                  path === item.href
                    ? 'bg-cream text-gold-dark'
                    : 'text-primary-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
