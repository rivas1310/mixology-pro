'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft, 
  Wine,
  Award,
  Plus,
  X
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const spiritCategories = [
  { value: 'WHISKEY', label: 'Whiskey' },
  { value: 'VODKA', label: 'Vodka' },
  { value: 'RUM', label: 'Ron' },
  { value: 'GIN', label: 'Gin' },
  { value: 'TEQUILA', label: 'Tequila' },
  { value: 'COGNAC', label: 'Cognac' },
  { value: 'BRANDY', label: 'Brandy' },
  { value: 'MEZCAL', label: 'Mezcal' },
  { value: 'LIQUEUR', label: 'Licor' }
]

const spiritTypes = [
  { value: 'DESTILADO', label: 'Destilado' },
  { value: 'LICOR', label: 'Licor' },
  { value: 'APERITIVO', label: 'Aperitivo' },
  { value: 'DIGESTIVO', label: 'Digestivo' }
]

interface Presentation {
  volume: string
  packaging: string
  ean: string
}

export default function NewSpiritPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    // Básico
    name: '',
    type: 'DESTILADO',
    category: 'WHISKEY',
    brand: '',
    producer: '',
    owner: '',
    
    // Origen
    origin: '',
    denomination: '',
    
    // Composición
    composition: '',
    
    // Envejecimiento
    aging: '',
    
    // Características
    abv: '',
    color: '',
    
    // Notas de cata
    aroma: '',
    taste: '',
    finish: '',
    
    // Descripción
    description: '',
    
    // Consumo
    servingSuggestions: '',
    temperature: '',
    
    // Maridaje
    pairings: '',
    
    // Notas curiosas
    trivia: '',
    
    // Imagen
    image: '',
    imageKey: '',
    
    // Precio y Premium
    price: '',
    isPremium: false
  })

  const [presentations, setPresentations] = useState<Presentation[]>([
    { volume: '', packaging: '', ean: '' }
  ])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddPresentation = () => {
    setPresentations([...presentations, { volume: '', packaging: '', ean: '' }])
  }

  const handleRemovePresentation = (index: number) => {
    if (presentations.length > 1) {
      setPresentations(presentations.filter((_, i) => i !== index))
    }
  }

  const handlePresentationChange = (index: number, field: keyof Presentation, value: string) => {
    const newPresentations = [...presentations]
    newPresentations[index][field] = value
    setPresentations(newPresentations)
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
    if (!formData.name || !formData.type || !formData.category) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const spiritData = {
        ...formData,
        abv: formData.abv ? parseFloat(formData.abv) : 0,
        price: formData.price ? parseFloat(formData.price) : 0,
        presentations: JSON.stringify(presentations.filter(p => p.volume || p.packaging))
      }

      const response = await fetch('/api/admin/spirits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spiritData),
      })

      if (response.ok) {
        toast.success('Licor creado exitosamente')
        router.push('/admin/spirits')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error creando el licor')
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
              Nuevo Licor / Destilado
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Ficha técnica completa del producto
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
        {/* Main Form - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Información Básica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              1. Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre Comercial *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Johnnie Walker Black Label"
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
                  {spiritTypes.map(type => (
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
                  {spiritCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Graduación Alcohólica (ABV) *
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.abv}
                  onChange={(e) => handleInputChange('abv', e.target.value)}
                  placeholder="40"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* 2. Productor / Marca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              2. Productor / Marca
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marca
                </label>
                <Input
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Ej: Johnnie Walker"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Productor
                </label>
                <Input
                  value={formData.producer}
                  onChange={(e) => handleInputChange('producer', e.target.value)}
                  placeholder="Ej: Diageo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Propietario / Grupo
                </label>
                <Input
                  value={formData.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  placeholder="Ej: Diageo PLC"
                />
              </div>
            </div>
          </motion.div>

          {/* 3. Origen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              3. Origen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  País / Región de Origen
                </label>
                <Input
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Ej: Escocia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Denominación
                </label>
                <Input
                  value={formData.denomination}
                  onChange={(e) => handleInputChange('denomination', e.target.value)}
                  placeholder="Ej: Blended Scotch Whisky"
                />
              </div>
            </div>
          </motion.div>

          {/* 4. Composición y Envejecimiento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              4. Composición y Envejecimiento
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Composición
                </label>
                <Textarea
                  value={formData.composition}
                  onChange={(e) => handleInputChange('composition', e.target.value)}
                  rows={3}
                  placeholder="Ej: Mezcla de aproximadamente 30 whiskies de malta y grano. Incluye maltas reconocidas como Talisker, Cardhu, Caol Ila..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Envejecimiento
                </label>
                <Input
                  value={formData.aging}
                  onChange={(e) => handleInputChange('aging', e.target.value)}
                  placeholder="Ej: Mínimo 12 años"
                />
              </div>
            </div>
          </motion.div>

          {/* 5. Características Organolépticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              5. Características Organolépticas
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <Input
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="Ej: Ámbar profundo con reflejos dorados"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aroma (Nariz)
                </label>
                <Textarea
                  value={formData.aroma}
                  onChange={(e) => handleInputChange('aroma', e.target.value)}
                  rows={2}
                  placeholder="Ej: Rico y complejo: notas de vainilla, frutas secas, especias suaves, ahumado sutil"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sabor (Boca)
                </label>
                <Textarea
                  value={formData.taste}
                  onChange={(e) => handleInputChange('taste', e.target.value)}
                  rows={2}
                  placeholder="Ej: Suave, con sabores equilibrados de malta, madera, caramelo y un final ligeramente ahumado"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Final
                </label>
                <Textarea
                  value={formData.finish}
                  onChange={(e) => handleInputChange('finish', e.target.value)}
                  rows={2}
                  placeholder="Ej: Prolongado, cálido, con toques especiados y de turba ligera"
                />
              </div>
            </div>
          </motion.div>

          {/* 6. Presentaciones Comerciales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                6. Presentaciones Comerciales
              </h2>
              <button
                onClick={handleAddPresentation}
                className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
              >
                <Plus className="h-4 w-4" />
                Agregar Presentación
              </button>
            </div>
            
            <div className="space-y-4">
              {presentations.map((presentation, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg relative">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Volumen
                    </label>
                    <Input
                      value={presentation.volume}
                      onChange={(e) => handlePresentationChange(index, 'volume', e.target.value)}
                      placeholder="700 ml"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Empaque
                    </label>
                    <Input
                      value={presentation.packaging}
                      onChange={(e) => handlePresentationChange(index, 'packaging', e.target.value)}
                      placeholder="Botella de vidrio con caja"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      EAN
                    </label>
                    <Input
                      value={presentation.ean}
                      onChange={(e) => handlePresentationChange(index, 'ean', e.target.value)}
                      placeholder="5000267114184"
                    />
                  </div>

                  {presentations.length > 1 && (
                    <button
                      onClick={() => handleRemovePresentation(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* 7. Recomendaciones de Consumo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              7. Recomendaciones de Consumo
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sugerencias de Servicio
                </label>
                <Textarea
                  value={formData.servingSuggestions}
                  onChange={(e) => handleInputChange('servingSuggestions', e.target.value)}
                  rows={2}
                  placeholder='Ej: Solo, con hielo ("on the rocks"), o en cócteles clásicos como el Whisky Sour o Old Fashioned'
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperatura Ideal
                </label>
                <Input
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  placeholder="Ej: 16-20 °C"
                />
              </div>
            </div>
          </motion.div>

          {/* 8. Maridaje y Notas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              8. Maridaje y Notas Curiosas
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maridaje Sugerido
                </label>
                <Textarea
                  value={formData.pairings}
                  onChange={(e) => handleInputChange('pairings', e.target.value)}
                  rows={2}
                  placeholder="Ej: Chocolate amargo, carnes ahumadas, frutos secos, quesos maduros"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notas Curiosas / Historia
                </label>
                <Textarea
                  value={formData.trivia}
                  onChange={(e) => handleInputChange('trivia', e.target.value)}
                  rows={3}
                  placeholder="Ej: Considerado un referente mundial de los whiskies blended premium. Reconocido por su balance perfecto entre suavidad, cuerpo y complejidad"
                />
              </div>
            </div>
          </motion.div>

          {/* 9. Descripción General */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              9. Descripción General
            </h2>
            
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Descripción general del producto..."
            />
          </motion.div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Imagen del Producto
            </h2>
            
            <ImageUpload
              folder="spirits"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Precio y Configuración */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Precio y Configuración
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={formData.isPremium}
                  onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="isPremium" className="text-sm text-gray-700 dark:text-gray-300">
                  Producto Premium
                </label>
              </div>
            </div>
          </motion.div>

          {/* Resumen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Resumen
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formData.name || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ABV:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formData.abv ? `${formData.abv}%` : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Origen:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formData.origin || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Marca:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formData.brand || '-'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
