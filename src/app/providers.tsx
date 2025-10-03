'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AppContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  favorites: string[]
  toggleFavorite: (cocktailId: string) => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Load search history from localStorage
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
    setFavorites(prev => 
      prev.includes(cocktailId) 
        ? prev.filter(id => id !== cocktailId)
        : [...prev, cocktailId]
    )
  }

  const addToSearchHistory = (query: string) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev.slice(0, 9)]) // Keep last 10 searches
    }
  }

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      favorites,
      toggleFavorite,
      searchHistory,
      addToSearchHistory
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Providers')
  }
  return context
}

