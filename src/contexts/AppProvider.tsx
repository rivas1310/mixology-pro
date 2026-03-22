'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AppContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  favorites: string[]
  toggleFavorite: (cocktailId: string) => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    }

    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  const toggleFavorite = (cocktailId: string) => {
    setFavorites((prev) =>
      prev.includes(cocktailId)
        ? prev.filter((id) => id !== cocktailId)
        : [...prev, cocktailId]
    )
  }

  const addToSearchHistory = (query: string) => {
    const normalized = query.trim()
    if (normalized && !searchHistory.includes(normalized)) {
      setSearchHistory((prev) => [normalized, ...prev.slice(0, 9)])
    }
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        favorites,
        toggleFavorite,
        searchHistory,
        addToSearchHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

