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
  MapPin
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

export default function NewSpiritPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'DESTILADO',
    category: 'WHISKEY',
    brand: '',
    description: '',
    image: '',
    imageKey: '',
    abv: '',
    origin: '',
    price: '',
    isPremium: false
  })

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
    if (!formData.name || !formData.type || !formData.category) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const spiritData = {
        name: formData.name,
        type: formData.type,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        image: formData.image,
        imageKey: formData.imageKey,
        abv: formData.abv,
        origin: formData.origin,
        price: formData.price,
        isPremium: formData.isPremium
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
              Nuevo Licor
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Añade un nuevo licor con imagen y detalles
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
                  Nombre del Licor *
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
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                placeholder="Describe el licor, su sabor, proceso de elaboración..."
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
              Imagen del Licor
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
                  placeholder="40"
                  type="number"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Origen
                </label>
                <Input
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Escocia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio (USD)
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="50.00"
                  type="number"
                  step="0.01"
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
                Licor premium
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
