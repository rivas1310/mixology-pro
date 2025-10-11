'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft, 
  Wine,
  Award,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const wineCategories = [
  { value: 'RED', label: 'Tinto' },
  { value: 'WHITE', label: 'Blanco' },
  { value: 'ROSE', label: 'Rosado' },
  { value: 'SPARKLING', label: 'Espumoso' },
  { value: 'DESSERT', label: 'Postre' },
  { value: 'FORTIFIED', label: 'Fortificado' }
]

const wineTypes = [
  { value: 'TABLE', label: 'Mesa' },
  { value: 'PREMIUM', label: 'Premium' },
  { value: 'RESERVE', label: 'Reserva' },
  { value: 'GRAN_RESERVE', label: 'Gran Reserva' }
]

export default function NewWinePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: 'TABLE',
    category: 'RED',
    description: '',
    image: '',
    imageKey: '',
    abv: '',
    vintage: '',
    origin: '',
    region: '',
    denomination: '',
    grapeVariety: '',
    winery: '',
    servingTemp: '',
    price: '',
    isPremium: false,
    // Notas de cata
    tastingNotes: '',
    color: '',
    aroma: '',
    taste: '',
    body: '',
    acidity: '',
    tannins: '',
    finish: '',
    pairing: '',
    awards: ''
  })

  // Función para obtener el código de país (ISO 3166-1 alpha-2) desde el nombre del país
  const getCountryCode = (countryName: string): string => {
    const countryMap: { [key: string]: string } = {
      'méxico': 'MX', 'mexico': 'MX',
      'españa': 'ES', 'spain': 'ES',
      'francia': 'FR', 'france': 'FR',
      'italia': 'IT', 'italy': 'IT',
      'portugal': 'PT',
      'alemania': 'DE', 'germany': 'DE',
      'argentina': 'AR',
      'chile': 'CL',
      'estados unidos': 'US', 'usa': 'US', 'eeuu': 'US',
      'australia': 'AU',
      'nueva zelanda': 'NZ', 'new zealand': 'NZ',
      'sudáfrica': 'ZA', 'south africa': 'ZA',
      'austria': 'AT',
      'grecia': 'GR', 'greece': 'GR',
      'hungría': 'HU', 'hungary': 'HU',
      'rumania': 'RO', 'romania': 'RO'
    }
    
    const normalized = countryName.toLowerCase().trim()
    return countryMap[normalized] || ''
  }

  const countryCode = getCountryCode(formData.origin)
  const flagUrl = countryCode ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` : ''

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (url: string, key: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
      imageKey: key
    }))
    toast.success('Imagen subida exitosamente')
  }

  const handleImageRemove = (key: string) => {
    setFormData(prev => ({
      ...prev,
      image: '',
      imageKey: ''
    }))
    toast.success('Imagen eliminada')
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.brand || !formData.type || !formData.category) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const wineData = {
        name: formData.name,
        brand: formData.brand,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        image: formData.image,
        imageKey: formData.imageKey,
        abv: formData.abv,
        vintage: formData.vintage,
        origin: formData.origin,
        region: formData.region,
        denomination: formData.denomination,
        grapeVariety: formData.grapeVariety,
        winery: formData.winery,
        servingTemp: formData.servingTemp,
        price: formData.price,
        isPremium: formData.isPremium,
        tastingNotes: formData.tastingNotes,
        color: formData.color,
        aroma: formData.aroma,
        taste: formData.taste,
        body: formData.body,
        acidity: formData.acidity,
        tannins: formData.tannins,
        finish: formData.finish,
        pairing: formData.pairing,
        awards: formData.awards
      }

      const response = await fetch('/api/admin/wines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wineData),
      })

      if (response.ok) {
        toast.success('Vino creado exitosamente')
        router.push('/admin/wines')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error creando el vino')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nuevo Vino
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Añade un nuevo vino con imagen y detalles
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar
            </>
          )}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del Vino *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Château Margaux"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bodega *
                </label>
                <Input
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Ej: Château Margaux"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo *
                </label>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                >
                  {wineTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría *
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  {wineCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                placeholder="Describe el vino, su sabor, proceso de elaboración..."
              />
            </div>
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Imagen del Vino
            </h2>
            
            <ImageUpload
              folder="wines"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Origen y Producción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Origen y Producción
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  País de Origen
                </label>
                <div className="relative">
                  <Input
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    placeholder="Ej: Francia, España, Italia"
                    className={flagUrl ? 'pr-12' : ''}
                  />
                  {flagUrl && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <img 
                        src={flagUrl} 
                        alt={formData.origin}
                        className="h-6 w-auto rounded shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
                {formData.origin && !countryCode && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    País no reconocido. Verifica la ortografía.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Región
                </label>
                <Input
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  placeholder="Ej: Bordeaux, Rioja, Toscana"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Denominación de Origen
                </label>
                <Input
                  value={formData.denomination}
                  onChange={(e) => handleInputChange('denomination', e.target.value)}
                  placeholder="Ej: D.O.C., A.O.C., D.O.Ca."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variedad de Uva
                </label>
                <Input
                  value={formData.grapeVariety}
                  onChange={(e) => handleInputChange('grapeVariety', e.target.value)}
                  placeholder="Ej: Cabernet Sauvignon, Tempranillo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bodega / Viñedo
                </label>
                <Input
                  value={formData.winery}
                  onChange={(e) => handleInputChange('winery', e.target.value)}
                  placeholder="Ej: Château Margaux"
                />
              </div>
            </div>
          </motion.div>

          {/* Notas de Cata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Notas de Cata
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notas de Cata (Breve)
                </label>
                <Textarea
                  value={formData.tastingNotes}
                  onChange={(e) => handleInputChange('tastingNotes', e.target.value)}
                  rows={3}
                  placeholder="Resumen general de las características organolépticas..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <Input
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Ej: Rojo rubí, Dorado pálido"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cuerpo
                  </label>
                  <Select
                    value={formData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Ligero">Ligero</option>
                    <option value="Medio">Medio</option>
                    <option value="Completo">Completo</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aroma
                </label>
                <Textarea
                  value={formData.aroma}
                  onChange={(e) => handleInputChange('aroma', e.target.value)}
                  rows={2}
                  placeholder="Describe los aromas: frutas, especias, madera..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sabor en Boca
                </label>
                <Textarea
                  value={formData.taste}
                  onChange={(e) => handleInputChange('taste', e.target.value)}
                  rows={2}
                  placeholder="Describe el sabor: dulzor, acidez, taninos..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Acidez
                  </label>
                  <Select
                    value={formData.acidity}
                    onChange={(e) => handleInputChange('acidity', e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Taninos (solo tintos)
                  </label>
                  <Select
                    value={formData.tannins}
                    onChange={(e) => handleInputChange('tannins', e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Suaves">Suaves</option>
                    <option value="Medios">Medios</option>
                    <option value="Firmes">Firmes</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Final / Persistencia
                </label>
                <Textarea
                  value={formData.finish}
                  onChange={(e) => handleInputChange('finish', e.target.value)}
                  rows={2}
                  placeholder="Describe el final en boca: largo, corto, persistente..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maridaje Recomendado
                </label>
                <Textarea
                  value={formData.pairing}
                  onChange={(e) => handleInputChange('pairing', e.target.value)}
                  rows={2}
                  placeholder="Ej: Carnes rojas, quesos curados, chocolate..."
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technical Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Detalles Técnicos
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ABV (% Alcohol)
                </label>
                <Input
                  value={formData.abv}
                  onChange={(e) => handleInputChange('abv', e.target.value)}
                  placeholder="13.5"
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Añada
                </label>
                <Input
                  value={formData.vintage}
                  onChange={(e) => handleInputChange('vintage', e.target.value)}
                  placeholder="2020"
                  type="number"
                  min="1900"
                  max="2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperatura de Servicio
                </label>
                <Input
                  value={formData.servingTemp}
                  onChange={(e) => handleInputChange('servingTemp', e.target.value)}
                  placeholder="Ej: 16-18°C"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Blancos: 8-12°C, Tintos: 14-18°C
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio (USD)
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="150.00"
                  type="number"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Premios y Reconocimientos
                </label>
                <Textarea
                  value={formData.awards}
                  onChange={(e) => handleInputChange('awards', e.target.value)}
                  rows={3}
                  placeholder="Ej: 94 puntos Robert Parker, Medalla de Oro..."
                />
              </div>
            </div>
          </motion.div>

          {/* Premium Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Configuración
            </h3>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isPremium" className="text-sm text-gray-700 dark:text-gray-300">
                Vino premium
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
