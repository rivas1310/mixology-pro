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
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const beerCategories = [
  { value: 'LAGER', label: 'Lager' },
  { value: 'ALE', label: 'Ale' },
  { value: 'IPA', label: 'IPA' },
  { value: 'STOUT', label: 'Stout' },
  { value: 'PORTER', label: 'Porter' },
  { value: 'WHEAT', label: 'Trigo' },
  { value: 'PILSENER', label: 'Pilsener' },
  { value: 'LAMBIC', label: 'Lambic' }
]

const beerTypes = [
  { value: 'CRAFT', label: 'Artesanal' },
  { value: 'COMMERCIAL', label: 'Comercial' },
  { value: 'IMPORT', label: 'Importada' },
  { value: 'LOCAL', label: 'Local' }
]

export default function NewBeerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: 'CRAFT',
    category: 'LAGER',
    description: '',
    image: '',
    imageKey: '',
    abv: '',
    ibu: '',
    origin: '',
    price: '',
    isCraft: true
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
        price: formData.price,
        isCraft: formData.isCraft
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
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                >
                  {beerTypes.map(type => (
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
                  {beerCategories.map(category => (
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
                  Origen
                </label>
                <Input
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="México"
                />
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
