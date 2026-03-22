'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Droplets,
  Zap,
  Award,
  BookOpen,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Plus,
  Minus,
  Info,
  Calendar,
  MapPin,
  ArrowLeft,
  Package,
  Wine,
  ShoppingCart,
  DollarSign,
  Shield,
  Flame,
  Snowflake,
  Heart,
  Beer,
  Palette,
  Flower2,
  UtensilsCrossed,
} from 'lucide-react'

interface Beer {
  id: string
  name: string
  category: string
  type: string
  brewery?: string
  origin?: string
  state?: string
  abv: number
  ibu?: number
  description: string
  flavors: string[]
  pairings: string[]
  image?: string
  rating: number
  isPremium: boolean
  isCraft?: boolean
  price?: number
  servingTemp?: string
  color?: string
  aroma?: string
  flavor?: string
  pairing?: string
  glassType?: string
}

// Función para obtener el código de país desde el nombre
const getCountryCode = (countryName: string): string => {
  const countryMap: { [key: string]: string } = {
    'méxico': 'MX', 'mexico': 'MX',
    'estados unidos': 'US', 'usa': 'US', 'eeuu': 'US',
    'alemania': 'DE', 'germany': 'DE',
    'bélgica': 'BE', 'belgica': 'BE', 'belgium': 'BE',
    'reino unido': 'GB', 'inglaterra': 'GB', 'uk': 'GB', 'gran bretaña': 'GB',
    'irlanda': 'IE', 'ireland': 'IE',
    'holanda': 'NL', 'países bajos': 'NL', 'netherlands': 'NL',
    'españa': 'ES', 'spain': 'ES',
    'república checa': 'CZ', 'checa': 'CZ', 'czech': 'CZ',
    'japón': 'JP', 'japan': 'JP',
    'china': 'CN',
    'brasil': 'BR', 'brazil': 'BR',
    'argentina': 'AR',
    'chile': 'CL',
    'colombia': 'CO',
    'perú': 'PE', 'peru': 'PE',
    'canadá': 'CA', 'canada': 'CA',
    'australia': 'AU',
    'francia': 'FR', 'france': 'FR',
    'italia': 'IT', 'italy': 'IT',
    'portugal': 'PT'
  }
  
  const normalized = countryName.toLowerCase().trim()
  return countryMap[normalized] || ''
}

const categoryConfig = {
  lagers: {
    name: 'Lagers',
    icon: Wine,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
    description: 'Cervezas doradas, refrescantes y fáciles de beber',
    subcategories: ['Pilsner', 'Helles', 'Dunkel', 'Bock']
  },
  ales: {
    name: 'Ales',
    icon: Star,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    description: 'Cervezas con más cuerpo y sabor, fermentación alta',
    subcategories: ['IPA', 'Pale Ale', 'Stout', 'Porter']
  },
  wheat: {
    name: 'Trigo',
    icon: Droplets,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    description: 'Cervezas de trigo, suaves y refrescantes',
    subcategories: ['Hefeweizen', 'Witbier', 'Weissbier', 'American Wheat']
  },
  specialty: {
    name: 'Especiales',
    icon: Award,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-purple-900/20',
    description: 'Cervezas artesanales y de temporada',
    subcategories: ['Sour', 'Fruit Beer', 'Barrel Aged', 'Seasonal']
  },
  crafts: {
    name: 'Artesanales',
    icon: Flame,
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
    description: 'Cervezas artesanales de alta calidad',
    subcategories: ['IPA Artesanal', 'Pale Ale Artesanal', 'Stout Artesanal', 'Porter Artesanal']
  },
  imports: {
    name: 'Importadas',
    icon: Package,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    description: 'Cervezas importadas de todo el mundo',
    subcategories: ['Alemanas', 'Belgas', 'Británicas', 'Americanas']
  },
  nonalcoholic: {
    name: 'Sin Alcohol',
    icon: Snowflake,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-cyan-900/20',
    description: 'Cervezas sin alcohol con gran sabor',
    subcategories: ['Lager 0%', 'Ale 0%', 'Wheat 0%', 'IPA 0%']
  },
  seasonal: {
    name: 'De Temporada',
    icon: Calendar,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    description: 'Cervezas especiales de temporada',
    subcategories: ['Primavera', 'Verano', 'Otoño', 'Invierno']
  }
}

type CategoryInfoEntry = (typeof categoryConfig)[keyof typeof categoryConfig]

/** Muestra amargor como "35 IBU" (el IBU no es %; si el texto ya trae unidades, no duplicamos). */
function formatIbuDisplay(ibu: number | undefined | null): string {
  if (ibu == null || Number.isNaN(ibu)) return '—'
  return `${ibu} IBU`
}

/** Añade °C si el valor no indica ya °C / °F u otra unidad. */
function formatServingTempDisplay(raw: string | undefined | null): string {
  if (raw == null) return '—'
  const t = raw.trim()
  if (t === '') return '—'
  if (t.includes('°') || /celsius|fahrenheit|º\s*[cf]/i.test(t)) return t
  return `${t} °C`
}

function ExpandablePanelText({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const trimmed = text.trim()
  const long = trimmed.length > 110

  return (
    <div>
      <p
        className={`text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 ${
          open || !long ? '' : 'line-clamp-3'
        }`}
      >
        {trimmed}
      </p>
      {long && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen((v) => !v)
          }}
          className="mt-1.5 text-xs font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
        >
          {open ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  )
}

function SensorBlock({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-amber-300/70 bg-gradient-to-br from-amber-100/95 via-amber-50/75 to-orange-50/60 p-3 shadow-sm dark:border-amber-700/45 dark:from-amber-900/60 dark:via-amber-800/40 dark:to-orange-900/25">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-800/90 dark:text-amber-200/80">
        <span className="text-amber-700 dark:text-amber-300">{icon}</span>
        {label}
      </div>
      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{children}</div>
    </div>
  )
}

function BeerListingCard({
  beer,
  categorySlug,
  categoryInfo,
}: {
  beer: Beer
  categorySlug: string
  categoryInfo: CategoryInfoEntry
}) {
  const Icon = categoryInfo.icon
  const countryCode = beer.origin ? getCountryCode(beer.origin) : ''

  return (
    <Link href={`/beers/${categorySlug}/${beer.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-violet-300/70 bg-gradient-to-b from-fuchsia-50/90 via-violet-50/80 to-cyan-50/40 shadow-lg ring-1 ring-violet-200/70 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/80 hover:shadow-violet-500/20 hover:ring-violet-400/30 dark:border-violet-800/35 dark:from-violet-950/80 dark:via-violet-950/55 dark:to-cyan-950/45 dark:ring-violet-500/20 dark:hover:border-violet-500/45 dark:hover:shadow-violet-500/15 dark:hover:ring-violet-400/30">
        <div className="relative h-56 overflow-hidden">
          {beer.image ? (
            <img
              src={beer.image}
              alt={beer.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${categoryInfo.bgColor}`}
            >
              <Icon className="h-20 w-20 text-purple-600 dark:text-purple-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1.5">
              {beer.isCraft && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-1 text-xs font-bold text-white shadow-md backdrop-blur-sm">
                  <Beer className="h-3.5 w-3.5" />
                  Artesanal
                </span>
              )}
              {beer.isPremium && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/95 px-2.5 py-1 text-xs font-bold text-zinc-900 shadow-md backdrop-blur-sm">
                  <Award className="h-3.5 w-3.5" />
                  Premium
                </span>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-gradient-to-r from-amber-400/95 to-orange-500/95 px-2.5 py-1 text-sm font-bold text-white shadow-md ring-1 ring-white/25 backdrop-blur-sm">
              {beer.abv}% vol
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold leading-tight text-white drop-shadow-md sm:text-xl">
              {beer.name}
            </h3>
            <p className="mt-0.5 text-sm text-white/90 drop-shadow">{beer.brewery}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          {beer.origin && (
            <div className="flex items-start gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
              {countryCode ? (
                <img
                  src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                  alt={beer.origin}
                  className="mt-0.5 h-5 w-auto rounded shadow-sm"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : (
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              )}
              <span className="text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-200">
                {beer.origin}
                {beer.state && (
                  <span className="text-zinc-500 dark:text-zinc-400"> • {beer.state}</span>
                )}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-violet-400/85 bg-gradient-to-br from-violet-200/95 via-fuchsia-100/85 to-violet-50/50 p-3 shadow-sm dark:border-violet-700/55 dark:from-violet-900/70 dark:via-fuchsia-800/40 dark:to-cyan-900/25">
              <div className="mb-1 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span className="text-xs font-semibold text-violet-900/90 dark:text-violet-200/90">IBU</span>
              </div>
              <p className="text-xl font-bold tabular-nums leading-tight text-violet-950 dark:text-violet-100">
                {formatIbuDisplay(beer.ibu)}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-600/80 dark:text-violet-300/70">
                amargor
              </p>
            </div>
            <div className="rounded-xl border border-cyan-400/85 bg-gradient-to-br from-cyan-200/95 via-sky-100/85 to-cyan-50/45 p-3 shadow-sm dark:border-cyan-700/55 dark:from-sky-900/70 dark:via-cyan-800/40 dark:to-cyan-900/25">
              <div className="mb-1 flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold text-sky-900/90 dark:text-cyan-200/90">Servir</span>
              </div>
              <p className="text-sm font-bold leading-snug text-cyan-950 dark:text-cyan-100">
                {formatServingTempDisplay(beer.servingTemp)}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-600/80 dark:text-cyan-300/70">
                temperatura
              </p>
            </div>
          </div>

          {(beer.color || beer.glassType) && (
            <div className="grid gap-2.5">
              {beer.color && (
                <SensorBlock
                  icon={<Palette className="h-4 w-4" />}
                  label="Color"
                >
                  {beer.color}
                </SensorBlock>
              )}
              {beer.glassType && (
                <SensorBlock
                  icon={<Wine className="h-4 w-4" />}
                  label="Vaso"
                >
                  {beer.glassType}
                </SensorBlock>
              )}
            </div>
          )}

          {(beer.aroma || beer.flavor) && (
            <div className="space-y-3">
              {beer.aroma && (
                <div>
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-purple-200">
                    <Flower2 className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                    Aroma
                  </p>
                  <ExpandablePanelText text={beer.aroma} />
                </div>
              )}
              {beer.flavor && (
                <div>
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-pink-200">
                    <Droplets className="h-3.5 w-3.5 text-pink-500 dark:text-pink-400" />
                    Sabor
                  </p>
                  <ExpandablePanelText text={beer.flavor} />
                </div>
              )}
            </div>
          )}

          {beer.pairing && (
            <div className="rounded-xl border border-orange-300/70 bg-gradient-to-br from-amber-200/70 via-orange-100/60 to-rose-100/40 p-3 shadow-sm dark:border-orange-700/55 dark:from-amber-900/60 dark:via-orange-800/40 dark:to-rose-800/25">
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-amber-200">
                <UtensilsCrossed className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                Maridaje
              </p>
              <ExpandablePanelText text={beer.pairing} />
            </div>
          )}

          {beer.price != null && beer.price > 0 && (
            <div className="mt-auto border-t border-violet-200/70 bg-violet-50/80 pt-4 dark:border-zinc-800 dark:bg-violet-950/35 dark:via-violet-900/30">
              <div className="flex items-end justify-between gap-2">
                <span className="bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-violet-300 dark:to-fuchsia-300">
                  ${beer.price.toFixed(2)}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-violet-200">
                  por botella
                </span>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

export default function CategoryBeersPage() {
  const params = useParams()
  const category = params?.category as string
  const [beers, setBeers] = useState<Beer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')

  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig]

  useEffect(() => {
    const loadBeers = async () => {
      try {
        setLoading(true)
        
        // Cargar cervezas reales desde la API
        const response = await fetch(`/api/beers?limit=1000`)
        
        if (response.ok) {
          const data = await response.json()
          
          const beersData = Array.isArray(data) ? data : (data.beers || [])
          
          // Mapear categorías de URL a categorías de base de datos.
          // Incluye alias para compatibilidad con datos creados antes
          // (cuando el admin usaba `category` para subestilos como IPA/Stout/Porter).
          const categoryMap: { [key: string]: string[] } = {
            lagers: ['LAGER', 'PILSENER', 'LAMBIC'],
            ales: ['ALE', 'IPA', 'STOUT', 'PORTER'],
            wheat: ['WHEAT'],
            specialty: ['SPECIALTY'],
            crafts: ['CRAFT'],
            imports: ['IMPORT'],
            nonalcoholic: ['NONALCOHOLIC'],
            seasonal: ['SEASONAL'],
          }

          const dbCategories =
            categoryMap[category.toLowerCase()] || [category.toUpperCase()]
          const categoryName = categoryInfo?.name || category

          const filteredData = beersData.filter((beer: any) => {
            const beerCategory = beer.category?.toUpperCase() || ''
            return dbCategories.includes(beerCategory)
          })
          
          // Transformar datos de la API al formato del componente
          const transformedBeers: Beer[] = filteredData.map((beer: any) => ({
            id: beer.id,
            name: beer.name,
            category: categoryName,
            type: beer.type || 'Cerveza',
            brewery: beer.brand || 'Sin marca',
            origin: beer.origin || 'No especificado',
            state: beer.state,
            abv: beer.abv || 0,
            ibu: beer.ibu || 0,
            description: beer.description || 'Sin descripción',
            flavors: ['Malta', 'Lúpulo', 'Equilibrado'],
            pairings: ['Comida casual', 'Snacks', 'Platillos típicos'],
            image: beer.image,
            rating: beer.rating || 4.0,
            isPremium: beer.isPremium || false,
            isCraft: beer.isCraft || false,
            price: beer.price || 0,
            servingTemp: beer.servingTemp || '4-7°C',
            color: beer.color,
            aroma: beer.aroma,
            flavor: beer.flavor,
            pairing: beer.pairing,
            glassType: beer.glassType
          }))
          
          setBeers(transformedBeers)
        }
      } catch (error) {
        console.error('Error loading beers:', error)
        setBeers([])
      } finally {
        setLoading(false)
      }
    }

    if (categoryInfo) {
      loadBeers()
    }
  }, [category, categoryInfo])

  const filteredBeers = beers.filter(beer => {
    const matchesSearch = beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beer.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubcategory = selectedSubcategory === 'all' || 
                              beer.type.toLowerCase().includes(selectedSubcategory.toLowerCase())
    
    return matchesSearch && matchesSubcategory
  })

  // Agrupar cervezas por subcategoría para mostrar mejor organización
  const groupedBeers = beers.reduce((acc, beer) => {
    const subcategory = beer.type
    if (!acc[subcategory]) {
      acc[subcategory] = []
    }
    acc[subcategory].push(beer)
    return acc
  }, {} as Record<string, Beer[]>)
  const subcategoryOptions = Object.keys(groupedBeers).sort((a, b) => a.localeCompare(b))

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Categoría no encontrada
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            La categoría &quot;{category}&quot; no existe.
          </p>
          <Link
            href="/beers"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Cervezas
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando cervezas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/beers"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Cervezas
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className={`relative w-20 h-20 bg-gradient-to-br ${categoryInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <categoryInfo.icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {categoryInfo.description}
            </p>
            <div className="flex justify-center gap-4 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" /> {beers.length} Cervezas
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" /> Premium
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Buscar en ${categoryInfo.name.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                />
              </div>

              {/* Subcategory Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none"
                >
                  <option value="all">Todos los tipos</option>
                  {subcategoryOptions.map(subcategory => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSubcategory('all')
                  }}
                  className="w-full py-3 text-lg rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Subcategorías de {categoryInfo.name}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryInfo.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? 'all' : subcategory)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedSubcategory === subcategory
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-sm mb-1">{subcategory}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {beers.filter(beer => beer.type.toLowerCase().includes(subcategory.toLowerCase())).length} cervezas
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedSubcategory === 'all' ? `${categoryInfo.name} Disponibles` : `${selectedSubcategory} - ${categoryInfo.name}`}
            </h2>
            <span className="text-gray-600 dark:text-gray-300">
              {filteredBeers.length} cervezas encontradas
            </span>
          </div>

          {filteredBeers.length === 0 ? (
            <div className="text-center py-20">
              <categoryInfo.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron cervezas
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay cervezas disponibles en esta categoría'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : selectedSubcategory === 'all' ? (
            // Mostrar agrupado por subcategorías cuando se selecciona "all"
            <div className="space-y-12">
              {Object.entries(groupedBeers).map(([subcategory, subcategoryBeers], groupIndex) => (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {subcategory}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {subcategoryBeers.length} cervezas en esta subcategoría
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategoryBeers.map((beer, index) => (
                      <motion.div
                        key={beer.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (groupIndex * 0.1) + (index * 0.05) }}
                      >
                        <BeerListingCard
                          beer={beer}
                          categorySlug={category}
                          categoryInfo={categoryInfo}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Mostrar cervezas filtradas por subcategoría
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBeers.map((beer, index) => (
                <motion.div
                  key={beer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BeerListingCard
                    beer={beer}
                    categorySlug={category}
                    categoryInfo={categoryInfo}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
