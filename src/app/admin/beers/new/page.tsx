'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft, 
  Beer,
  Award,
  DollarSign,
  MapPin
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import toast from 'react-hot-toast'

// Grupos de categoría tal como los consume el frontend:
// /beers/[category] -> category en BD (LAGER/ALE/WHEAT/SPECIALTY/...)
const beerCategories = [
  { value: 'LAGER', label: 'Lagers' },
  { value: 'ALE', label: 'Ales' },
  { value: 'WHEAT', label: 'Trigo' },
  { value: 'SPECIALTY', label: 'Especiales' },
  { value: 'CRAFT', label: 'Artesanales' },
  { value: 'IMPORT', label: 'Importadas' },
  { value: 'NONALCOHOLIC', label: 'Sin Alcohol' },
  { value: 'SEASONAL', label: 'De Temporada' },
]

// Subestilos tal como los consume el frontend:
// /beers/[category] -> type en BD (ej: "Pale Ale")
const beerTypes = [
  // Lagers
  { value: 'Pilsner', label: 'Pilsner' },
  { value: 'Helles', label: 'Helles' },
  { value: 'Dunkel', label: 'Dunkel' },
  { value: 'Bock', label: 'Bock' },

  // Ales
  { value: 'IPA', label: 'IPA' },
  { value: 'Pale Ale', label: 'Pale Ale' },
  { value: 'Stout', label: 'Stout' },
  { value: 'Porter', label: 'Porter' },

  // Trigo
  { value: 'Hefeweizen', label: 'Hefeweizen' },
  { value: 'Witbier', label: 'Witbier' },
  { value: 'Weissbier', label: 'Weissbier' },
  { value: 'American Wheat', label: 'American Wheat' },

  // Especiales
  { value: 'Sour', label: 'Sour' },
  { value: 'Fruit Beer', label: 'Fruit Beer' },
  { value: 'Barrel Aged', label: 'Barrel Aged' },
  { value: 'Seasonal', label: 'Seasonal' },

  // Artesanales
  { value: 'IPA Artesanal', label: 'IPA Artesanal' },
  { value: 'Pale Ale Artesanal', label: 'Pale Ale Artesanal' },
  { value: 'Stout Artesanal', label: 'Stout Artesanal' },
  { value: 'Porter Artesanal', label: 'Porter Artesanal' },

  // Importadas
  { value: 'Alemanas', label: 'Alemanas' },
  { value: 'Belgas', label: 'Belgas' },
  { value: 'Británicas', label: 'Británicas' },
  { value: 'Americanas', label: 'Americanas' },

  // Sin alcohol
  { value: 'Lager 0%', label: 'Lager 0%' },
  { value: 'Ale 0%', label: 'Ale 0%' },
  { value: 'Wheat 0%', label: 'Wheat 0%' },
  { value: 'IPA 0%', label: 'IPA 0%' },

  // De temporada
  { value: 'Primavera', label: 'Primavera' },
  { value: 'Verano', label: 'Verano' },
  { value: 'Otoño', label: 'Otoño' },
  { value: 'Invierno', label: 'Invierno' },
]

export default function NewBeerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: 'Pilsner',
    category: 'LAGER',
    description: '',
    image: '',
    imageKey: '',
    abv: '',
    ibu: '',
    origin: '',
    state: '',
    servingTemp: '',
    price: '',
    isCraft: true,
    // Notas de cata
    tastingNotes: '',
    color: '',
    aroma: '',
    flavor: '',
    pairing: '',
    glassType: ''
  })

  // Función para obtener el código de país (ISO 3166-1 alpha-2) desde el nombre del país
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
      const beerData = {
        name: formData.name,
        brand: formData.brand,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        image: formData.image,
        imageKey: formData.imageKey,
        abv: formData.abv,
        ibu: formData.ibu,
        origin: formData.origin,
        state: formData.state,
        servingTemp: formData.servingTemp,
        price: formData.price,
        isCraft: formData.isCraft,
        tastingNotes: formData.tastingNotes,
        color: formData.color,
        aroma: formData.aroma,
        flavor: formData.flavor,
        pairing: formData.pairing,
        glassType: formData.glassType
      }

      const response = await fetch('/api/admin/beers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beerData),
      })

      if (response.ok) {
        toast.success('Cerveza creada exitosamente')
        router.push('/admin/beers')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error creando la cerveza')
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
              Nueva Cerveza
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Añade una nueva cerveza con imagen y detalles
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
                  Nombre de la Cerveza *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Corona Extra"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marca *
                </label>
                <Input
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Ej: Corona"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo *
                </label>
                <Input
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  list="beer-types-list"
                  placeholder="Ej: Pale Ale, IPA, Stout..."
                  required
                />
                <datalist id="beer-types-list">
                  {beerTypes.map((type) => (
                    <option key={type.value} value={type.value} />
                  ))}
                </datalist>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría *
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  list="beer-categories-list"
                  placeholder="Ej: LAGER, ALE, WHEAT..."
                  required
                />
                <datalist id="beer-categories-list">
                  {beerCategories.map((category) => (
                    <option key={category.value} value={category.value} />
                  ))}
                </datalist>
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
                placeholder="Describe la cerveza, su sabor, proceso de elaboración..."
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
              Imagen de la Cerveza
            </h2>
            
            <ImageUpload
              folder="beers"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Tasting Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Notas de Cata
            </h2>
            
            <div className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <Input
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Ej: Dorado pálido, Ámbar, Negro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Vaso
                  </label>
                  <Input
                    value={formData.glassType}
                    onChange={(e) => handleInputChange('glassType', e.target.value)}
                    placeholder="Ej: Pinta, Tulipa, Flauta, Jarra"
                  />
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
                  placeholder="Describe los aromas: malta, lúpulo, frutas, especias..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sabor
                </label>
                <Textarea
                  value={formData.flavor}
                  onChange={(e) => handleInputChange('flavor', e.target.value)}
                  rows={2}
                  placeholder="Describe el sabor en boca: dulzor, amargor, cuerpo..."
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
                  placeholder="Ej: Carnes asadas, mariscos, quesos suaves..."
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
                  placeholder="4.5"
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  IBU (Amargor)
                </label>
                <Input
                  value={formData.ibu}
                  onChange={(e) => handleInputChange('ibu', e.target.value)}
                  placeholder="15"
                  type="number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  País de Origen
                </label>
                <div className="relative">
                  <Input
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    placeholder="Ej: México, Alemania, Bélgica"
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
                  Estado / Región
                </label>
                <Input
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Ej: Jalisco, Bavaria, Flandes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperatura Recomendada
                </label>
                <Input
                  value={formData.servingTemp}
                  onChange={(e) => handleInputChange('servingTemp', e.target.value)}
                  placeholder="Ej: 4-7°C"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Lagers: 2-4°C, Ales: 4-7°C, Stouts: 6-8°C
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio (USD)
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="2.50"
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
          </motion.div>

          {/* Craft Status */}
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
                id="isCraft"
                checked={formData.isCraft}
                onChange={(e) => handleInputChange('isCraft', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isCraft" className="text-sm text-gray-700 dark:text-gray-300">
                Cerveza artesanal
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
